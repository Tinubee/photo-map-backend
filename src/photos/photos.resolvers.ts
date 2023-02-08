import { Resolvers } from "../types";

export const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _: any, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
  },
};
