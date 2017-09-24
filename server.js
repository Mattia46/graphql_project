const { schema, resolvers } = require('./index2.js');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();

// Middleware
// Graphiql is a graphic interface to query
server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: resolvers,
}));

server.listen(PORT, () => {
  console.log('Listening on http://localhost:${PORT}');
})
