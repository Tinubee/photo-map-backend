import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    username: String!
    email: String!
    avatar: String
    createAt: String!
    updateAt: String!
  }
  type Query {
    seeProfile(username: String): User
  }
  type Mutation {
    createAccount(
      username: String!
      email: String!
      avatar: String
      password: String!
    ): User
  }
`;
