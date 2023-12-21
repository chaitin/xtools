import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Exclamation = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        fillRule='nonzero'
        d='M12.7 12.7h-1.4V8.5h1.4v4.2Zm0 2.8h-1.4v-1.4h1.4v1.4ZM12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z'
      />
    </SvgIcon>
  );
};
