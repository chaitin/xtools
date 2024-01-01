import { Box, SxProps } from '@mui/material';
import React, { useCallback } from 'react';

interface Props {
  src: string;
  sx?: SxProps;
}

const Module: React.FC<Props> = (props) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (props.src) {
        const extName = /^data:[a-zA-Z0-9]+\/([a-zA-Z0-9]+)[^;]*;base64,/.exec(
          props.src
        );
        if (extName && extName[1]) {
          const aTag = document.createElement('a');
          aTag.style.display = 'none';
          aTag.href = props.src;
          aTag.download = '保存图片.' + extName[1];
          document.body.appendChild(aTag);
          aTag.click();
        }
      }
    },
    [props.src]
  );

  return (
    <Box
      sx={{
        width: '100%',
        padding: '20px',
        position: 'relative',
        display: 'inline-block',
        border: 'black solid 1px',
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '4px',
        ...props.sx,
      }}
    >
      {props.src ? (
        <img src={props.src} style={{ width: '100%', height: '100%' }}></img>
      ) : (
        <></>
      )}
      <Box
        sx={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          zIndex: '1',
          cursor: 'pointer',
          color: 'rgba(0,0,0,0)',
          fontSize: '14px',
          textAlign: 'center',
          userSelect: 'none',
          paddingTop: '20px',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: props.src ? 'rgba(255,255,255,1)' : '',
          },
        }}
        onClick={handleClick}
      >
        {' '}
        点击下载图片{' '}
      </Box>
    </Box>
  );
};

export default Module;
