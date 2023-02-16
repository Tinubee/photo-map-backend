import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeMarkPhotos: async (_, { userId, region }, { client }) =>
      client.photo.findMany({
        where: {
          AND: [
            {
              userId,
            },
            {
              region,
            },
          ],
        },
      }),
  },
};

export default resolvers;
