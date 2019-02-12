/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// GraphQL-Express middlewares
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const keys = require('./config/keys');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

// GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Connect to DB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error(err));

const app = express();
const PORT = process.env.PORT || 4444;

// Server config
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Recipe,
      User
    }
  })
);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
