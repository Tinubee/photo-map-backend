import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeMyPhotos: (_, { userId }, { client }) =>
      client.photo.findMany({
        where: {
          userId,
        },
      }),
  },
};

export default resolvers;
