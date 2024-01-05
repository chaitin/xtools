import MainContent from '@/components/MainContent';
import bufferToWave from '@/utils/bufferToWave';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const _C = () => {
  const [audioUrl, setAudioUrl] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [err, setError] = useState('');

  const handleBuffer = (buffer: ArrayBuffer, name: string) => {
    if (/\//.test(name)) {
      name = name.split('/').slice(-1)[0];
    }
    name = name.split('.')[0];
    setName(name);

    const audioCtx = new AudioContext();
    audioCtx.decodeAudioData(buffer, function (audioBuffer) {
      const blob = bufferToWave(
        audioBuffer,
        audioBuffer.sampleRate * audioBuffer.duration
      );
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    });
  };

  const convert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUrl('');
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          const arrBuffer = e.target.result;
          handleBuffer(arrBuffer as ArrayBuffer, file.name);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const upload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const getUrl = () => {
    if (url) {
      fetch(url)
        .then((res) => res.arrayBuffer())
        .then((res) => handleBuffer(res, name))
        .catch((err) => setError(String(err)));
    }
  };

  return (
    <MainContent>
      <Box>
        <Box sx={{ mb: 2, fontWeight: 600 }}>1. 本地视频</Box>
        <Button
          sx={{ borderRadius: '4px' }}
          size='small'
          variant='contained'
          onClick={upload}
        >
          上传视频
        </Button>
        <Box sx={{ my: 2, fontWeight: 600 }}>2. 网络视频</Box>
        <Stack direction={'row'} spacing={2}>
          <TextField
            sx={{
              width: '500px',
              input: {
                p: '6px 10px',
              },
              'input::placeholder': {
                fontSize: '14px',
              },
            }}
            size='small'
            placeholder='请输入网络视频链接，需要允许跨域'
            variant='outlined'
            value={url}
            onChange={(e: any) => setUrl(e.target.value)}
          />
          <Button
            sx={{ borderRadius: '4px' }}
            size='small'
            variant='outlined'
            onClick={getUrl}
          >
            提取
          </Button>
        </Stack>
        {audioUrl && (
          <Box
            sx={{
              mt: 6,
              width: '500px',
              borderRadius: '4px',
              p: 2,
              border: '1px solid #eee',
            }}
          >
            <Box sx={{ mb: 2, fontWeight: 600 }}>试听音频</Box>
            <audio controls>
              <source src={audioUrl} />
            </audio>
            <Box sx={{ mt: 2, fontSize: '14px' }}>
              <Box component='a' href={audioUrl} download={name + '.wav'}>
                点击此处下载音频
              </Box>
            </Box>
          </Box>
        )}
        {err && (
          <Box
            sx={{
              mt: 6,
              width: '500px',
              borderRadius: '4px',
              p: 2,
              border: '1px solid #eee',
              fontSize: '12px',
              color: 'error.main',
            }}
          >
            {err}
          </Box>
        )}
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept={'video/*'}
          style={{ display: 'none' }}
          onChange={convert}
        />
      </Box>
    </MainContent>
  );
};

export default _C;
