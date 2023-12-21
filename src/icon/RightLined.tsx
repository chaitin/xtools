import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const RightLined = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        fillRule='nonzero'
        d='M9.144 6.148a.5.5 0 0 0 .003.705l5.16 5.113-5.138 5.183a.5.5 0 0 0 .71.703l5.46-5.51c.008-.008.01-.019.018-.027l.006-.005a.499.499 0 0 0-.003-.705l-5.51-5.46a.5.5 0 0 0-.706.003Z'
      />
    </SvgIcon>
  );
};
