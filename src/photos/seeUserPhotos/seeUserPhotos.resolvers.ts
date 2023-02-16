import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeUserPhotos: async (_, { userId }, { client }) =>
      client.photo.findMany({
        where: {
          userId,
        },
        orderBy: {
          id: "desc",
        },
      }),
  },
};

export default resolvers;
