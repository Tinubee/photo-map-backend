import { Resolvers } from "../../types";
import { protextedResolvers } from "../users.utils";

const resolvers: Resolvers = {
  Query: {
    seeProfile: protextedResolvers((_, { id }, { client }) =>
      client.user.findUnique({
        where: {
          id,
        },
      })
    ),
  },
};

export default resolvers;
