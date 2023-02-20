import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protextedResolvers(
      async (
        _,
        { file, path, transform, region, latitude, longitude, address },
        { loggedInUser, client }
      ) => {
        console.log(`latitude : ${latitude}`);
        console.log(`longitude : ${longitude}`);
        console.log(`address : ${address}`);

        const fileUrl = await uploadToS3(file.file, loggedInUser?.id, "photos");

        return client.photo.create({
          data: {
            file: fileUrl,
            path,
            region,
            transform,
            latitude,
            longitude,
            address,
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
