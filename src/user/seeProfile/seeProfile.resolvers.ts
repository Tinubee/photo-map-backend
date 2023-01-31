import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protextedResolvers((_, { username }, { client }) =>
      client.user.findUnique({
        where: {
          username,
        },
      })
    ),
  },
};

export default resolvers;
