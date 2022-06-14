const { ApolloServer } = require('apollo-server');

const fs = require('fs');

const typeDefs = fs.readFileSync('./schema.graphql', { encoding:'utf-8' })
const resolvers = require('./resolvers/resolvers.js').resolvers

const server = new ApolloServer({ typeDefs, resolvers });

server
  .listen({ port: 3000 })
  .then(({ url }) => console.log(`Server running at ${url}`));

