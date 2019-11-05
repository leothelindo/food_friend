import { gql } from "apollo-server-express";

// defines all the types that graphQL needs to store/use
// our objects and exports them for other files to use

export const typeDefs = gql`
  type Query {
    helloWorld: String!
    users: [User!]!
    orders: [Order!]!
    login(email: String!, password: String!): AuthData!
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
    creator: User!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    createdOrders: [Order!]
  }

  type AuthData {
      userID: ID!
      token: String!
      tokenExpiration: Int!
  }
  type Mutation {
    createUser(userInput: UserInput): User!
    createOrder(orderInput: OrderInput): Order!
  }
`;
