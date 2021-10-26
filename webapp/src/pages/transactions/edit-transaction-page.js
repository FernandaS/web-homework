import { useQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';

import { TransactionForm } from '../../components/transaction-form/form';
import { GetTransaction } from '../../gql/transaction.gql';
import { editTransaction } from '../../gql/update-transaction.gql';
import GetUsers from '../../gql/users.gql';

export function EditTransaction() {
  const history = useHistory();
  const { id } = useParams();
  const { loading, error, data = {} } = useQuery(GetTransaction, { variables: { id } });
  const { loading: usersLoading, error: usersError, data: usersData = {} } = useQuery(GetUsers);
  const onSubmit = async ({ description, merchant, user_id: userId, amount, type }) => {
    const credit = type === 'credit';
    const debit = type === 'debit';
    await editTrx({ variables: { description, merchant, userId, amount: +amount, credit, debit, id } });
    history.push('/transactions');
  };

  const [editTrx] = useMutation(editTransaction);

  if (loading) return 'Loading...';
  if (error) return `Submission error! ${error.message}`;
  if (usersError) return `User Loading error! ${usersError.message}`;

  return (
    <TransactionForm
      handleSubmit={onSubmit}
      isLoading={usersLoading}
      transaction={data.transaction}
      type={'edit'}
      usersData={usersData}
    />
  );
}
