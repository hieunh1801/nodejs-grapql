const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mysqlKnex = require('./database/mysql-knex');
const userUtils = require('./database/user.utils');
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type User {
  id: String
  name: String
  job_title: String
  email: String
}
type Query {
  getUsers: [User],
  getUserInfo(id: Int) : User
}
`);

// The root provides a resolver function for each API endpoint
const root = {
  getUsers: async (args, req) => {
    const { data, total } = await userUtils.getUsers();
    return data
  },
  getUserInfo: async (args, req) => {
    console.log("args", args)
    const id = args.id;
    const data = await userUtils.getUserById(id);
    return data;
  }
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');