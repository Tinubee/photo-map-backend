import { Resolvers } from "../types";

export const resolvers: Resolvers = {
  Photo: {
    user: async ({ userId }, _: any, { client }) =>
      client.user.findUnique({ where: { id: userId } }),
    likes: ({ id }, _, { client }) =>
      client.like.count({ where: { photoId: id } }),
    isLiked: async ({ id }, _, { loggedInUser, client }) => {
      if (!loggedInUser) {
        return false;
      }
      const ok = await client.like.findUnique({
        where: {
          photoId_userId: {
            photoId: id,
            userId: loggedInUser.id,
          },
        },
        select: {
          id: true,
        },
      });
      if (ok) {
        return true;
      }
      return false;
    },
  },
};
