import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import React from 'react';
import { RomanNumeralProvider } from '../../contexts/number-conversion-context';

import { TxTable } from './TxTable';
import { BrowserRouter as Router } from 'react-router-dom';

import { transactions } from '../../../mocks/transactions-data';

describe('Transactions Table', () => {
  it('renders without error', () => {
    render(
      <Router>
        <MockedProvider>
          <RomanNumeralProvider>
            <TxTable data={[]} />
          </RomanNumeralProvider>
        </MockedProvider>
      </Router>
    );
  });
  it('renders transaction table with data', () => {
    render(
      <Router>
        <MockedProvider>
          <RomanNumeralProvider>
            <TxTable data={transactions} />
          </RomanNumeralProvider>
        </MockedProvider>
      </Router>
    );

    expect(screen.getByTestId(`transaction-${transactions[0].id}-user`)).toHaveTextContent('Fernanda Silva');
    expect(screen.getByTestId(`transaction-${transactions[0].id}-amount`)).toHaveTextContent('+ $90.00');
  });

  it('should have correct path for edit button', () => {
    render(
      <Router>
        <MockedProvider>
          <RomanNumeralProvider>
            <TxTable data={transactions} />
          </RomanNumeralProvider>
        </MockedProvider>
      </Router>
    );

    expect(screen.getAllByRole('link')[0]).toHaveAttribute('href', `/transaction/${transactions[0].id}/edit`);
  });
});
