import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export function LinkWithSearch({ children, to, ...props }) {
  const { search } = useLocation();
  return (
    <Link to={to + search} {...props}>
      {children}
    </Link>
  );
}
