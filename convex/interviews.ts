import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

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
    return interview;
  },
});

export const getInterviews = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const interviews = await ctx.db
      .query("interviews")
      .filter((q) => q.eq(q.field("userId"), userId))
      .order("desc") // Sort by createdAt descending
      // .order("desc", (q) => q.field("createdAt"))
      .collect();
    return interviews;
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
