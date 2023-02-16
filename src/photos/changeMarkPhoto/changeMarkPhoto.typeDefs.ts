import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    changeMarkPhoto(id: Int, userId: Int, region: String): MutationResponse!
  }
`;
