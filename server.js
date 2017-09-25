//const { schema, resolvers } = require('./index2.js'); // Needed for index2
const { schema } = require('./index3.js');

const express = require('express');
const graphqlHTTP = require('express-graphql');

const PORT = process.env.PORT || 3000;
const server = express();

// Middleware
// Graphiql is a graphic interface to query
server.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  //rootValue: resolvers, // Only needed for index and index2 because say how to fetch the data
}));

server.listen(PORT, () => {
  console.log('Listening on http://localhost:${PORT}');
})
