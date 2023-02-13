import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMyRegionPhoto(region: String!): [Photo]
  }
`;
