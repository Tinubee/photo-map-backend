import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Mutation: {
    login: async (_, { email, password, socialLogin }, { client }) => {
      //find user with args.username
      const user = await client.user.findFirst({
        where: {
          AND: [
            {
              email,
            },
            {
              socialLogin,
            },
          ],
        },
      });
      console.log(user);
      if (!user) {
        return {
          ok: false,
          error: "해당 이메일로 가입된 계정이 없습니다.",
        };
      }

      //check password with args.password
      if (socialLogin === false) {
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return {
            ok: false,
            error: "비밀번호가 잘못 입력되었습니다.",
          };
        }
      }

      //issue a token and send it to the user

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY!);

      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
