import express from "express";
import mongoose from "mongoose";
import { ApolloServer, gql} from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const server = async () => {
    const app = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    server.applyMiddleware({app});

    try {
        await mongoose.connect("mongodb+srv://Food-Buddy-Team:FoodBuddy1@foodbuddy-xvz5n.azure.mongodb.net/Scary?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
    } catch (err){
        console.log(err)
    }

    app.listen({port: 4001}, () => {
        console.log('connected')
    })

}

server();