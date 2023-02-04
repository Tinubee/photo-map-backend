import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    me: protextedResolvers((_, __, { loggedInUser, client }) =>
      client.user.findUnique({
        where: {
          id: loggedInUser?.id,
        },
      })
    ),
  },
};

export default resolvers;
