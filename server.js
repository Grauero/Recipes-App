/* eslint-disable no-console */
const express = require('express');

const setupDB = require('./config/setupDB');
const setupMiddlewares = require('./config/setupMiddlewares');

const app = express();
const PORT = process.env.PORT || 4444;

setupDB();
setupMiddlewares(app);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
