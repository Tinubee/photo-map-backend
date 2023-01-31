require("dotenv").config();

import { ApolloServer } from "apollo-server";
import client from "./client";
import schema from "./schema";
import { getUser } from "./user/users.utils";

const PORT = process.env.PORT;

const server = new ApolloServer({
  schema,
  context: async (ctx) => {
    if (ctx.req) {
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
        client,
      };
    } else {
      const {
        connection: { context },
      } = ctx;
      return {
        loggedInUser: context.loggedInUser,
      };
    }
  },
});

server
  .listen(PORT)
  .then(() => console.log(`🚀 Server is running on http://localhost:${PORT}`));
