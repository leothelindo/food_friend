import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";

const link = new HttpLink({
  uri: "https://food-buddy-01.herokuapp.com/graphql"
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  cache,
  link
});

const USERS = gql`
  mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      name
      id
    }
  }
`;

export async function sendCreateUserQuery(name, email, password) {
  client
    .query({
      query: gql`
        query {
          users {
            name
          }
        }
      `
    })
    .then(result => console.log(result));

//   const userInput = `
//   _id: "sdfsdf"
//   name: ${name}
//   email: ${email}
//   password: ${password}
//  `;

//   const [addUser, { data }] = useMutation(USERS);
//   addUser({ variables: { userInput: userInput } }).then(result =>
//     console.log(result)
//   );
}
