const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const graphQLSchema = require('./graphql/schema/index');
const graphQLResolvers = require('./graphql/resolvers/index');

const app = express();
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/events';

app.use(bodyParser.json());

app.use(isAuth);

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}));

// Connect to mongodb
mongoose.connect(MONGODB_URI)
.then(app.listen(3000))
.catch(err => {
  console.log(err);
});
