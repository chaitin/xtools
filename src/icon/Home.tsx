import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';

export const Home = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox='0 0 24 24'>
      <path
        fillRule='nonzero'
        d='m18.8 10.256-5.8-4.9a1.478 1.478 0 0 0-1.925 0l-5.875 4.9a.501.501 0 0 0 .3.9c.125 0 .25-.05.325-.125l.175-.15v5.575c0 1.125.85 2.05 1.925 2.05h8.15c1.05 0 1.925-.925 1.925-2.05v-5.575l.15.125c.1.075.2.125.35.125.275 0 .5-.225.5-.5a.514.514 0 0 0-.2-.375Zm-7.8 7.25v-3.5c0-.275.225-.5.5-.5h1c.275 0 .5.225.5.5v3.5h-2Zm6-1.05c0 .575-.425 1.05-.95 1.05H14v-3.5c0-.825-.675-1.5-1.5-1.5h-1c-.825 0-1.5.675-1.5 1.5v3.5H7.95c-.525 0-.95-.475-.95-1.05v-6.4l4.7-3.925c.175-.15.45-.15.65 0l4.65 3.9v6.425Z'
      />
    </SvgIcon>
  );
};
