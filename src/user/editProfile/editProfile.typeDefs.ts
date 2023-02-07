import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    editProfile(
      username: String
      email: String
      password: String
      avatar: Upload
      bio: String
    ): MutationResponse!
  }
  scalar Upload
`;
