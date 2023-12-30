import MainContent from '@/components/MainContent';
import {
  Box,
  Button,

  Stack,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';


import { FixedSizeList } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

const theme = {
  backgroud: '#21252B',
  backgroudLineNo: '#282C34',
  backgroudLineNoHighLight: '#323842',
  backgroudHighLight: '#61AFEF',
  text: '#ABB2BF',
  textWeak: '#ABB2BF33',
  textStrong: '#F6F7F9',
  textModified: '#E06C75',
}

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

const nToHexWithPadding = (n: number, padding: number) => ('0'.repeat(padding) + n.toString(16)).slice(-padding)
const nToASCIIPrintale = (n: number) => ((n >= 0x20 && n <= 0x7e) ? String.fromCharCode(n) : '.')

const HexEditor: React.FC = () => {
  const [dataOrigin, setDataOrigin] = useState<Uint8Array>(new Uint8Array(0x100));
  const [dataNew, setDataNew] = useState<Uint8Array>(new Uint8Array(0x100));
  const [hoverID, setHoverID] = useState<number>(-1);
  const [editing, setEditing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>();

  const asciiColor = (id: number) => {
    if (id === hoverID) {
      return theme.textStrong;
    } else if (dataNew[id] < 0x20 || dataNew[id] > 0x7e) {
      return theme.textWeak
    } else {
      return theme.text;
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
          const arrOrigin = new Uint8Array(e.target.result as ArrayBuffer)
          setDataOrigin(arrOrigin);
          const arrNew = new Uint8Array(new ArrayBuffer(arrOrigin.byteLength));
          arrNew.set(arrOrigin);
          setDataNew(arrNew);
        }
      };
      setFileName(files[0].name);
      reader.readAsArrayBuffer(files[0]);
    },
    []
  );

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (editing) {
        return
      }
      const id = parseInt((event.target as HTMLElement).getAttribute('id') as string)
      if (id < dataNew.byteLength) {
        setHoverID(id);
      }
    }, [dataNew, editing]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (editing) {
        return
      }
      setHoverID(-1);
    }, [editing]
  );

  const handleMouseClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = (event.target as HTMLElement)
      const id = parseInt(element.getAttribute('id') as string)
      if (id < dataNew.byteLength) {
        setHoverID(id);
        element.contentEditable = 'true';
        console.log(element)
        element.focus();
        const range = window.getSelection()?.getRangeAt(0);
        const cursorPosition = range?.startOffset as number;
        range?.setStart(element.firstChild as ChildNode, cursorPosition < element.innerHTML.length ? cursorPosition : element.innerHTML.length)
      }
      setEditing(true);
    }, [dataNew, editing]
  );
    
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
    }, [dataNew]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      //console.log(event);
      const element = (event.target as HTMLElement)
      const range = window.getSelection()?.getRangeAt(0);
      const cursorPosition = range?.startOffset as number;
      console.log(range?.startOffset);
      element.innerHTML = (element.innerHTML.replace(/[^0-9A-Fa-f]/g, '') + '00').slice(0, 2)
      if (event.key == 'Escape' || event.key == 'Enter') {
        const id = parseInt(element.getAttribute('id') as string)
        dataNew[id] = parseInt(element.innerHTML, 0x10)
        setEditing(false);
        element.contentEditable = 'false';
      } 
      console.log(range?.startOffset);
      range?.setStart(element.firstChild as ChildNode, cursorPosition < element.innerHTML.length ? cursorPosition : element.innerHTML.length)
    }, [dataNew]
  );
    
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      const element = (event.target as HTMLElement)
      const id = parseInt(element.getAttribute('id') as string)
      dataNew[id] = parseInt(element.innerHTML, 0x10)
      setEditing(false);
      element.contentEditable = 'false';
    }, [dataNew]
  );

  const handleSaveFile = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const url = URL.createObjectURL(new Blob([dataNew], { type: 'application/octet-stream' }));
      const aTag = document.createElement('a');
      aTag.style.display = 'none';
      aTag.href = url;
      aTag.download = 'new_' + fileName;
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(url);
    }, [dataNew]
  );


  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={{ ...style }}>
      <div style={{
        display: 'inline-block',
        width: '110px',
        color: theme.text,
        backgroundColor: index === Math.floor(hoverID / 0x10) ? theme.backgroudLineNoHighLight : theme.backgroudLineNo,
        paddingLeft: '20px',
      }}>{nToHexWithPadding(index * 10, 8)}</div>
      <div style={{
        display: 'inline-block',
        padding: '0 20px',
      }}>{Array(0x10).fill(0).map((_, i) => (
        <div key={i}
          id={(index * 0x10 + i).toString()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          onBlur={handleBlur}
          style={{
            display: 'inline-block',
            width: '32px',
            textAlign: 'center',
            fontWeight: index * 0x10 + i === hoverID ? '600' : '400',
            color: dataNew[index * 0x10 + i] === dataOrigin[index * 0x10 + i] ? theme.textStrong : theme.textModified,
            backgroundColor: index * 0x10 + i === hoverID ? theme.backgroudHighLight : '',
            marginRight: (i == 0x07) ? '20px' : '',
          }}
        >{index * 0x10 + i < dataNew.byteLength ? nToHexWithPadding(dataNew[index * 0x10 + i], 2) : ''}</div>))}
      </div>
      <div style={{
        display: 'inline-block',
        padding: '0 10px',
        backgroundColor: theme.backgroudLineNo,
      }}>{Array(0x10).fill(0).map((_, i) => (
        <div key={i}
          id={(index * 0x10 + i).toString()}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleMouseClick}
          style={{
            display: 'inline-block',
            width: '10px',
            textAlign: 'center',
            fontWeight: index * 0x10 + i === hoverID ? '600' : '400',
            color: asciiColor(index * 0x10 + i),
            backgroundColor: index * 0x10 + i === hoverID ? theme.backgroudHighLight : '',
          }}
        >{index * 0x10 + i < dataNew.byteLength ? nToASCIIPrintale(dataNew[index * 0x10 + i]) : ''}</div>))}
      </div>
    </div>
  );

  return (
    <MainContent>
      <Stack spacing={3} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<OpenInBrowserIcon />}
            component='label'
            variant='outlined'
            sx={{ borderRadius: '4px', width: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {fileName ? '已加载文件 - ' + fileName : '打开文件'}
            <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
          </Button>
          <Button
            startIcon={<DownloadIcon />}
            component='label'
            variant='outlined'
            onClick={handleSaveFile}
            sx={{ borderRadius: '4px', width: '150px' }}
          >保存文件</Button>
        </Stack>

        <Box sx={{
          height: '100%',
          marginTop: '20px',
          userSelect: 'none',
          lineHeight: '32px',
          fontFamily: 'Mono',
          fontSize: '14px',
          padding: '10px 0',
          backgroundColor: theme.backgroud,
        }}>
          <AutoSizer>
            {(size: Size) => (
              <FixedSizeList
                height={size.height}
                itemCount={Math.ceil(dataNew.byteLength / 0x10)}
                itemSize={32}
                width={size.width}
              >{Row}</FixedSizeList>)}
          </AutoSizer>
        </Box>
      </Stack>
    </MainContent>
  );
};

export default HexEditor;
