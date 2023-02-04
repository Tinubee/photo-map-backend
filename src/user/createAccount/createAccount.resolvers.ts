import bcrypt from "bcrypt";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    createAccount: async (
      _,
      { username, email, password, socialLogin, avatar },
      { client }
    ) => {
      try {
        // check usename or email are already on DB
        console.log(username, email, password, socialLogin, avatar);
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

        console.log(existUser);

        if (existUser) {
          if (socialLogin) {
            return {
              ok: true,
            };
          }
          return {
            ok: false,
            error: "이름 또는 이메일로 이미 가입된 계정이 있습니다.",
          };
        }

        let hashPassword = password;
        // hash password
        if (!socialLogin) {
          hashPassword = await bcrypt.hash(password, 10);
        }

        // save and retrun user
        await client.user.create({
          data: {
            username,
            email,
            socialLogin,
            password: hashPassword,
            avatar,
          },
        });
        return {
          ok: true,
        };
      } catch (error) {
        return {
          ok: false,
          error: error,
        };
      }
    },
  },
};

export default resolvers;
