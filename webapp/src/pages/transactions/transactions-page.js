import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import GetTransactions from '../../gql/transactions.gql';
import { Link } from 'react-router-dom';
import { TxTable } from '../../components/transactions/TxTable';
import Button from '@material-ui/core/Button';

// import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}));

export function Transactions() {
  const classes = useStyles();
  let { loading, error, data = {}, refetch } = useQuery(GetTransactions, { fetchPolicy: 'network-only' });

  if (loading) {
    return <Fragment>Loading...</Fragment>;
  }

  if (error) {
    return <Fragment>¯\_(ツ)_/¯</Fragment>;
  }
  return (
    <Fragment>
      <Button
        ariant="contained"
        className={classes.button}
        color="primary"
        component={Link}
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
