import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GetTransactions from '../../gql/transactions.gql';
import { TxTable } from '../../components/transactions/TxTable';
import { css } from '@emotion/core';

const styles = theme => css`
  .paper {
    padding: ${theme.spacing(2)}px,
    display: flex,
    overflow: auto,
    flex-direction: column
  },
  .fixedHeight: {
    height: 240px
  }
`;

export function Home() {
  const { loading, error, data = {}, refetch } = useQuery(GetTransactions, { fetchPolicy: 'network-only' });

  if (loading) {
    return <Fragment>Loading...</Fragment>;
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>;
  }

  return (
    <Grid container css={styles} spacing={3}>
      {/* Chart */}
      <Grid item xs={12}>
        <Paper className="paper fixedHeight" />
      </Grid>
      {/* Recent Transactions */}
      <Grid item xs={12}>
        <Paper className="paper">
          <TxTable data={data.transactions} limit={5} refresh={refetch} title={'Recent Transactions'} />
        </Paper>
      </Grid>
    </Grid>
  );
}
