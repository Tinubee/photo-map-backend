import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeUserRegionPhotos: async (_, { region, userId }, { client }) =>
      client.photo.findMany({
        where: {
          AND: [
            {
              userId,
            },
            {
              OR: [
                {
                  region,
                },
                {
                  region: `${region}⭐️`,
                },
              ],
            },
          ],
        },
        orderBy: {
          id: "desc",
        },
      }),
  },
};

export default resolvers;
