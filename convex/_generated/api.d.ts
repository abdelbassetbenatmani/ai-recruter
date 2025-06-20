/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as ResendOTPPasswordReset from "../ResendOTPPasswordReset.js";
import type * as auth from "../auth.js";
import type * as credits from "../credits.js";
import type * as feedback from "../feedback.js";
import type * as http from "../http.js";
import type * as interviews from "../interviews.js";
import type * as myFunctions from "../myFunctions.js";
import type * as upload from "../upload.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  ResendOTPPasswordReset: typeof ResendOTPPasswordReset;
  auth: typeof auth;
  credits: typeof credits;
  feedback: typeof feedback;
  http: typeof http;
  interviews: typeof interviews;
  myFunctions: typeof myFunctions;
  upload: typeof upload;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
