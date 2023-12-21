import React, { useState } from 'react';
import MenuView from '@/components/MenuView';
import { Box, Divider, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';

const CaseConvert: React.FC = () => {
  let [value, setValue] = useState<string>();

  return (
    <MenuView>
      <Stack
        direction='column'
        divider={<Divider orientation='vertical' flexItem />}
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          width: '838px',
          mx: 'auto',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          输入
          <Stack spacing={1} sx={{}}>
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
          大写
          <Stack spacing={1} sx={{}}>
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
          小写
          <Stack spacing={1} sx={{}}>
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
