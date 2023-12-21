import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const ArrowDown = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        fillRule='nonzero'
        d='M5.865 9c-.714 0-1.17.953-.623 1.5l6.144 6.144a.846.846 0 0 0 1.229 0l6.144-6.144c.533-.533.117-1.5-.615-1.5H5.865Z'
      />
    </SvgIcon>
  );
};
