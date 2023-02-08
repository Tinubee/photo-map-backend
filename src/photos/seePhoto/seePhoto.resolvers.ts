import { Resolvers } from "../../types";
import { protextedResolvers } from "../../user/users.utils";

const resolvers: Resolvers = {
  Query: {
    seePhoto: async (_, { id }, { loggedInUser, client }) => {
      console.log(id);
      client.photo.findUnique({
        where: {
          id,
        },
      });
    },
  },
};

export default resolvers;
