import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeMyRegionPhoto: protextedResolvers(
      async (_, { region }, { loggedInUser, client }) =>
        client.photo.findMany({
          where: {
            AND: [
              {
                userId: loggedInUser?.id,
              },
              {
                region,
              },
            ],
          },
        })
    ),
  },
};

export default resolvers;
