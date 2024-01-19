import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { Box, Button, Modal, OutlinedInput, Stack } from '@mui/material';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { useEffect, useRef, useState } from 'react';

const VideoFrame = () => {
  const [video, setVideo] = useState<File>();
  const [interval, setInterval] = useState<number>(3);
  const [duration, setDuration] = useState<number>(0);
  const [imgs, setImgs] = useState<string[]>([]);
  const [curImg, setCurImg] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [loadConfig, setLoadingConfig] = useState(false);
  const [fileDown, setFileDown] = useState(false);
  const [loadFrame, setLoadFrame] = useState(false);

  const ffmpegRef = useRef(new FFmpeg());
  const messageRef = useRef<HTMLDivElement | null>(null);

  const upload = () => {
    const videoInput = document.getElementById('videoframe');
    videoInput?.click();
  };

  const extract = async () => {
    try {
      setLoadFrame(true);
      const videoEl = document.getElementById('videoEl') as HTMLVideoElement;
      const duration = videoEl?.duration || 0;

      setImgs([]);
      setFiles([]);

      // 提取视频帧截图
      const ffmpeg = ffmpegRef.current;
      await ffmpeg.writeFile('input.mp4', await fetchFile(video));
      await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-vf',
        `fps=${interval}`,
        '-f',
        'image2',
        `output_%01d.png`,
      ]);

      const images = [];
      const files = [];

      for (let i = 0; i < Math.floor(duration * interval); i++) {
        const data = await ffmpeg.readFile(`output_${i + 1}.png`);
        const url = URL.createObjectURL(
          new Blob([data], { type: 'image/png' })
        );
        const file = new File([data], `frame${i + 1}.png`, {
          type: 'image/png',
        });
        files.push(file);
        images.push(url);
      }

      setFiles(files);
      setImgs(images);
      setLoadFrame(false);
      if (messageRef.current) messageRef.current.innerHTML = '截图提取完成';
    } catch (error) {
      if (messageRef.current)
        messageRef.current.innerHTML = `<div style="color: red">${error}</div>`;
      setLoadFrame(false);
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

  const download = () => {
    setFileDown(true);
    const zip = new JSZip();
    files.forEach((file) => {
      zip.file(file.name, file);
    });
    zip
      .generateAsync({ type: 'blob' })
      .then((content) => {
        saveAs(content, 'frames.zip');
      })
      .finally(() => {
        setFileDown(false);
      });
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
    <>
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
              上传视频后即可提取视频帧截图
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
        <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>视频帧设置</Box>
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'space-between'}
          spacing={2}
        >
          <Stack direction='row' alignItems={'center'} spacing={2}>
            <Box>视频帧采样间隔</Box>
            <OutlinedInput
              sx={{ width: '100px' }}
              type='number'
              value={(1 / interval).toFixed(2)}
              size='small'
              endAdornment='秒'
              onChange={(e) => {
                setInterval(Number(e.target.value) * 1000);
              }}
            />
            <Box>视频帧数</Box>
            <OutlinedInput
              sx={{ width: '100px' }}
              type='number'
              value={interval}
              size='small'
              endAdornment='fps'
              onChange={(e) => {
                const v = Number(e.target.value);
                setInterval(v >= 0 ? v : interval);
              }}
            />
            <Box>预计截取 {Math.floor(duration * interval)} 张</Box>
          </Stack>
          <Button
            variant='contained'
            onClick={extract}
            disabled={loadConfig || loadFrame || !video}
          >
            提取视频帧
          </Button>
        </Stack>
        <Box
          sx={{
            minHeight: '500px',
            border: '1px dashed #ccc',
            p: 2,
            bgcolor: '#f5f5f5',
          }}
        >
          <Stack direction='row' flexWrap={'wrap'} sx={{ gap: 2 }}>
            {imgs.map((it) => (
              <Box
                onClick={() => setCurImg(it)}
                component='img'
                width={409}
                src={it}
                key={it}
                sx={{ cursor: 'pointer' }}
              ></Box>
            ))}
          </Stack>
        </Box>
        <Button
          variant='contained'
          onClick={download}
          disabled={files.length === 0 || fileDown}
        >
          下载所有视频帧截图
        </Button>
        <Box
          id='videoframe'
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
      <Modal open={!!curImg} onClose={() => setCurImg('')}>
        <Box
          sx={{ maxWidth: '100vw', maxHeight: '100vh', cursor: 'pointer' }}
          component='img'
          onClick={() => setCurImg('')}
          src={curImg}
        />
      </Modal>
    </>
  );
};

export default VideoFrame;
