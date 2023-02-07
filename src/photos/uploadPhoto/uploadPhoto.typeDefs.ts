import { gql } from "apollo-server-express";

export default gql`
  type Mutation {
    uploadPhoto(file: Upload, region: String): Photo
  }
  scalar Upload
`;
