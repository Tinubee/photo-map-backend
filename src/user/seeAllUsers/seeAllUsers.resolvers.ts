import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeAllUsers: (_, __, { loggedInUser, client }) =>
      client.user.findMany({
        where: {
          NOT: {
            id: loggedInUser?.id,
          },
        },
        orderBy: {
          updateAt: "desc",
        },
      }),
  },
};

export default resolvers;
