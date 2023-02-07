import bcrypt from "bcrypt";
import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";
import { GraphQLUpload } from "graphql-upload";
import fs, { access } from "fs";

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
  if (avatar) {
    const { filename, createReadStream } = await avatar.file;

    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
    const readStream = createReadStream();
    console.log(readStream);
    const writeStream = fs.createWriteStream(
      process.cwd() + "/uploads/" + newFilename
    );
    readStream.pipe(writeStream);
    avatarUrl = `http://localhost:4000/static/${newFilename}`;
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
