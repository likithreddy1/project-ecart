import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid,InputLabel,Input } from '@material-ui/core';

function FormInput({ name, label, required }) {
  const { control } = useForm();
  const isError = false;

  return (
    <Grid item xs={12} sm={6}>
       <InputLabel>{label}</InputLabel>
      <Controller
        as={TextField}
        name={name}
        control={control}
        label={label}
        fullWidth
        required={required}
        error={isError}
        render={({ field }) => <Input {...field} />}
      />
    </Grid>
  );
}

export default FormInput;