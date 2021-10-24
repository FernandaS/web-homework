const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLFloat } = graphql;
const { TransactionModel } = require('../data-models/Transaction');
const TransactionType = require('./transaction-type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTransaction: {
      type: TransactionType,
      args: {
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve(parentValue, { user_id, description, merchant_id, debit, credit, amount }) {
        return new TransactionModel({ user_id, description, merchant_id, debit, credit, amount }).save();
      }
    },
    updateTransaction: {
      type: TransactionType,
      args: {
        id: { type: GraphQLString },
        user_id: { type: GraphQLString },
        description: { type: GraphQLString },
        merchant_id: { type: GraphQLString },
        debit: { type: GraphQLBoolean },
        credit: { type: GraphQLBoolean },
        amount: { type: GraphQLFloat }
      },
      /* eslint-disable-next-line camelcase */
      resolve(parentValue, { id, user_id, description, merchant_id, debit, credit, amount }) {
        return TransactionModel.findByIdAndUpdate(
          id,
          {
            user_id,
            description,
            merchant_id,
            debit,
            credit,
            amount
          },
          { new: true }
        ).exec();
      }
    },
    deleteTransaction: {
      type: GraphQLString,
      args: {
        id: { type: GraphQLString }
      },

      resolve(parentValue, { id }) {
        return TransactionModel.deleteOne({ _id: id }).then(() => id);
      }
    }
  }
});

module.exports = mutation;
