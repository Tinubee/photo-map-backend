import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seeMyPhotos: protextedResolvers(async (_, __, { loggedInUser, client }) =>
      client.photo.findMany({
        where: {
          userId: loggedInUser?.id,
        },
      })
    ),
  },
};

export default resolvers;
