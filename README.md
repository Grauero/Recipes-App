# Recipes-App [![Build Status](https://travis-ci.org/Grauero/Recipes-App.svg?branch=master)](https://travis-ci.org/Grauero/Recipes-App)
https://recipes-app1.herokuapp.com/

![landing](http://i.piccy.info/i9/33e1e6e034b9509108d4b21c63423dd3/1552075985/109831/1306335/recipes_landing.jpg)

Recipe application, built on React/Node/Apollo

Registration/Authorization done with email/password + JWT tokens

CRUD operations handled by GraphQL queries/mutations with Apollo Client / Apollo Server

Application tested with Jest+Enzyme

Application audit with Google Chrome audits on mobile devices with simulated fast 3G, 4x CPU Slowdown:
- /profile page: ![profile](http://i.piccy.info/i9/db17b67a0fcd15daffbc4e6c6c097313/1552311133/15499/1306780/recipes_profile_page_mobile_simulatedFast3G.jpg)

- /recipes page: ![profiles](http://i.piccy.info/i9/2b58f7f61103e34a3c89e3b46565acc4/1552312090/15594/1306796/recipes_recipes_page_mobile_simulatedFast3G.jpg)

## Application features:


### - users can create/update recipes, search and delete existing recipes

![create](http://i.piccy.info/i9/eff20a132a20b943c00b4dde583230ee/1552076401/57497/1306335/recipes_create.jpg)


### - users can view and add recipes to favorites

![single](http://i.piccy.info/i9/ccbd6106825d4b577cd25e8a83348533/1552076754/118772/1306335/recipes_single.jpg)

### - users can view and update their profile

![profile](http://i.piccy.info/i9/287e8bdd590508621d0ac418f7ebec57/1552310906/89492/1306780/recipes_profile.png)


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
