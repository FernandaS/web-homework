import React, { Fragment, useEffect, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { arrayOf, string, bool, number, shape, func } from 'prop-types';

// import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import { currencyFormat, intToRoman } from '../../uitls/helper-fuction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { RemoveTransaction } from '../../gql/remove-transaction.gql';
import cn from 'classnames';
import { css } from '@emotion/core';
import NumberContext from '../../contexts/number-conversion-context';

import { LinkWithSearch } from '../linkWithSearch';
import { useTranslation } from 'react-i18next';

const styles = css`
  .debit {
    color: green;
  }
  .table-header {
    display: flex;
    justify-content: space-between;
  }
  .table {
    minWidth: 650;
  }
  .header: {
    padding: '16px'
  }
  }
`;

const tableHeader = ['User', 'Description', 'Amount', 'Actions'];
// const makeDataTestId = (transactionId, fieldName) => `transaction-${transactionId}-${fieldName}`;

export function TxTable({ data, limit, title, refresh }) {
  const { isRomanNumeral, toggleRomanNumeral } = useContext(NumberContext);
  const filteredArray = data.slice(0, limit);
  const [removeTransaction, { data: deleteData }] = useMutation(RemoveTransaction);
  const { t } = useTranslation();

  useEffect(() => {
    if (deleteData !== undefined) refresh();
  }, [deleteData]);

  return (
    <Fragment>
      <div css={styles}>
        <section className="table-header">
          <Typography className="header" color="primary" component="h2" gutterBottom variant="h6">
            {t('Transactions')}
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isRomanNumeral} onChange={toggleRomanNumeral} />}
              label={t('Toggle Roman Numeral')}
            />
          </FormGroup>
        </section>

        <Table aria-label="simple table" className="table">
          <TableHead>
            <TableRow>
              {tableHeader.map(th => (
                <TableCell key={th}>{t(`${th}`)}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredArray.map(row => {
              const { id, user, description, debit, credit, amount } = row;
              return (
                <TableRow data-testid={`transaction-${id}`} key={`transaction-${id}`}>
                  <TableCell align="left">{user.firstName + ' ' + user.lastName}</TableCell>
                  <TableCell align="left">{description}</TableCell>
                  <TableCell align="left" className={cn({ debit: debit })}>
                    {isRomanNumeral ? intToRoman(amount) : currencyFormat(debit, credit, amount)}
                  </TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="delete"
                      color="secondary"
                      onClick={() => removeTransaction({ variables: { id } })}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton aria-label="Edit">
                      <LinkWithSearch to={`/transaction/${id}/edit`}>
                        <EditIcon />
                      </LinkWithSearch>
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
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
