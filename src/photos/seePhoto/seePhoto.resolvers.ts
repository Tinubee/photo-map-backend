import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seePhoto: protextedResolvers(async (_, { id }, { client }) => {
      client.photo.findUnique({
        where: {
          id,
        },
      });
    }),
  },
};

export default resolvers;
