import express from "express";
import mongoose from "mongoose";
import { ApolloServer, gql } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import isAuth from "./middleware/is-auth";
const server = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if(req.method === 'OPTIONS'){
      return res.sendStatus(200);
    }
    next();
  })
  server.applyMiddleware({ app });

  try {
    // connects to our database. This is required to access our backend
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@foodbuddy-xvz5n.azure.mongodb.net/${process.env.MONGO_TABLE}?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (err) {
    console.log(err);
  }

  app.listen({ port: 4001 }, () => {
    console.log("connected");
  });
};

server();
