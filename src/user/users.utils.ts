import * as jwt from "jsonwebtoken";
import client from "../client";
import { Resolver } from "../types";

export const getUser = async (token: any) => {
  try {
    if (!token) {
      return null;
    }
    const verifiedToken: string | jwt.JwtPayload = jwt.verify(
      token,
      process.env.SECRET_KEY!
    );

    if (typeof verifiedToken !== "string") {
      const user = await client.user.findUnique({
        where: { id: verifiedToken.id },
        select: { id: true },
      });
      if (user) return user;

      return null;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export function protextedResolvers(ourResolver: Resolver) {
  return function (root: any, args: any, context: any, info: any) {
    if (!context.loggedInUser) {
      const query = info.operation.operation == "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "Please LogIn to perform this action.",
        };
      }
    }
    return ourResolver(root, args, context, info);
  };
}
