import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainListItems } from './listItems';
import { BrowserRouter } from 'react-router-dom';

describe('main list items', () => {
  it('should render a list of links', () => {
    render(
      <BrowserRouter>
        <MainListItems />
      </BrowserRouter>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Transactions')).toBeInTheDocument();
  });
});
