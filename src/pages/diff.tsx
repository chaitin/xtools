import MainContent from '@/components/MainContent';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import ReactDiffViewer from 'react-diff-viewer-continued';

const _C = () => {
  const [raw, setRaw] = useState<any>();
  const [modified, setModified] = useState<any>();
  const [alignment, setAlignment] = useState<string>('1');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    console.log(alignment);
  };

  const handleRawChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRaw(event.target.value);
    },
    []
  );

  const handleModifiedChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setModified(event.target.value);
    },
    []
  );
  var myStyle = {
    line: {
      'word-break': 'break-word',
    },
  };

  return (
    <MainContent>
      <Box>
        <Stack direction='row' spacing={1}>
          <Typography width='100%'>原文本</Typography>
          <Typography width='100%'>对比文本</Typography>
        </Stack>
        <Stack direction='row' spacing={1} my={1}>
          <OutlinedInput
            sx={{ width: '100%', fontFamily: 'Mono' }}
            value={raw}
            margin='dense'
            minRows='5'
            maxRows='5'
            multiline
            autoFocus
            onChange={handleRawChanged}
          />
          <OutlinedInput
            sx={{ width: '100%', fontFamily: 'Mono' }}
            value={modified}
            margin='dense'
            minRows='5'
            maxRows='5'
            multiline
            autoFocus
            onChange={handleModifiedChanged}
          />
        </Stack>
        <Stack direction='row' justifyContent='flex-end' my={1}>
          <ToggleButtonGroup
            size='small'
            value={alignment}
            exclusive
            onChange={handleAlignment}
          >
            <ToggleButton value='0'>上下对比</ToggleButton>
            <ToggleButton value='1'>左右对比</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <ReactDiffViewer
          styles={myStyle}
          oldValue={raw}
          newValue={modified}
          splitView={!!+alignment}
          hideLineNumbers
        />
      </Box>
    </MainContent>
  );
};

export default _C;
