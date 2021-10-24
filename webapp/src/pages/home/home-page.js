import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import GetTransactions from '../../gql/transactions.gql';
import { TxTable } from '../../components/transactions/TxTable';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240
  }
}));

export function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const { loading, error, data = {}, refetch } = useQuery(GetTransactions, { fetchPolicy: 'network-only' });

  if (loading) {
    return <Fragment>Loading...</Fragment>;
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>;
  }

  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item lg={9} md={8} xs={12}>
        <Paper className={fixedHeightPaper} />
      </Grid>
      {/* Recent Deposits */}
      <Grid item lg={3} md={4} xs={12}>
        <Paper className={fixedHeightPaper} />
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <TxTable data={data.transactions} limit={5} refresh={refetch} title={'Recent Transactions'} />
        </Paper>
      </Grid>
    </Grid>
  );
}
