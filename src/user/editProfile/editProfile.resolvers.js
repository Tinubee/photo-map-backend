import client from "../../client";
import bcrypt from "bcrypt";
import { protextedResolvers } from "../users.utils";

const resolverFn = async (
  _,
  { username, email, password: newPassword },
  { loggedInUser }
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

export default {
  Mutation: {
    editProfile: protextedResolvers(resolverFn),
  },
};
