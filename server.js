/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
// GraphQL-Express middlewares
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const keys = require('./config/keys');
const Recipe = require('./models/Recipe');
const User = require('./models/User');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');

const app = express();
const PORT = process.env.PORT || 4444;
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
// GraphQL schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Connect to DB
mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to DB'))
  .catch(err => console.error(err));

// Server config
app.use(cors(corsOptions));
app.use(async (req, res, next) => {
  const token = req.headers.authorization;

  if (token !== 'null') {
    try {
      const currentUser = await jwt.verify(token, keys.SECRET);
      req.currentUser = currentUser;
    } catch (err) {
      console.error(err);
    }
  }

  next();
});
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));
app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
