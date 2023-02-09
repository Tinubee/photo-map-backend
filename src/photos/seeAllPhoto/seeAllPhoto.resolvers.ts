import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeAllPhoto: (_, __, { client }) =>
      client.photo.findMany({
        orderBy: {
          description: "desc",
        },
      }),
  },
};

export default resolvers;
