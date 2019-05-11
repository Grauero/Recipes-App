/* eslint-disable no-console */
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const express = require('express');
const { graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { typeDefs } = require('../schema');
const { resolvers } = require('../resolvers');
const keys = require('../config/keys');

const corsOptions = { origin: 'http://localhost:3000', credentials: true };
const schema = makeExecutableSchema({ typeDefs, resolvers });

module.exports = (app) => {
  app.use(cors(corsOptions));

  // auth middleware
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

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
};
