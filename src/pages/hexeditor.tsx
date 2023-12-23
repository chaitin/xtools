import MenuView from '@/components/MenuView';
import { Box, Button, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Stack, Tab, TextField, Snackbar } from '@mui/material';

import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});


const Span = styled('span')({
});

const LineNo = styled('span')({
  fontFamily: 'Mono',
  fontSize: '14px',
  color: 'rgba(0,0,0,0.9)', 
  height: '32px',
  lineHeight: '32px',
  backgroundColor: 'rgb(222, 222, 222)', 
  paddingTop: '8px',
  paddingBottom: '8px',
  paddingLeft: '10px',
  paddingRight: '20px',
  marginRight: '50px',
});

const Hex = styled('span')({
  fontFamily: 'Mono',
  fontSize: '14px',
  fontWeight: '600',
  color: 'rgba(0,0,0,0.9)',
  height: '32px',
  lineHeight: '32px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '5px',
  paddingRight: '5px',
  cursor: 'text',
});

const Text = styled('span')({
  fontFamily: 'Mono',
  fontSize: '14px',
  color: 'rgba(0,0,0,0.7)',
  height: '32px',
  lineHeight: '32px',
  paddingTop: '6px',
  paddingBottom: '6px',
  paddingLeft: '1px',
  paddingRight: '1px',
  cursor: 'default',
});

const Editor = styled('input')({
  width: '100px',
  borderTop: 0,
  borderLeft: 0,
  borderRight: 0,
  outline: 'none',
  marginLeft: '60px',
  marginRight: '60px',
  padding: '10px',
  fontFamily: 'Mono',
  fontSize: '36px',
  letterSpacing: '10px',
});


