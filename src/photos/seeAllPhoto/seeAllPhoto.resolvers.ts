import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeAllPhoto: protextedResolvers(async (_, { __ }, { client }) => {
      console.log(client.photo);
      client.photo.findMany({
        orderBy: { createdAt: "desc" },
      });
    }),
  },
};

export default resolvers;
