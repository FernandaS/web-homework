import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditTransaction } from './edit-transaction-page';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../../theme';
import { ThemeProvider } from 'emotion-theming';
import { GetTransaction } from '../../gql/transaction.gql';

describe('EditTransaction', () => {
  it('should render a form for editing a transaction', () => {
    const mocks = [
      {
        request: {
          query: GetTransaction,
          variables: { id: '123' }
        },
        response: {
          data: {
            transaction: {
              id: '123',
              amount: 500,
              debit: true,
              credit: false,
              description: 'another one',
              user_id: '321'
            }
          }
        }
      }
    ];

    render(
      <BrowserRouter>
        <MockedProvider mocks={mocks}>
          <ThemeProvider theme={theme}>
            <EditTransaction />
          </ThemeProvider>
        </MockedProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
