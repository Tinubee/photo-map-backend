import { protextedResolvers } from "../../user/users.utils";

export default {
  Mutation: {
    toggleLike: protextedResolvers(
      async (_, { id }, { loggedInUser, client }) => {
        const photo = await client.photo.findUnique({
          where: {
            id,
          },
        });

        if (!photo) {
          return {
            ok: false,
            error: "Photo not found",
          };
        }

        if (!loggedInUser) return;

        const likeWhere = {
          photoId_userId: {
            userId: loggedInUser.id,
            photoId: id,
          },
        };

        const like = await client.like.findUnique({
          where: likeWhere,
        });
        if (like) {
          await client.like.delete({
            where: likeWhere,
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              photo: {
                connect: {
                  id: photo.id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
