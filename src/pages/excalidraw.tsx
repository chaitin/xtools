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
    <MainContent>
      <Box sx={{ height: '500px' }}>{Excalidraw && <Excalidraw />}</Box>
    </MainContent>
  );
};

export default Board;
