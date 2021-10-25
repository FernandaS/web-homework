import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import GetTransactions from '../../gql/transactions.gql';
import { Link } from 'react-router-dom';
import { TxTable } from '../../components/transactions/TxTable';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import { css } from '@emotion/core';

const button = theme => css`
  margin: ${theme.spacing(1)}px !important;
`;

export function Transactions() {
  let { loading, error, data = {}, refetch } = useQuery(GetTransactions, { fetchPolicy: 'network-only' });

  if (loading) {
    return <Fragment>Loading...</Fragment>;
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>;
  }
  return (
    <Fragment css>
      <Button
        ariant="contained"
        color="primary"
        component={Link}
        css={button}
        size="medium"
        startIcon={<AddIcon />}
        to="/transactions/add"
      >
        Add Transaction
      </Button>

      <TxTable data={data.transactions} refresh={refetch} title={'Transactions'} />
    </Fragment>
  );
}
