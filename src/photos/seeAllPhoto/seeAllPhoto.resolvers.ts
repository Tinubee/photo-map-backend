import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seePhoto: protextedResolvers(async (_, { __ }, { client }) => {
      client.photo.findMany({
        orderBy: { createdAt: "desc" },
      });
    }),
  },
};

export default resolvers;
