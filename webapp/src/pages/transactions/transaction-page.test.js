import React from 'react';
import { render, screen } from '@testing-library/react';
import { Transactions } from './transactions-page';
import { MockedProvider } from '@apollo/client/testing';
import { GetTransactions } from '../../gql/transactions.gql';

describe('Transactions page', () => {
  it('should render the Transactions page', async () => {
    const mocks = [
      {
        request: {
          query: GetTransactions
        },
        result: {
          data: { transactions: [] }
        }
      }
    ];
    render(
      <MockedProvider addTypename={false} mocks={mocks}>
        <Transactions />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
