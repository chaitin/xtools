import React, { useState } from 'react';
import MenuView from '@/components/MenuView';
import { Box, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const CaseConvert: React.FC = () => {
  let [value, setValue] = useState<string>();

  return (
    <MenuView>
      <Stack
        direction='column'
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          mx: 'auto',
          fontFamily: 'Mono',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='subtitle2'>输入</Typography>
          <Stack sx={{ mt: 2 }}>
            <TextField
              value={value}
              variant='outlined'
              multiline
              rows={4}
              onChange={(event) => {
                setValue(event.target.value);
              }}
              sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='subtitle2'>大写</Typography>
          <Stack sx={{ mt: 2 }}>
            <TextField
              value={value?.toUpperCase()}
              variant='outlined'
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
              sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='subtitle2'>小写</Typography>
          <Stack sx={{ mt: 2 }}>
            <TextField
              value={value?.toLowerCase()}
              variant='outlined'
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
              sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
      </Stack>
    </MenuView>
  );
};

export default CaseConvert;
