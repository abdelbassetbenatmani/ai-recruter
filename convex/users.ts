import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getMe = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const user = await ctx.db.get(userId);

    let imageUrl = null;
    if (user?.image) {
      imageUrl = await ctx.storage.getUrl(user?.image);
    }

    return {
      ...user,
      imageUrl,
    };
  },
});

// update user name
export const updateProfileInfo = mutation({
  args: {
    name: v.string(),
    bio: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(userId, {
      name: args.name,
      bio: args.bio,
    });
    return await ctx.db.get(userId);
  },
});

export const saveImageToUser = mutation({
  args: { storageId: v.id("_storage"), email: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    console.log("identity", identity.email);

    // Find the user by their identity
    const user = await ctx.db
      .query("users")
      .withIndex("email", (q) => q.eq("email", args.email))
      .unique();

    console.log("user", user);

    if (!user) {
      throw new Error("User not found 123");
    }

    // Update the user with the new image storage ID
    await ctx.db.patch(user._id, {
      image: args.storageId,
    });
  },
});


export const createInitialCredits = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    // Check if user already has credits
    const existingCredits = await ctx.db
      .query("userCredits")
      .withIndex("userId", (q) => q.eq("userId", userId))
      .first();
    
    if (!existingCredits) {
      // Give new users 4 credits (enough for 2 interviews)
      await ctx.db.insert("userCredits", {
        userId,
        credits: 4,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    
    return true;
  },
});