import MenuView from '@/components/MainContent';
import { Box, Button, Stack, Tab } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TextField from '@mui/material/TextField';

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

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

const OutImg = styled('img')({
  Width: '100%',
  border: 'black solid 1px',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  margin: '20px',
  padding: '20px',
  borderRadius: '3px',
});

const MySpan = styled('span')({});

const ImgBase64: React.FC = () => {
  const [decodeIn, setdecodeIn] = useState<string>(
    'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMjk4cHgiIGhlaWdodD0iMzI0cHgiIHZpZXdCb3g9IjAgMCAyOTggMzI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPHRpdGxlPumbt+axoGxvZ288L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IHgxPSI1MCUiIHkxPSIwJSIgeDI9IjUwJSIgeTI9IjEwMCUiIGlkPSJsaW5lYXJHcmFkaWVudC0xIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iIzRCNEI0QiIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjMDAwMDAwIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0ibGluZWFyR3JhZGllbnQtMiI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwRkM2QzIiIHN0b3Atb3BhY2l0eT0iMC45IiBvZmZzZXQ9IjAlIj48L3N0b3A+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiMwRkM2QzIiIHN0b3Atb3BhY2l0eT0iMC43IiBvZmZzZXQ9Ijk5Ljk0MjYzNTUlIj48L3N0b3A+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8cGF0aCBkPSJNMTEwLjA0OTY1Nyw0OS42Njc2NDkgQzExMC4wNDk2NTcsNDkuNjY3NjQ5IDgxLjEzNTg3MDIsNDYuMjI2MzExNSA3Ni44LDI2Ljc2MzYzNjQgQzcyLjQ4ODA4NDgsNDYuMjI2MzExNSA0My41NTAzNDMxLDQ5LjY2NzY0OSA0My41NTAzNDMxLDQ5LjY2NzY0OSBDMTQuMjA1MzY0OSw1My4zMDAxNzE4IDAsMzYuNDU2NzM2OSAwLDM2LjQ1NjczNjkgQzEzLjk0MTg1OSw2NS44MDM2OTc5IDM4LjQsNjQuNzcxMjk2NyAzOC40LDY0Ljc3MTI5NjcgTDExNS4yLDY0Ljc3MTI5NjcgQzExNS4yLDY0Ljc3MTI5NjcgMTM5LjYzNDE4Niw2NS44MDM2OTc5IDE1My42LDM2LjQ1NjczNjkgQzE1My42LDM2LjQ1NjczNjkgMTM5LjM5NDYzNSw1My4zMTkyOTA0IDExMC4wNDk2NTcsNDkuNjY3NjQ5IFoiIGlkPSJwYXRoLTMiPjwvcGF0aD4KICAgICAgICA8ZmlsdGVyIHg9Ii0xNi45JSIgeT0iLTU3LjklIiB3aWR0aD0iMTMzLjklIiBoZWlnaHQ9IjIzNi44JSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZmlsdGVyLTQiPgogICAgICAgICAgICA8ZmVPZmZzZXQgZHg9IjAiIGR5PSI0IiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIj48L2ZlT2Zmc2V0PgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI4IiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiPjwvZmVHYXVzc2lhbkJsdXI+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMCAwIDAgMCAwLjAzNDY1OTI0OTggICAwIDAgMCAwIDAuNDEwMTI3OTQ0ICAgMCAwIDAgMCAwLjQwMTkyMDk3OCAgMCAwIDAgMSAwIiB0eXBlPSJtYXRyaXgiIGluPSJzaGFkb3dCbHVyT3V0ZXIxIj48L2ZlQ29sb3JNYXRyaXg+CiAgICAgICAgPC9maWx0ZXI+CiAgICA8L2RlZnM+CiAgICA8ZyBpZD0i6aG16Z2iLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSLpm7fmsaBsb2dvIj4KICAgICAgICAgICAgPHBhdGggZD0iTTI5Mi40MDgzNiw1OS4wNCBDMjkwLjkyNzIxNyw1MS45NjM0Mjg2IDI4NS4wMDI2NDYsNDYuNjk3MTQyOSAyNzcuNzYxNTAzLDQ2LjM2OCBDMjIyLjEzNjM2LDQ0Ljg4Njg1NzEgMTc2LjM4NTUwMywxNi41ODA1NzE0IDE1Ny45NTM1MDMsMy4wODU3MTQyOSBDMTUyLjM1ODA3NCwtMS4wMjg1NzE0MyAxNDQuOTUyMzYsLTEuMDI4NTcxNDMgMTM5LjM1NjkzMSwzLjA4NTcxNDI5IEMxMjAuNDMxMjE3LDE2LjU4MDU3MTQgNzUuMTc0MDc0Miw0NC44ODY4NTcxIDE5LjU0ODkzMTQsNDYuMzY4IEMxMi40NzIzNTk5LDQ2LjY5NzE0MjkgNi4yMTg2NDU2NSw1MS45NjM0Mjg2IDQuOTAyMDc0MjIsNTkuMDQgQy0zLjk4NDc4MjkyLDEwMy40NzQyODYgLTE5LjI4OTkyNTgsMjU0LjA1NzE0MyAxNDguOTAyMDc0LDMyNCBDMzE2LjYwMDM2LDI1My44OTI1NzEgMzAwLjk2NjA3NCwxMDMuNDc0Mjg2IDI5Mi40MDgzNiw1OS4wNCBaIiBpZD0i6Lev5b6EIiBmaWxsPSJ1cmwoI2xpbmVhckdyYWRpZW50LTEpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE0OSwyNjEuNCBDMjA1LjU1Mzk1OCwyNjEuNCAyNTEuNCwyMTUuNTUzOTU4IDI1MS40LDE1OSBDMjUxLjQsMTMxLjI3NTAwNCAyNDAuMzgxNTkzLDEwNi4xMjM0OTQgMjIyLjQ4NDgxMyw4Ny42ODU1MDY4IEMyMDkuOTAwNzQ5LDk2LjA5NjQ1NjggMTg1LjgxNTEyLDEwNi4wMjQxNzggMTc1LjU2NDI1OSwxMDAuODUzNjg4IEMxNjYuMzM0ODc5LDk2LjE5ODQyNzMgMTU3LjQ3NjU5MSw4OC40NTA1NjUyIDE0OC45ODkzOTYsNzcuNjEwMTAxIEMxNDIuMDQ3NzY5LDg4LjUzMzQxMDIgMTM0LjY3MDU4Niw5NS41NTE3MjIxIDEyNi44NTc4NDgsOTguNjY1MDM2NyBDMTIwLjY4OTQxOSwxMDEuMTIzMTA3IDk4LjI1OTI2MDQsMTAyLjkxNTY5NSA3NS40NDE5NDY3LDg3Ljc2MTAzOSBDNTcuNTg4MzUxMywxMDYuMTkyMTU0IDQ2LjYsMTMxLjMxMjg0NCA0Ni42LDE1OSBDNDYuNiwyMTUuNTUzOTU4IDkyLjQ0NjA0MTYsMjYxLjQgMTQ5LDI2MS40IFoiIGlkPSLmpK3lnIblvaLlpIfku70tMzEiIGZpbGw9InVybCgjbGluZWFyR3JhZGllbnQtMikiPjwvcGF0aD4KICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC015aSH5Lu9LTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkxLjc3MTQyMywgMTAyLjEwMTcyMikiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9Iui3r+W+hC0xMzDlpIfku70tMjkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU3LjIxNzk3MSwgOTUuOTIwOTk5KSByb3RhdGUoLTE4MC4wMDAwMDApIHRyYW5zbGF0ZSgtNTcuMjE3OTcxLCAtOTUuOTIwOTk5KSAiIHBvaW50cz0iNTYuNjY1MTUxMSA2NC45NDk2MzcyIC03LjU3MjQxNzM4ZS0xNyA5Ny4xMTA4NDEzIDUwLjYwODQwMzYgMTI2Ljg5MjM2MSA2OC44MDE2NzI5IDExNy4yNjQ3MDQgMzQuMzQzMzIyOCA5Ny4xMTA4NDEzIDU2LjY2NTE1MTEgODQuNTUwMzA4NiA5Ni45MDAxMDkxIDEwNy4zNzY3MTEgOTYuOTAwMTA5MSAxMTQuODgzOTkgMTE0LjQzNTk0MiAxMjUuNDM1NTUzIDExNC40MzU5NDIgOTcuMTEwODQxMyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9Iui3r+W+hC0xMzDlpIfku70tMzAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDU3LjIxNzk3MSwgMzAuOTcxMzYyKSByb3RhdGUoLTM2MC4wMDAwMDApIHRyYW5zbGF0ZSgtNTcuMjE3OTcxLCAtMzAuOTcxMzYyKSAiIHBvaW50cz0iNTYuNjY1MTUxMSAwIC03LjU3MjQxNzM4ZS0xNyAzMi4xNjEyMDQxIDUwLjYwODQwMzYgNjEuOTQyNzIzOSA2OC44MDE2NzI5IDUyLjMxNTA2NjggMzQuMzQzMzIyOCAzMi4xNjEyMDQxIDU2LjY2NTE1MTEgMTkuNjAwNjcxNCA5Ni45MDAxMDkxIDQyLjQyNzA3NDEgOTYuOTAwMTA5MSA0OS45MzQzNTI4IDExNC40MzU5NDIgNjAuNDg1OTE1NSAxMTQuNDM1OTQyIDMyLjE2MTIwNDEiPjwvcG9seWdvbj4KICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8ZyBpZD0i6ZW/5LqtbG9nb+Wkh+S7vS0yMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzIuMjAwMDAwLCA0NS4yMjIyMjIpIiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICAgICAgPGcgaWQ9Iue8lue7hC03Ij4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNOTYuNzYzMjY2NiwxOC4wMDYxODM3IEM5Ni43NjMyNjY2LDE4LjAwNjE4MzcgNzkuMzg2Mjk2OSwxNS4yOTY2MDg1IDc2Ljc5MDc5NjEsMCBDNzQuMTk1Mjk1MywxNS4yOTY2MDg1IDU2LjgxODMyNTYsMTguMDA2MTgzNyA1Ni44MTgzMjU2LDE4LjAwNjE4MzcgQzM5LjE4MzY0NjYsMjAuODY5NDkzNiAzMC42NDI0MjQyLDcuNjA5ODcwNTggMzAuNjQyNDI0Miw3LjYwOTg3MDU4IEMzOS4wMzYzODQyLDMwLjY4OTMwMTMgNTMuNzI1ODE0MSwyOS44NjI5NzcgNTMuNzI1ODE0MSwyOS44NjI5NzcgTDk5Ljg3NDE4NTksMjkuODYyOTc3IEM5OS44NzQxODU5LDI5Ljg2Mjk3NyAxMTQuNTYzNjE2LDMwLjY3MDA4NDUgMTIyLjk1NzU3Niw3LjYwOTg3MDU4IEMxMjIuOTU3NTc2LDcuNjA5ODcwNTggMTE0LjQxNjM1MywyMC44Njk0OTM2IDk2Ljc4MTY3NDQsMTguMDA2MTgzNyBMOTYuNzYzMjY2NiwxOC4wMDYxODM3IFoiIGlkPSLot6/lvoQiIGZpbGw9IiMwRkM2QzIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0i6Lev5b6EIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIxIiBmaWx0ZXI9InVybCgjZmlsdGVyLTQpIiB4bGluazpocmVmPSIjcGF0aC0zIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICAgICAgPHVzZSBmaWxsPSIjMEZDNkMyIiB4bGluazpocmVmPSIjcGF0aC0zIj48L3VzZT4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='
  );
  const [encodeIn, setencodeIn] = useState<string>('');
  const [encodeOut, setencodeOut] = useState<string>('');
  const [decodeOut, setdecodeOut] = useState<string>('');

  const onDecodeInChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setdecodeIn(event.target.value);
    },
    []
  );

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          setencodeIn(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    },
    []
  );

  const decode = useCallback(() => {
    setdecodeOut(decodeIn);
  }, [decodeIn]);

  const encode = useCallback(() => {
    setencodeOut(encodeIn);
  }, [encodeIn]);

  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <MenuView>
      <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabChange}>
                <Tab
                  label='图片转 Base64'
                  value='1'
                  sx={{ textTransform: 'none !important' }}
                />
                <Tab
                  label='Base64 转图片'
                  value='2'
                  sx={{ textTransform: 'none !important' }}
                />
              </TabList>
            </Box>
            <TabPanel value='1' sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Stack spacing={1} sx={{ color: '#FF1844' }}>
                <Button
                  component='label'
                  variant='outlined'
                  sx={{ borderRadius: '3px', height: '179px' }}
                >
                  {encodeIn ? <MySpan></MySpan> : <MySpan>选择图片</MySpan>}
                  <UploadImg src={encodeIn} />
                  <VisuallyHiddenInput
                    type='file'
                    onChange={handleSelectFile}
                  />
                </Button>
                <Button
                  size='small'
                  sx={{
                    borderRadius: '4px',
                  }}
                  component='label'
                  variant='contained'
                  color='primary'
                  onClick={encode}
                >
                  转换
                </Button>
                <TextField
                  value={encodeOut}
                  variant='outlined'
                  multiline
                  rows={6}
                  InputProps={{ readOnly: true }}
                  sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
                />
              </Stack>
            </TabPanel>
            <TabPanel value='2' sx={{ paddingLeft: 0, paddingRight: 0 }}>
              <Stack spacing={1} sx={{ color: '#FF1844' }}>
                <TextField
                  value={decodeIn}
                  variant='outlined'
                  multiline
                  rows={6}
                  onChange={onDecodeInChange}
                  sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
                />
                <Button
                  size='small'
                  sx={{
                    borderRadius: '4px',
                  }}
                  component='label'
                  variant='contained'
                  color='primary'
                  onClick={decode}
                >
                  转换
                </Button>
                <OutImg src={decodeOut} />
              </Stack>
            </TabPanel>
          </TabContext>
        </Box>
      </>
    </MenuView>
  );
};

export default ImgBase64;
