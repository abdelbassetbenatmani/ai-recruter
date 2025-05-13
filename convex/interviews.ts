import { v } from "convex/values";
import { mutation } from "./_generated/server";
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
