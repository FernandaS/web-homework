/* eslint-disable no-unused-vars */
const graphql = require('graphql');
const { GraphQLString, GraphQLObjectType } = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    dob: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString }
  })
});

module.exports = UserType;
