import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeMarkPhotos(userId: Int!, region: String!): [Photo]
  }
`;
