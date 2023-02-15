import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeAllUsers: (_, __, { client }) =>
      client.user.findMany({
        orderBy: {
          updateAt: "desc",
        },
      }),
  },
};

export default resolvers;
