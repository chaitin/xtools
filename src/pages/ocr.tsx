import alertActions from '@/components/Alert';
import MainContent from '@/components/MainContent';
import { Box, Button } from '@mui/material';
import { useCallback, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { createWorker } from 'tesseract.js';

const sxWrap = {
  fontSize: '12px',
  p: 2,
  mt: 2,
  borderRadius: '4px',
  backgroundColor: 'rgba(0, 0, 0, 0.05)',
  color: 'rgba(0, 0, 0, 0.5)',
};

const _C = () => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('');

  const upload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const copy = useCallback(() => {
    alertActions.success('复制成功');
  }, []);

  const convert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setText('');
      setError('');
      try {
        const imgUrl = URL.createObjectURL(file);

        const worker = await createWorker(
          'eng+chi_sim+rus+deu+fra+jpn+kor',
          1,
          {
            logger: (m) => {
              setStatus(
                JSON.stringify({
                  status: m.status,
                  progress: (m.progress * 100).toFixed(2) + '%',
                })
              );
            },
          }
        );
        const res: any = await worker.recognize(imgUrl);
        setText(res.data.text);
      } catch (error) {
        setError(String(error));
      }
    }
  };

  return (
    <MainContent>
      <Box>
        <Button
          sx={{ borderRadius: '4px' }}
          size='small'
          variant='outlined'
          onClick={upload}
        >
          上传图片
        </Button>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept={'image/*'}
          style={{ display: 'none' }}
          onChange={convert}
        />
        <Box sx={sxWrap}>
          {text
            ? '识别成功'
            : status || '点击上方按钮，上传图片即可识别图片中的文字！'}
        </Box>
        {text && (
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ ...sxWrap, whiteSpace: 'pre-line', color: '#333' }}>
              {text}
            </Box>
            <CopyToClipboard text={text} onCopy={copy}>
              <Box
                sx={{
                  position: 'absolute',
                  right: '16px',
                  top: '16px',
                  cursor: 'pointer',
                  color: 'primary.main',
                  fontSize: '12px',
                }}
              >
                复制
              </Box>
            </CopyToClipboard>
          </Box>
        )}
        {error && <Box sx={{ ...sxWrap, color: 'error.main' }}>{error}</Box>}
      </Box>
    </MainContent>
  );
};

export default _C;
