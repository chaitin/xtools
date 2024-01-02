import MainContent from '@/components/MainContent';
import { Box, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
};

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

const HexEdit = styled('input')({});

const nToHexWithPadding = (n: number, padding: number) =>
  ('0'.repeat(padding) + n.toString(16)).slice(-padding);
const nToASCIIPrintale = (n: number) =>
  n >= 0x20 && n <= 0x7e ? String.fromCharCode(n) : '.';

const HexEditor: React.FC = () => {
  const [dataOrigin, setDataOrigin] = useState<Uint8Array>(
    new Uint8Array(0x100)
  );
  const [dataNew, setDataNew] = useState<Uint8Array>(new Uint8Array(0x100));
  const [hoverID, setHoverID] = useState<number>(-1);
  const [editing, setEditing] = useState<boolean>(false);
  const [fileName, setFileName] = useState<string>();
  const [editValue, setEditValue] = useState<string>('00');

  const refInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      refInput.current?.focus();
    }
  });

  const asciiColor = (itemID: number) => {
    if (itemID === hoverID) {
      return theme.textStrong;
    } else if (dataNew[itemID] !== dataOrigin[itemID]) {
      return theme.textModified;
    } else if (dataNew[itemID] < 0x20 || dataNew[itemID] > 0x7e) {
      return theme.textWeak;
    } else {
      return theme.text;
    }
  };

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          const arrOrigin = new Uint8Array(e.target.result as ArrayBuffer);
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
        return;
      }
      const itemID = parseInt(
        (event.target as HTMLElement).getAttribute('itemID') as string
      );
      if (itemID < dataNew.byteLength) {
        setHoverID(itemID);
      }
    },
    [dataNew, editing]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (editing) {
        return;
      }
      setHoverID(-1);
    },
    [editing]
  );

  const handleMouseClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const element = event.target as HTMLElement;
      const itemID = parseInt(element.getAttribute('itemID') as string);
      if (itemID < dataNew.byteLength) {
        goEdit(itemID);
      }
    },
    [dataNew]
  );

  const handleKeyUp = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape' || event.key === 'Enter') {
        refInput.current?.blur();
      }
    },
    [refInput, editValue]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      const itemID = parseInt(
        refInput.current?.getAttribute('itemID') as string
      );
      if (event.key === 'Backspace' && editValue.length === 0) {
        refInput.current?.blur();
        goEdit(itemID - 1);
      }
    },
    [refInput, editValue]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      write();
    },
    [dataNew, editValue]
  );

  const handleSaveFile = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const url = URL.createObjectURL(
        new Blob([dataNew], { type: 'application/octet-stream' })
      );
      const aTag = document.createElement('a');
      aTag.style.display = 'none';
      aTag.href = url;
      aTag.download = 'new_' + fileName;
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(url);
    },
    [fileName, dataNew]
  );

  const handleEditChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const itemID = parseInt(
        refInput.current?.getAttribute('itemID') as string
      );
      if (/[^0-9A-Fa-f]/.test(event.target.value)) {
        return;
      }
      if (event.target.value.length <= 2) {
        setEditValue(event.target.value);
      } else if (event.target.value.length > 2) {
        setEditValue(event.target.value.slice(0, 2));
        write();
        goEdit(itemID + 1);
      }
    },
    [hoverID, refInput, editValue, setEditValue]
  );

  const goEdit = useCallback(
    (itemID: number) => {
      setTimeout(() => {
        setHoverID(itemID);
        setEditing(true);
        setEditValue(nToHexWithPadding(dataNew[itemID], 2));
        setTimeout(() => {
          refInput.current?.setSelectionRange(0, 2);
        }, 100);
      }, 100);
    },
    [refInput, editValue]
  );

  const write = useCallback(() => {
    dataNew[parseInt(refInput.current?.getAttribute('itemID') as string)] =
      parseInt(editValue.length > 0 ? editValue : '0', 0x10);
    setEditing(false);
  }, [refInput, editValue]);

  const rows = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => (
      <div style={{ ...style }}>
        <div
          style={{
            display: 'inline-block',
            width: '110px',
            color: theme.text,
            backgroundColor:
              index === Math.floor(hoverID / 0x10)
                ? theme.backgroudLineNoHighLight
                : theme.backgroudLineNo,
            paddingLeft: '20px',
          }}
        >
          {nToHexWithPadding(index * 0x10, 8)}
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '0 20px',
          }}
        >
          {Array(0x10)
            .fill(0)
            .map((_, i) => {
              if (editing && hoverID == index * 0x10 + i) {
                return (
                  <input
                    key={i}
                    ref={refInput}
                    itemID={(index * 0x10 + i).toString()}
                    value={editValue}
                    onChange={handleEditChange}
                    onKeyUp={handleKeyUp}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    style={{
                      fontFamily: 'Mono',
                      fontSize: '14px',
                      width: '32px',
                      height: '30px',
                      border: '0',
                      outline: 'none',
                      textAlign: 'center',
                      color: theme.textStrong,
                      backgroundColor: theme.backgroudHighLight,
                      marginRight: i == 0x07 ? '20px' : '',
                    }}
                  ></input>
                );
              } else {
                return (
                  <Box
                    key={i}
                    itemID={(index * 0x10 + i).toString()}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleMouseClick}
                    style={{
                      display: 'inline-block',
                      width: '32px',
                      height: '30px',
                      textAlign: 'center',
                      fontWeight: index * 0x10 + i === hoverID ? '600' : '400',
                      color:
                        dataNew[index * 0x10 + i] ===
                        dataOrigin[index * 0x10 + i]
                          ? theme.textStrong
                          : theme.textModified,
                      backgroundColor:
                        index * 0x10 + i === hoverID
                          ? theme.backgroudHighLight
                          : '',
                      marginRight: i == 0x07 ? '20px' : '',
                    }}
                  >
                    {index * 0x10 + i < dataNew.byteLength
                      ? nToHexWithPadding(dataNew[index * 0x10 + i], 2)
                      : ''}
                  </Box>
                );
              }
            })}
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '0 10px',
            backgroundColor: theme.backgroudLineNo,
          }}
        >
          {Array(0x10)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                itemID={(index * 0x10 + i).toString()}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseClick}
                style={{
                  display: 'inline-block',
                  width: '10px',
                  textAlign: 'center',
                  fontWeight: index * 0x10 + i === hoverID ? '600' : '400',
                  color: asciiColor(index * 0x10 + i),
                  backgroundColor:
                    index * 0x10 + i === hoverID
                      ? theme.backgroudHighLight
                      : '',
                }}
              >
                {index * 0x10 + i < dataNew.byteLength
                  ? nToASCIIPrintale(dataNew[index * 0x10 + i])
                  : ''}
              </div>
            ))}
        </div>
      </div>
    ),
    [dataNew, dataOrigin, editValue, hoverID, editing]
  );

  return (
    <MainContent>
      <Stack spacing={3} sx={{ height: '100%' }}>
        <Stack direction='row' spacing={2}>
          <Button
            startIcon={<OpenInBrowserIcon />}
            component='label'
            variant='outlined'
            sx={{
              borderRadius: '4px',
              width: '100%',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
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
          >
            保存文件
          </Button>
        </Stack>

        <Box
          sx={{
            height: '100%',
            marginTop: '20px',
            userSelect: 'none',
            lineHeight: '32px',
            fontFamily: 'Mono',
            fontSize: '14px',
            padding: '10px 0',
            backgroundColor: theme.backgroud,
          }}
        >
          <AutoSizer>
            {(size: Size) => (
              <FixedSizeList
                height={size.height}
                itemCount={Math.ceil(dataNew.byteLength / 0x10)}
                itemSize={32}
                width={size.width}
              >
                {rows}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Box>
      </Stack>
    </MainContent>
  );
};

export default HexEditor;
