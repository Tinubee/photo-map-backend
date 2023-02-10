import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMyPhotos(userId: Int!): [Photo]
  }
`;
