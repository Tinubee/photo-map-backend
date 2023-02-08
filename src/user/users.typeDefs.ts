import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    bio: String
    avatar: String
    socialLogin: Boolean!
    photos: [Photo]
    createAt: String!
    updateAt: String!
  }
`;
