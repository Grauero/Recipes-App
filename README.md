# Recipes-App
https://recipes-app1.herokuapp.com/

Recipe applciation build on React/Node.

Authenticated users can create new recipes, search and delete existing recipes, like and add items to favorites.

User register with login/password, auth flow handled by JWT tokens.

CRUD operations handled by GraphQL queries/mutations with Apollo Client / Apollo Server.

## Scripts:
    - ```npm run dev``` - to launch local dev-server (client + back)
    - ```npm run client``` - to launch local dev-server (client)
    - ```npm run server``` - to launch local dev-server (back)
    - ```npm run heroku-postbuild``` - for deployment
    - ```npm run test``` - to launch test run in watch mode

### Used tools:
  1. [React](https://reactjs.org/) 
  2. [Apollo Client](https://www.apollographql.com/docs/react/) for:
      - GraphQL requests and mutations;
      - caching;
      - state management;
  3. [Apollo Server](https://www.apollographql.com/docs/apollo-server/) on back for:
      - resolving requests and mutations;
      - auth with [JWT](https://jwt.io) tokens;
  4. [MongoDB](https://www.mongodb.com/) for database
