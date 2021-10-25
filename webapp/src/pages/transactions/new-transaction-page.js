import React from 'react';
import { useHistory } from 'react-router-dom';

import { useMutation, useQuery } from '@apollo/client';
import CreateTransaction from '../../gql/create-transaction.gql';
import GetUsers from '../../gql/users.gql';
import { TransactionForm } from '../../components/transaction-form/form';

export function AddTransaction() {
  const history = useHistory();
  const onSubmit = async ({ description, merchant, user_id: userId, amount, type }) => {
    const credit = type === 'credit';
    const debit = type === 'debit';

    await addTx({ variables: { description, merchant, userId, amount: +amount, credit, debit } });
    history.push('/transactions');
  };

  const [addTx, { loading, error }] = useMutation(CreateTransaction);
  const { loading: usersLoading, error: usersError, data: usersData = {} } = useQuery(GetUsers);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (usersError) return `User Loading error! ${usersError.message}`;

  return <TransactionForm handleSubmit={onSubmit} isLoading={usersLoading} usersData={usersData} />;
}
