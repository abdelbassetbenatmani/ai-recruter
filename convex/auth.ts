import { Password } from "@convex-dev/auth/providers/Password";
import GitHub from "@auth/core/providers/github";

import { convexAuth } from "@convex-dev/auth/server";
import { DataModel } from "./_generated/dataModel";
import { ResendOTPPasswordReset } from "./ResendOTPPasswordReset";

const CustomPassword = Password<DataModel>({
  profile(params) {
    // Add the ctx parameter here
    return {
      email: params.email as string,
      name: params.name as string,
      // Add any other fields you need
    };
  },

  reset: ResendOTPPasswordReset,
});
export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword, GitHub],
});
