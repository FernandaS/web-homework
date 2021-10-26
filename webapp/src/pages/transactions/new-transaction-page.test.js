import React from 'react';
import { render, screen } from '@testing-library/react';
import { AddTransaction } from './new-transaction-page';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '../../theme';
import { ThemeProvider } from 'emotion-theming';

describe('AddTransaction', () => {
  it('should render a form for adding a transaction', () => {
    render(
      <BrowserRouter>
        <MockedProvider>
          <ThemeProvider theme={theme}>
            <AddTransaction />
          </ThemeProvider>
        </MockedProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('User')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });
});
