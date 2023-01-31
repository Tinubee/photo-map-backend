import bcrypt from "bcrypt";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_, { username, email, avatar, password }) => {
      try {
        // check usename or email are already on DB
        const existUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              },
            ],
          },
        });
        if (existUser) {
          throw new Error("Username or email already exists");
        }
        // hash password
        const hashPassword = await bcrypt.hash(password, 10);
        // save and retrun user
        await client.user.create({
          data: {
            username,
            email,
            password: hashPassword,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: "Can't create account",
        };
      }
    },
  },
};
