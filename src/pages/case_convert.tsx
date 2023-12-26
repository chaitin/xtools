import React, { useState } from 'react';
import MainContent from '@/components/MainContent';
import { Box, Stack, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';

const CaseConvert: React.FC = () => {
  let [value, setValue] = useState<string>();

  return (
    <MainContent>
      <>
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
      </>
    </MainContent>
  );
};

export default CaseConvert;
