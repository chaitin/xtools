import { FormControl, InputLabel, Stack } from '@mui/material';
import React from 'react';

const FormItem: React.FC<{ label: string | React.ReactNode, children: React.ReactNode }> = (
  props
) => {
  return (
    <FormControl variant='outlined' className=''>
      <Stack direction='row'>
        <InputLabel>{props.label}</InputLabel>
        <Stack>
          {props.children}
        </Stack>
      </Stack>
    </FormControl>
  );
};

export default FormItem;
