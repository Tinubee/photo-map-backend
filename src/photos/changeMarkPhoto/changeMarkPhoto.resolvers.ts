import bcrypt from "bcrypt";
import { uploadToS3 } from "../../shared/shared.utils";
import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolverFn = async (
  _: any,
  { id, userId, region }: any,
  { client }: any
) => {
  console.log(userId);
  let newRegion = null;
  if (region.includes("⭐️")) {
    newRegion = region.replace("⭐️", "");
  } else {
    newRegion = region + "⭐️";
    const result = await client.photo.findMany({
      where: {
        AND: [
          {
            region: newRegion,
          },
          {
            userId,
          },
        ],
      },
    });

    if (result.length !== 0) {
      await client.photo.update({
        where: {
          id: result[0].id,
        },
        data: {
          region,
        },
      });
    }
  }

  const updatedPhoto = await client.photo.update({
    where: {
      id,
    },
    data: {
      region: newRegion,
    },
  });

  if (updatedPhoto.id) {
    return {
      ok: true,
    };
  } else {
    return { ok: false, error: "Can't update mark photo" };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    changeMarkPhoto: protextedResolvers(resolverFn),
  },
};

export default resolvers;
