import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
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

import { useMutation, useQuery } from '@apollo/client';
import CreateTransaction from '../../gql/createTransaction.gql';
import GetUsers from '../../gql/users.gql';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '50%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: '50%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

export function AddTransaction() {
  const history = useHistory();
  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const onSubmit = async ({ description, merchant, user, amount, type }) => {
    const credit = type === 'credit';
    const debit = type === 'debit';

    await addTx({ variables: { description, merchant, userId: user, amount: +amount, credit, debit } });
    history.push('/transactions');
  };

  const [addTx, { loading, error }] = useMutation(CreateTransaction);
  const { loading: usersLoading, error: usersError, data: usersData = {} } = useQuery(GetUsers);

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  if (usersError) return `User Loading error! ${usersError.message}`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        defaultValue=""
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextField
            className={classes.textField}
            id="outlined-margin-normal"
            label="Description"
            margin="normal"
            onChange={onChange}
            value={value}
            variant="outlined"
          />
        )}
        rules={{ required: 'Description is required' }}
      />
      {/* <Controller
        control={control}
        defaultValue=""
        name="merchant"
        render={({ field: { onChange, value } }) => (
          <TextField
            className={classes.textField}
            id="outlined-margin-normal"
            label="Merchant"
            margin="normal"
            onChange={onChange}
            value={value}
            variant="outlined"
          />
        )}
        rules={{ required: 'Merchant is required' }}
      /> */}
      <Controller
        control={control}
        defaultValue=""
        name="user"
        render={({ field: { onChange, value } }) => (
          <FormControl className={classes.formControl} variant="outlined">
            <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
            <Select
              id="demo-simple-select-outlined"
              label="Age"
              labelId="demo-simple-select-outlined-label"
              onChange={onChange}
              value={value}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {usersLoading
                ? [<></>]
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
          <FormControl className={classes.margin} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
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
              <FormControlLabel control={<Radio />} label="Debit" value="debit" />
              <FormControlLabel control={<Radio />} label="Credit" value="credit" />
            </RadioGroup>
          </FormControl>
        )}
        rules={{ required: 'Type is required' }}
      />
      <Button color="primary" type="submit" variant="contained">
        Add Transaction
      </Button>
    </form>
  );
}
