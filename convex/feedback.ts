import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const createFeedback = mutation({
    args: {
        interviewId: v.id("interviews"),
        feedback: v.object({
            rating: v.object({
                technicalSkills: v.number(),
                communication: v.number(),
                problemSolving: v.number(),
                experience: v.number()
            }),
            summary: v.string(),
            recommendation: v.string(),
            recommendationMsg: v.string()
        })
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const feedback = await ctx.db.insert("interviewFeedback", {
            interviewId: args.interviewId,
            feedback: args.feedback,
            userId,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        return feedback;
    },
})

export const getFeedback = query({
    args: {
        interviewId: v.id("interviews"),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Not authenticated");

        const feedback = await ctx.db
            .query("interviewFeedback")
            .filter((q) => q.eq(q.field("interviewId"), args.interviewId))
            .collect();

        return feedback;
    },
});