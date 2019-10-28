import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    helloWorld: String!
    users: [User!]!
    orders: [Order!]!
  }

  input UserInput {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  input OrderInput {
    _id: ID!
    restaurant: String!
    foodItems: String!
    price: Float!
  }

  type Order {
    _id: ID!
    restaurant: String!
    foodItems: String!
    price: Float!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
  }

  type Mutation {
    createUser(userInput: UserInput): User!
    createOrder(orderInput: OrderInput): Order!
  }
`;
