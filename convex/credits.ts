import { v } from "convex/values";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";

// Get user's current credits
export const getUserCredits = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Find user's credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    // Return credits or 0 if not found
    return userCredits?.credits ?? 0;
  },
});

// Add credits to user's account
export const addCredits = mutation({
  args: {
    credits: v.number(),
    paymentId: v.string(), // To track the payment
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Find existing user credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    const now = Date.now();

    // If user has credits, update them
    if (userCredits) {
      return await ctx.db.patch(userCredits._id, {
        credits: userCredits.credits + args.credits,
        updatedAt: now,
      });
    }
    // Otherwise, create new credits entry
    else {
      return await ctx.db.insert("userCredits", {
        userId,
        credits: args.credits,
        createdAt: now,
        updatedAt: now,
      });
    }
  },
});

// Deduct credits for an interview
export const deductInterviewCredits = internalMutation({
  args: {
    interviewId: v.id("interviews"),
  },
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Find user's credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    // Make sure user has enough credits
    if (!userCredits || userCredits.credits < 2) {
      throw new ConvexError({
        code: "not_enough_credits",
        message: "You don't have enough credits to start an interview",
      });
    }

    // Deduct 2 credits
    await ctx.db.patch(userCredits._id, {
      credits: userCredits.credits - 2,
      updatedAt: Date.now(),
    });

    return true;
  },
});

// Check if user has enough credits for an interview
export const hasEnoughCreditsForInterview = internalQuery({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Find user's credits
    const userCredits = await ctx.db
      .query("userCredits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();

    // Return true if user has 2 or more credits
    return (userCredits?.credits ?? 0) >= 2;
  },
});
