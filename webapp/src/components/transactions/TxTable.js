import React, { Fragment, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { arrayOf, string, bool, number, shape, func } from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { currencyFormat } from '../../uitls/helper-fuction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { RemoveTransaction } from '../../gql/remove-transaction.gql';
const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  header: {
    padding: '16px'
  }
});

const tableHeader = ['User ID', 'Description', 'Merchant ID', 'Amount', 'Actions'];
// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`;

export function TxTable({ data, limit, title, refresh }) {
  const classes = useStyles();
  const filteredArray = data.slice(0, limit);

  const [removeTransaction, { data: deleteData }] = useMutation(RemoveTransaction);

  useEffect(() => {
    if (deleteData !== undefined) refresh();
  }, [deleteData]);

  return (
    <Fragment>
      <Typography className={classes.header} color="primary" component="h2" gutterBottom variant="h6">
        {title}
      </Typography>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            {tableHeader.map(th => (
              <TableCell key={th}>{th}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredArray.map(row => {
            const { id, user, description, merchant_id: merchantId, debit, credit, amount } = row;
            return (
              <TableRow data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                <TableCell align="left">{user.firstName + ' ' + user.lastName}</TableCell>
                <TableCell align="left">{description}</TableCell>
                <TableCell align="left">{merchantId}</TableCell>
                <TableCell align="left">{currencyFormat(debit, credit, amount)}</TableCell>
                <TableCell align="left">
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={() => removeTransaction({ variables: { id } })}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <IconButton aria-label="Edit">
                    <Link to={`/transaction/${id}/edit`}>
                      <EditIcon />
                    </Link>
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Fragment>
  );
}

TxTable.propTypes = {
  limit: number,
  title: string,
  refresh: func,
  data: arrayOf(
    shape({
      id: string,
      user_id: string,
      description: string,
      merchant_id: string,
      debit: bool,
      credit: bool,
      amount: number
    })
  )
};
