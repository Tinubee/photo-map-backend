import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protextedResolvers(
      async (
        _,
        { file, path, transform, region },
        { loggedInUser, client }
      ) => {
        console.log(`File Name : ${file}`);
        console.log(`Region Name : ${region}`);

        const fileUrl = await uploadToS3(file.file, loggedInUser?.id, "photos");

        return client.photo.create({
          data: {
            file: fileUrl,
            path,
            region,
            transform,
            user: {
              connect: {
                id: loggedInUser?.id,
              },
            },
          },
        });
      }
    ),
  },
};

export default resolvers;
