import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

// The schema is normally optional, but Convex Auth
// requires indexes defined on `authTables`.
// The schema provides more precise TypeScript types.
export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    bio: v.optional(v.string()),
    // other "users" fields...
  }).index("email", ["email"]),
  numbers: defineTable({
    value: v.number(),
  }),
  interviews: defineTable({
    fullName: v.optional(
      v.string()
    ),
    position: v.string(),
    description: v.string(),
    duration: v.string(),
    interviewDuration: v.optional(
      v.string()
    ),
    interviewTypes: v.array(v.string()),
    questions: v.array(v.object({
      question: v.string(),
      type: v.string()
    })),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  interviewFeedback: defineTable({
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
    }),
    userId: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),
  userCredits: defineTable({
    userId: v.id("users"),
    credits: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("userId", ["userId"]),
});
