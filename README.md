# Recipes-App
https://recipes-app1.herokuapp.com/

![landing](http://i.piccy.info/i9/33e1e6e034b9509108d4b21c63423dd3/1552075985/109831/1306335/recipes_landing.jpg)

Recipe application, build on React/Node/Apollo.

Registration/Authorization done with email/password + JWT tokens

CRUD operations handled by GraphQL queries/mutations with Apollo Client / Apollo Server.

Application tested with Jest+Enzyme

## Application features:


### - users can create/update recipes, search and delete existing recipes

![create](http://i.piccy.info/i9/eff20a132a20b943c00b4dde583230ee/1552076401/57497/1306335/recipes_create.jpg)


### - users can view and add recipes to favorites.

![single](http://i.piccy.info/i9/ccbd6106825d4b577cd25e8a83348533/1552076754/118772/1306335/recipes_single.jpg)


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
