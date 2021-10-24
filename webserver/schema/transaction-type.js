const path = require('path');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql;
const { UserModel: User } = require(path.join('..', 'data-models', 'User'));
const UserType = require('./user-type');
console.log('UserType', UserType);

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    id: { type: GraphQLString },
    user_id: { type: GraphQLString },
    description: { type: GraphQLString },
    merchant_id: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    user: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.user_id);
      }
    }
  })
});

module.exports = TransactionType;
