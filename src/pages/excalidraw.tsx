import MainContent from '@/components/MainContent';
import { Box } from '@mui/material';

import React, { useState, useEffect } from 'react';

const Board: React.FC = () => {
  const [Excalidraw, setExcalidraw] = useState<any>(null);
  useEffect(() => {
    import('@excalidraw/excalidraw').then((comp: any) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  return (
    <MainContent
      fullScreen
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& .MuiTypography-caption': {
          alignSelf: 'flex-start',
          minWidth: '200px',
          pr: 2,
        },
      }}
    >
      <Box
        className='nihao'
        sx={{
          flex: 1,
          width: '100%',
          alignSelf: 'stretch',
          '& > div': {
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
        }}
      >
        {Excalidraw && <Excalidraw />}
      </Box>
    </MainContent>
  );
};

export default Board;
