import { gql } from "apollo-server-express";

export const typeDefs = gql`

type Query {
    helloWorld: String!
    users: [User!]!
}
input UserInput {
    _id: ID!
    name: String!
    email: String!
}
type User {
    _id: ID!
    name: String!
    email: String!
}

type Mutation {
    createUser(userInput: UserInput): User!
}

`;