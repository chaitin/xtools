import { Box, TextField, OutlinedTextFieldProps } from '@mui/material';
import React from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

interface CustomTextFieldProps extends OutlinedTextFieldProps {
  onClean: React.MouseEventHandler<HTMLDivElement>;
}

const TextFieldWithClean: React.FC<CustomTextFieldProps> = (props) => {
  const { onClean, ...otherProps } = props;

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField
        {...otherProps}
        sx={{ width: '100%', ...otherProps.sx }}
        variant='outlined'
      />
      <Box
        sx={{
          position: 'absolute',
          width: '32px',
          height: '32px',
          right: '4px',
          top: '4px',
          paddingTop: '6px',
          textAlign: 'center',
          bgcolor: 'rgba(0,0,0,0.1)',
          display: otherProps.value ? '' : 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          color: '#fff',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.25)',
          },
        }}
      >
        <Box onClick={onClean}>
          <DeleteOutlineIcon fontSize='small' />
        </Box>
      </Box>
    </Box>
  );
};

export default TextFieldWithClean;
