import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    user: User!
    userId: Int!
    file: String!
    region: String!
    description: String
    address: String
    latitude: String
    longitude: String
    isMine: Boolean!
    likes: [Like]
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    updatedAt: String!
    createdAt: String!
  }
`;
