import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadPhoto(
      file: Upload!
      path: String!
      transform: String
      region: String!
      latitude: Float
      longitude: Float
      address: String
    ): Photo
  }
  scalar Upload
`;
