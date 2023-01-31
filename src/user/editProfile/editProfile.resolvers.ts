import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";

const resolverFn = async (
  _,
  { username, email, password: newPassword },
  { loggedInUser, client }
) => {
  let _hashPassword = null;
  if (newPassword) {
    _hashPassword = await bcrypt.hash(newPassword, 10);
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      ...(_hashPassword && { password: _hashPassword }),
    },
  });
  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return { ok: false, error: "Can't update profile" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editProfile: protextedResolvers(resolverFn),
  },
};

export default resolvers;
