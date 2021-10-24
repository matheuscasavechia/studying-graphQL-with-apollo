const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const {createServer} = require('http');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const PORT = 4000;
const app = express();
const server = new ApolloServer({typeDefs, resolvers});

server.applyMiddleware({app});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen({port: PORT}, () => {
  console.log(
    `server started at http://localhost:${PORT}${server.graphqlPath}`,
  );
  console.log(
    `server started at ws://localhost:${PORT}${server.subscriptionsPath}`,
  );
});
