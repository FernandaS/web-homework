import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import GetTransactions from '../../gql/transactions.gql';

import { TxTable } from '../../components/transactions/TxTable';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';
import { css } from '@emotion/core';

import { LinkWithSearch } from '../../components/linkWithSearch';
import { useTranslation } from 'react-i18next';

const button = theme => css`
  margin: ${theme.spacing(1)}px !important;
`;

export function Transactions() {
  let { loading, error, data = {}, refetch } = useQuery(GetTransactions, { fetchPolicy: 'network-only' });
  const { t } = useTranslation();
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
        color="primary"
        component={LinkWithSearch}
        css={button}
        size="medium"
        startIcon={<AddIcon />}
        to="/transactions/add"
      >
        {t('Add Transaction')}
      </Button>

      <TxTable data={data.transactions} refresh={refetch} title={'Transactions'} />
    </Fragment>
  );
}
