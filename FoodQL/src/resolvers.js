import { User } from "./models/user";

export const resolvers = {
    Query: {
        helloWorld: () => 'hello world',
        users: () => User.find()
    },

    Mutation: {
        createUser: async(_, args) => {
            const input = {
                name: args.userInput.name,
                email: args.userInput.email
            }
            const newUser = new User(input);
            await newUser.save();
            return newUser;
        }
    }
}