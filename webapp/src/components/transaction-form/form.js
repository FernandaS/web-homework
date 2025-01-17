import React from 'react';
import { object, bool, func, string } from 'prop-types';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import { css } from '@emotion/core';

import { useTranslation } from 'react-i18next';

const styles = theme => css`
  .root {
    display: flex;
  }

  .textField {
    margin-left: ${theme.spacing(1)}px;
    margin-right: ${theme.spacing(1)}px;
    width: '50%';
  }

  .formControl {
    margin: ${theme.spacing(1)}px;
    min-width: 50%;
  }

  .selectEmpty {
    margin-top: ${theme.spacing(2)}px;
  }
  ,
  .margin {
    margin: ${theme.spacing(1)}px;
  }

  .form {
    display: grid;
    gap: 12px;
  }
`;

export function TransactionForm({ handleSubmit, usersData, isLoading, transaction = {}, type = 'create' }) {
  const checkType = () => {
    if (transaction.debit) {
      return 'debit';
    } else if (transaction.credit) {
      return 'credit';
    }

    return '';
  };

  const { t } = useTranslation();

  const { control, handleSubmit: formSubmit } = useForm({
    defaultValues: { ...transaction, type: checkType() }
  });

  return (
    <div css={styles}>
      <form className="form" onSubmit={formSubmit(handleSubmit)}>
        <Controller
          control={control}
          defaultValue=""
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextField
              className="textField"
              id="outlined-margin-normal"
              label={t('Description')}
              margin="normal"
              onChange={onChange}
              value={value}
              variant="outlined"
            />
          )}
          rules={{ required: 'Description is required' }}
        />
        <Controller
          control={control}
          defaultValue=""
          name="user_id"
          render={({ field: { onChange, value } }) => (
            <FormControl className="formControl" variant="outlined">
              <InputLabel id="demo-simple-select-outlined-label">{t('User')}</InputLabel>
              <Select
                id="demo-simple-select-outlined"
                label="user"
                labelId="demo-simple-select-outlined-label"
                onChange={onChange}
                value={value}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>

                {isLoading
                  ? null
                  : usersData.users.map(({ id, firstName, lastName }) => {
                      return (
                        <MenuItem key={id} value={id}>
                          {firstName + ' ' + lastName}
                        </MenuItem>
                      );
                    })}
              </Select>
            </FormControl>
          )}
          rules={{ required: 'User is required' }}
        />
        <Controller
          control={control}
          defaultValue=""
          name="amount"
          render={({ field: { onChange, value } }) => (
            <FormControl className="margin" variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">{t('Amount')}</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                labelWidth={60}
                onChange={onChange}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                value={value}
              />
            </FormControl>
          )}
          rules={{ required: 'Amount is required' }}
        />

        <Controller
          control={control}
          defaultValue=""
          name="type"
          render={({ field: { onChange, value } }) => (
            <FormControl component="fieldset">
              <RadioGroup aria-label="type" name="type1" onChange={onChange} value={value}>
                <FormControlLabel control={<Radio />} label={t('Debit')} value="debit" />
                <FormControlLabel control={<Radio />} label={t('Credit')} value="credit" />
              </RadioGroup>
            </FormControl>
          )}
          rules={{ required: 'Type is required' }}
        />
        <Button color="primary" type="submit" variant="contained">
          {type === 'create' ? t('Add Transaction') : t('Edit Transaction')}
        </Button>
      </form>
    </div>
  );
}

TransactionForm.propTypes = {
  handleSubmit: func,
  usersData: object,
  isLoading: bool,
  transaction: object,
  type: string
};
