import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeUserPhotos(userId: Int!): [Photo]
  }
`;