const HexEditor: React.FC = () => {
  const [data, setData] = useState<ArrayBuffer>(new ArrayBuffer(0x100));
  const [hoverID, setHoverID] = useState<number>(-1);
  const [edit, setEdit] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [editID, setEditID] = useState<number>(-1);
  const [editByte, setEditByte] = useState<string>('00');
  const buffer = new Uint8Array(data);
  const [fileName, setFileName] = useState<string>();

  const handleMouseEnter = (x: number) => {
    return (event:React.MouseEvent<HTMLElement>) => {
      setHoverID(x);
    };
  }

  const handleMouseOut = (event:React.MouseEvent<HTMLElement>) => {
    setHoverID(-1);
  }

  const getHex = (x: number) => {
    if (x < 0 || x >= buffer.length) {
      return <Hex sx={{ color: 'rgba(0,0,0,0.1)' }}>--</Hex>
    }
    return <Hex 
      onClick={handleHexClick(x)} 
      onMouseEnter={handleMouseEnter(x)} 
      onMouseOut={handleMouseOut} 
      sx={x === hoverID ? { color: 'rgb(0,0,0)', backgroundColor: 'rgba(52, 90, 255, 0.2)' } : {}}>
        {('00' + buffer[x].toString(16)).slice(-2)}
    </Hex>
  } 
  
  const getText = (x: number) => {
    if (x < 0 || x >= buffer.length) {
      return <Text sx={{ color: 'rgba(0,0,0,0.1)' }}>-</Text>
    }
    if (buffer[x] >= 0x21 && buffer[x] <= 0x7e) {
      return <Text onMouseEnter={handleMouseEnter(x)} onMouseOut={handleMouseOut} sx={x === hoverID ? { color: 'rgb(0,0,0)', backgroundColor: 'rgba(52, 90, 255, 0.2)' } : {}} >{String.fromCharCode(buffer[x])}</Text>
    } else {
      return <Text onMouseEnter={handleMouseEnter(x)} onMouseOut={handleMouseOut} sx={x === hoverID ? { color: 'rgb(0,0,0)', backgroundColor: 'rgba(52, 90, 255, 0.2)' } : { color: 'rgba(0,0,0,0.3)' }} >.</Text>
    }
  }

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          setData(e.target.result as ArrayBuffer);
        }
      };
      if (files[0].size > 1024 * 1024) {
        setShowMessage(true)
        return;
      }
      setFileName(files[0].name)
      reader.readAsArrayBuffer(files[0]);
    },
    []
  );

  const handleHexClick = useCallback((x: number) => {
      return (event:React.MouseEvent<HTMLElement>) => {
        setEditID(x);
        setEdit(true);
        setEditByte(('00' + buffer[x].toString(16)).slice(-2));
      };
    },
    [buffer]
  );

  const handleEditCommit = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setEdit(false);
      buffer[editID] = parseInt(editByte, 16);
    },
    [buffer, editID, editByte]
  );

  const handleEditClose = (event:React.MouseEvent<HTMLElement>) => {
    setEdit(false);
  }

  const editor = Array(Math.ceil((buffer.length) / 16)).fill(0).map((_, x) => {
    return <Box key={x} sx={{ height: '32px' }}>
        <LineNo>
          {('00000000' + (x * 0x10).toString(16)).slice(-8)}
        </LineNo>
        {getHex(x * 0x10 + 0x00)}
        {getHex(x * 0x10 + 0x01)}
        {getHex(x * 0x10 + 0x02)}
        {getHex(x * 0x10 + 0x03)}
        {getHex(x * 0x10 + 0x04)}
        {getHex(x * 0x10 + 0x05)}
        {getHex(x * 0x10 + 0x06)}
        {getHex(x * 0x10 + 0x07)}
        <Span sx={{ marginRight: '20px' }}></Span>
        {getHex(x * 0x10 + 0x08)}
        {getHex(x * 0x10 + 0x09)}
        {getHex(x * 0x10 + 0x0a)}
        {getHex(x * 0x10 + 0x0b)}
        {getHex(x * 0x10 + 0x0c)}
        {getHex(x * 0x10 + 0x0d)}
        {getHex(x * 0x10 + 0x0e)}
        {getHex(x * 0x10 + 0x0f)}
        
        <Span sx={{ marginRight: '50px' }}></Span>
        {getText(x * 0x10 + 0x00)}
        {getText(x * 0x10 + 0x01)}
        {getText(x * 0x10 + 0x02)}
        {getText(x * 0x10 + 0x03)}
        {getText(x * 0x10 + 0x04)}
        {getText(x * 0x10 + 0x05)}
        {getText(x * 0x10 + 0x06)}
        {getText(x * 0x10 + 0x07)}
        {getText(x * 0x10 + 0x08)}
        {getText(x * 0x10 + 0x09)}
        {getText(x * 0x10 + 0x0a)}
        {getText(x * 0x10 + 0x0b)}
        {getText(x * 0x10 + 0x0c)}
        {getText(x * 0x10 + 0x0d)}
        {getText(x * 0x10 + 0x0e)}
        {getText(x * 0x10 + 0x0f)}
    </Box>
  }) 

  const onEditByteChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditByte(event.target.value)
    },
    []
  );

  const handleMessageClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setShowMessage(false);
  };

  return (
    <MenuView>
      <Stack
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          mx: 'auto',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Stack spacing={1} sx={{ color: '#FF1844' }}>
            <Button
              component='label'
              variant='outlined'
              sx={{ borderRadius: '3px', height: '40px' }}
            >
              {fileName ? "已加载文件 " + fileName : "加载文件"}
              <VisuallyHiddenInput
                type='file'
                onChange={handleSelectFile}
              />
            </Button>
          </Stack>
          <Stack sx={{ border: 'rgb(222,222,222) solid 1px', borderRadius: '3px', marginTop: '20px', userSelect: 'none' }}>
            {editor}
          </Stack>
        </Box>
        <Snackbar open={showMessage} autoHideDuration={6000} onClose={handleMessageClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert variant="outlined" severity="error" sx={{ width: '100%' }}>
          暂不支持处理超过 1MB 的文件
          </Alert>
        </Snackbar>
        <Dialog open={edit} onClose={handleEditClose}>
          <DialogTitle>修改字节</DialogTitle>
          <DialogContent>
            <Editor value={editByte} onChange={onEditByteChange}></Editor>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>取消</Button>
            <Button onClick={handleEditCommit}>确认</Button>
          </DialogActions>
        </Dialog>
      </Stack>      
    </MenuView>
  );
};

export default HexEditor;
