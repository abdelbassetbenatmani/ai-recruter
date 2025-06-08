import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const createInterview = mutation({
  args: {
    position: v.string(),
    description: v.string(),
    duration: v.string(),
    interviewTypes: v.array(v.string()),
    questions: v.array(
      v.object({
        question: v.string(),
        type: v.string(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    // Check if user has enough credits
    const hasEnoughCredits = await ctx.runQuery(
      internal.credits.hasEnoughCreditsForInterview,
    );
    if (!hasEnoughCredits) {
      throw new Error(
        "Not enough credits. Please purchase more credits to create an interview.",
      );
    }

    // Create the interview
    const interview = await ctx.db.insert("interviews", {
      fullName: "",
      position: args.position,
      description: args.description,
      duration: args.duration,
      questions: args.questions,
      interviewTypes: args.interviewTypes,
      userId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Deduct credits
    await ctx.runMutation(internal.credits.deductInterviewCredits, {
      interviewId: interview,
    });

    return interview;
  },
});

export const getInterviews = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const query = ctx.db
      .query("interviews")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc"); // Sort by createdAt descending

    let interviews;
    if (args.limit !== undefined) {
      interviews = await query.take(args.limit);
    } else {
      interviews = await query.collect();
    }
    return interviews;
  },
});

export const getCompletedInterviews = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const completedInterviews = await ctx.db
      .query("interviews")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.neq(q.field("fullName"), "")) // fullName is not empty for completed interviews
      .order("desc") // Sort by updatedAt descending
      .collect();
    return completedInterviews;
  },
});

export const getScheduledInterviews = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const scheduledInterviews = await ctx.db
      .query("interviews")
      .filter((q) => q.eq(q.field("userId"), userId))
      .filter((q) => q.eq(q.field("fullName"), "")) // Assuming fullName is empty for scheduled interviews
      .order("desc") // Sort by createdAt descending
      .collect();
    return scheduledInterviews;
  },
});

export const getInterview = query({
  args: {
    interviewId: v.string(),
  },
  handler: async (ctx, args) => {
    const interview = await ctx.db
      .query("interviews")
      .filter((q) => q.eq(q.field("_id"), args.interviewId))
      .collect();
    return interview;
  },
});

export const updateInterview = mutation({
  args: {
    id: v.id("interviews"),
    // Define the fields you want to update
    update: v.object({
      fullName: v.optional(v.string()),
      interviewDuration: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const { id, update } = args;

    // Check if the document exists
    const existingInterview = await ctx.db.get(id);
    if (!existingInterview) {
      throw new Error("Interview not found");
    }

    // Update the document with the provided fields
    await ctx.db.patch(id, update);
  },
});
