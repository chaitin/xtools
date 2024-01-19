import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import GifBoxIcon from '@mui/icons-material/GifBox';
import { Box, Button, OutlinedInput, Stack } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { useEffect, useRef, useState } from 'react';

dayjs.extend(duration);

const _C = () => {
  const [video, setVideo] = useState<File>();
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [transformTime, setTransformTime] = useState<number>(3);
  const [gif, setGif] = useState<string>('');

  const [loadFile, setLoadFile] = useState(false);
  const [loadConfig, setLoadingConfig] = useState(false);
  const [loadTransform, setLoadTransform] = useState(false);

  const messageRef = useRef<HTMLDivElement | null>(null);
  const ffmpegRef = useRef(new FFmpeg());

  const upload = () => {
    const videoInput = document.getElementById('video');
    videoInput?.click();
  };

  const download = () => {
    setLoadFile(true);
    const link = document.createElement('a');
    link.href = gif;
    link.download = 'output.gif';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoadFile(false);
  };

  const transform = async () => {
    try {
      setGif('');
      setLoadTransform(true);
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile('input.mp4', await fetchFile(video));
      await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-t',
        `${transformTime}`,
        '-ss',
        `${dayjs.duration(startTime, 'seconds').format('HH:mm:ss')}`,
        `output.gif`,
      ]);

      const data = await ffmpeg.readFile(`output.gif`);
      const url = URL.createObjectURL(new Blob([data], { type: 'image/gif' }));
      setGif(url);

      setLoadTransform(false);
      if (messageRef.current) messageRef.current.innerHTML = 'gif created';
    } catch (error) {
      if (messageRef.current)
        messageRef.current.innerHTML = `<div style="color: red">${error}</div>`;
      setLoadTransform(false);
    }
  };

  const loadPlugin = async () => {
    setLoadingConfig(true);
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });
    setLoadingConfig(false);
  };

  useEffect(() => {
    const videoEl = document.getElementById('videoEl') as HTMLVideoElement;
    videoEl?.addEventListener('loadeddata', () => {
      const duration = videoEl?.duration || 0;
      setDuration(duration);
    });
  }, [video]);

  useEffect(() => {
    loadPlugin();
  }, []);

  return (
    <Stack spacing={2}>
      <Stack direction='row' alignItems={'center'} spacing={2}>
        <Button variant='outlined' onClick={upload}>
          {!!video ? '更换视频' : '上传视频'}
        </Button>
        {!!video && <Box>{video.name}</Box>}
      </Stack>
      <Box
        sx={{
          minHeight: '290px',
          bgcolor: '#f5f5f5',
        }}
      >
        {video ? (
          <Box
            component='video'
            id='videoEl'
            controls
            sx={{ width: '100%' }}
            src={URL.createObjectURL(video)}
          ></Box>
        ) : (
          <Box
            onClick={upload}
            sx={{
              fontSize: '12px',
              color: '#999',
              textAlign: 'center',
              lineHeight: '290px',
              cursor: 'pointer',
            }}
          >
            上传视频后即可转换 Gif
          </Box>
        )}
      </Box>
      <Box
        sx={{
          fontSize: '12px',
          bgcolor: 'rgba(0,0,0,0.1)',
          px: 2,
          borderRadius: '4px',
          lineHeight: '40px',
        }}
        ref={messageRef}
      ></Box>
      <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>转换参数</Box>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Stack direction='row' alignItems={'center'} spacing={2}>
          <Box>从视频第</Box>
          <OutlinedInput
            sx={{ width: '100px' }}
            type='number'
            value={startTime}
            size='small'
            endAdornment='秒'
            onChange={(e) => setStartTime(Number(e.target.value))}
          />
          <Box>开始，截取时长为</Box>
          <OutlinedInput
            sx={{ width: '100px' }}
            type='number'
            value={transformTime}
            size='small'
            endAdornment='秒'
            onChange={(e) => setTransformTime(Number(e.target.value))}
          />
          <Box>的片段</Box>
        </Stack>
        <Button
          variant='contained'
          disabled={loadConfig || loadTransform}
          onClick={transform}
        >
          转换
        </Button>
      </Stack>
      <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>转换结果</Box>
      <Box
        sx={{
          height: '56px',
          lineHeight: '24px',
          border: '1px dashed #ccc',
          p: 2,
          bgcolor: '#f5f5f5',
          color: '#999',
        }}
      >
        {!!gif ? (
          <Stack direction={'row'} spacing={2}>
            <GifBoxIcon />
            <Box
              component='a'
              href={gif}
              download={video?.name.split('.')[0] + '.gif'}
            >
              {video?.name.split('.')[0] + '.gif'}
            </Box>
          </Stack>
        ) : (
          <Box sx={{ fontSize: '12px' }}>暂无转换结果</Box>
        )}
      </Box>
      <Box
        id='video'
        component='input'
        type='file'
        accept='video/*'
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            setVideo(file);
          }
        }}
      />
    </Stack>
  );
};

export default _C;
