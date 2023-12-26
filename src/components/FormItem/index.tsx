import { FormControl, InputLabel, Stack } from '@mui/material';
import React from 'react';

const FormItem: React.FC<{
  label: string | React.ReactNode;
  children: React.ReactNode;
  singleLine?: boolean;
}> = (props) => {
  const { singleLine = false } = props;
  return (
    <FormControl variant='outlined'>
      <Stack
        direction='row'
        sx={{ alignItems: singleLine ? 'center' : 'baseline' }}
      >
        <InputLabel>{props.label}</InputLabel>
        <Stack flex={1}>{props.children}</Stack>
      </Stack>
    </FormControl>
  );
};

export default FormItem;
