const mongoose = require('mongoose');
const { UserModel } = require('../data-models/User');
const { TransactionModel } = require('../data-models/Transaction');

const fernanda = {
  firstName: 'Fernanda',
  lastName: 'Silva',
  dob: '09/12/1986'
};

const transactions = [
  {
    user_id: '',
    amount: 10000,
    credit: true,
    debit: false,
    description: 'Uchi dinner'
  },
  {
    user_id: '',
    amount: 3500,
    credit: true,
    debit: false,
    description: 'Escape room team building'
  },
  {
    user_id: '',
    amount: 150000,
    credit: true,
    debit: false,
    description: 'Conference tickets'
  },
  {
    user_id: '',
    amount: 50000000,
    credit: false,
    debit: true,
    description: 'Divvy paycheck'
  }
];

const MONGO_URI = 'mongodb://localhost:27017/graphql';

async function seed() {
  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Established mongo connection');

    const newUser = await UserModel.findOne(fernanda).then(user => {
      if (user) return user;
      return UserModel.create(fernanda);
    });

    console.log('Seeded user');

    for (const transaction of transactions) {
      transaction.user_id = newUser._id;

      await TransactionModel.findOne(transaction).then(trx => {
        if (trx) return trx;
        return TransactionModel.create(transaction);
      });
    }
    console.log('Seeded transactions');
  } catch (err) {
    console.log('ERROR:::', err);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
