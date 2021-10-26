import React from 'react';
import { render, screen } from '@testing-library/react';
import { DenseAppBar } from './header';
import { ThemeProvider } from 'emotion-theming';
import { theme } from '../../theme';

describe('Header component', () => {
  it('should render with title Divvy', () => {
    render(
      <ThemeProvider theme={theme}>
        <DenseAppBar />
      </ThemeProvider>
    );

    expect(screen.getByText('Divvy')).toBeInTheDocument();
  });
});
