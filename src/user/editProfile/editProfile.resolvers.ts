import bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";

const resolverFn = async (
  _: any,
  { username, email, password: newPassword, bio, avatar }: any,
  { loggedInUser, client }: any
) => {
  let _hashPassword = null;
  if (newPassword) {
    _hashPassword = await bcrypt.hash(newPassword, 10);
  }

  let avatarUrl = null;
  console.log(avatar);
  if (avatar) {
    avatarUrl = await uploadToS3(avatar.file, loggedInUser.id, "avatars");
  }
  const updatedUser = await client.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      username,
      email,
      ...(_hashPassword && { password: _hashPassword }),
      ...(avatarUrl && { avatar: avatarUrl }),
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
