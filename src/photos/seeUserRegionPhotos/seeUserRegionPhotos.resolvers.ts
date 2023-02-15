import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeUserRegionPhotos: protextedResolvers(
      async (_, { region, userId }, { client }) =>
        client.photo.findMany({
          where: {
            AND: [
              {
                userId,
              },
              {
                region,
              },
            ],
          },
        })
    ),
  },
};

export default resolvers;
