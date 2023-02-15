import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeUserPhotos: protextedResolvers(async (_, { userId }, { client }) =>
      client.photo.findMany({
        where: {
          userId,
        },
      })
    ),
  },
};

export default resolvers;
