import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    path: String!
    transform: String
    file: String!
    region: String!
    description: String
    address: String
    latitude: Float
    longitude: Float
    likes: Int!
    createdAt: String!
    updatedAt: String!
    isLiked: Boolean!
  }
  type Like {
    id: Int!
    photo: Photo!
    updatedAt: String!
    createdAt: String!
  }
`;
