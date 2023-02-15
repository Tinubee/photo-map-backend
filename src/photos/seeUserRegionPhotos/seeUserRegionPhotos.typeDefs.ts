import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeUserRegionPhotos(region: String!, userId: Int!): [Photo]
  }
`;
