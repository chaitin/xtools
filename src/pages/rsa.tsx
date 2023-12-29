import MainContent from '@/components/MainContent';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import {
  Box,
  Stack,
  Tab,
  TextField,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import React from 'react';
import forge from 'node-forge';
import alertActions from '@/components/Alert';

const AES: React.FC = () => {
  const [method, setMethod] = React.useState('encrypt');
  const [keyBits, setKeyBits] = React.useState<number>(2048);
  const [publicKey, setPublicKey] = React.useState<string>('');
  const [privateKey, setPrivateKey] = React.useState<string>('');
  const [plaintext, setPlaintext] = React.useState<string>('');
  const [ciphertext, setCiphertext] = React.useState<string>('');
  const [padding, setPadding] = React.useState<string>('OAEP');
  const [encoding, setEncoding] = React.useState<string>('Base64');
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [keyInfo, setKeyInfo] = React.useState<{ [key: string]: string }>({});
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const handleMethodChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
    if (method === 'encrypt') {
      setCiphertext('');
    }
    if (method === 'decrypt') {
      setPlaintext('');
    }
    if (method === 'generate') {
      setKeyBits(2048);
      setCiphertext('');
      setPlaintext('');
      setPublicKey('');
      setPrivateKey('');
      setIsGenerating(false);
    }
  };

  function getPadding(padding: string) {
    switch (padding) {
      case 'PKCS1':
        return 'RSAES-PKCS1-V1_5';
      case 'OAEP':
        return 'RSA-OAEP';
      case 'Raw':
        return 'RAW';
      default:
        return 'RSA-OAEP';
    }
  }

  function parsePublicKey(publicKey: string) {
    if (publicKey === '') {
      return null;
    }
    var key = forge.pki.publicKeyFromPem(publicKey);
    return key;
  }

  function parsePrivateKey(privateKey: string) {
    if (privateKey === '') {
      return null;
    }
    var key = forge.pki.privateKeyFromPem(privateKey);
    return key;
  }

  function isValidHex(str: string) {
    return /^[0-9A-Fa-f]+$/.test(str);
  }

  function isValidBase64(str: string) {
    return /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
      str
    );
  }

  function encrypt(
    plaintext: string,
    publicKey: string,
    padding: string,
    encoding: string
  ) {
    var key = parsePublicKey(publicKey);
    if (key === null) {
      alertActions.error('请输入公钥！');
      return '';
    }
    if (plaintext === '') {
      alertActions.error('请输入明文！');
      return '';
    }

    plaintext = forge.util.encodeUtf8(plaintext);
    var encrypted;
    try {
      encrypted = key.encrypt(plaintext, getPadding(padding));
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('加密失败！');
      return '';
    }
    switch (encoding) {
      case 'Hex':
        return forge.util.bytesToHex(encrypted);
      case 'Base64':
        return forge.util.encode64(encrypted);
      default:
        alertActions.error('未知的编码格式！');
        return '';
    }
  }

  function decrypt(
    ciphertext: string,
    privateKey: string,
    padding: string,
    encoding: string
  ) {
    var key = parsePrivateKey(privateKey);
    if (key === null) {
      alertActions.error('请输入私钥！');
      return '';
    }
    if (ciphertext === '') {
      alertActions.error('请输入密文！');
      return '';
    }

    var bytes;
    switch (encoding) {
      case 'Hex':
        if (!isValidHex(ciphertext)) {
          alertActions.error('Hex 编码格式错误！');
          return '';
        }
        bytes = forge.util.hexToBytes(ciphertext);
        break;
      case 'Base64':
        if (!isValidBase64(ciphertext)) {
          alertActions.error('Base64 编码格式错误！');
          return '';
        }
        bytes = forge.util.decode64(ciphertext);
        break;
      default:
        alertActions.error('未知的编码格式！');
        return '';
    }

    var decrypted;
    try {
      decrypted = key.decrypt(bytes, getPadding(padding));
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('解密失败！');
      return '';
    }
    return forge.util.decodeUtf8(decrypted.replace(/^\0+/, ''));
  }

  const handleEncrypt = () => {
    setCiphertext(encrypt(plaintext, publicKey, padding, encoding));
  };

  const handleDecrypt = () => {
    setPlaintext(decrypt(ciphertext, privateKey, padding, encoding));
  };

  const handleParsePublicKey = () => {
    try {
      const key = parsePublicKey(publicKey);
      if (key) {
        const keyInfo = {
          n: key.n.toString(),
          e: key.e.toString(),
        };
        setKeyInfo(keyInfo);
        setOpenDialog(true);
      }
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('请输入正确公钥！');
    }
  };

  const handleParsePrivateKey = () => {
    try {
      const key = parsePrivateKey(privateKey);
      if (key) {
        const keyInfo = {
          n: key.n.toString(),
          e: key.e.toString(),
          d: key.d.toString(),
          p: key.p.toString(),
          q: key.q.toString(),
          dP: key.dP.toString(),
          dQ: key.dQ.toString(),
          qInv: key.qInv.toString(),
        };
        setKeyInfo(keyInfo);
        setOpenDialog(true);
      }
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('请输入正确私钥！');
    }
  };

  const generateKeyPair = async () => {
    setIsGenerating(true);
    forge.pki.rsa.generateKeyPair(
      { bits: keyBits, e: 0x10001, workers: 1 },
      function (err, keypair) {
        if (err) {
          console.log(err);
          alertActions.error('密钥生成失败！');
        } else {
          setPublicKey(forge.pki.publicKeyToPem(keypair.publicKey));
          setPrivateKey(forge.pki.privateKeyToPem(keypair.privateKey));
        }
        setIsGenerating(false);
      }
    );
  };

  const handleCopyToClipboard = () => {
    const keyInfoStr = Object.entries(keyInfo)
      .map(([key, value]) => `${key} = ${value}`)
      .join('\n');
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(keyInfoStr)
        .then(() => {
          alertActions.success('密钥信息已复制到剪贴板！');
        })
        .catch((err) => {
          alertActions.error('复制到剪贴板失败！');
        });
    }
    alertActions.error('复制到剪贴板失败！');
  };

  const onKeyBitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyBits(Number(event.target.value));
  };

  const onPublicKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPublicKey(event.target.value);
  };

  const onPrivateKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivateKey(event.target.value);
  };

  const onPlaintextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaintext(event.target.value);
  };

  const onCiphertextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCiphertext(event.target.value);
  };

  const onPaddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPadding(event.target.value);
  };

  const onEncodingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEncoding(event.target.value);
  };

  return (
    <MainContent>
      <>
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleMethodChange}>
              <Tab
                label='加密'
                value='encrypt'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='解密'
                value='decrypt'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='生成密钥'
                value='generate'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
        </TabContext>
        {method !== 'generate' && (
          <Stack direction='row'>
            <FormLabel
              sx={{
                lineHeight: '42px',
                width: '100px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              填充
            </FormLabel>
            <RadioGroup row value={padding} onChange={onPaddingChange}>
              <FormControlLabel value='OAEP' control={<Radio />} label='OAEP' />
              <FormControlLabel
                value='PKCS1'
                control={<Radio />}
                label='PKCS1'
              />
              <FormControlLabel value='Raw' control={<Radio />} label='Raw' />
            </RadioGroup>
          </Stack>
        )}
        {method !== 'generate' && (
          <Stack direction='row'>
            <FormLabel
              sx={{
                lineHeight: '42px',
                width: '100px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              编码
            </FormLabel>
            <RadioGroup row value={encoding} onChange={onEncodingChange}>
              <FormControlLabel
                value='Base64'
                control={<Radio />}
                label='Base64'
              />
              <FormControlLabel value='Hex' control={<Radio />} label='Hex' />
            </RadioGroup>
          </Stack>
        )}
        {method === 'generate' && (
          <Stack direction='row'>
            <FormLabel
              sx={{
                lineHeight: '42px',
                width: '100px',
                color: 'rgba(0, 0, 0, 0.87)',
              }}
            >
              Key Size
            </FormLabel>
            <RadioGroup row value={keyBits} onChange={onKeyBitsChange}>
              <FormControlLabel
                value='1024'
                control={<Radio />}
                label='1024 bits'
              />
              <FormControlLabel
                value='2048'
                control={<Radio />}
                label='2048 bits'
              />
              <FormControlLabel
                value='3072'
                control={<Radio />}
                label='3072 bits'
              />
              <FormControlLabel
                value='4096'
                control={<Radio />}
                label='4096 bits'
              />
            </RadioGroup>
          </Stack>
        )}
        {method !== 'generate' && (
          <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
            <TextField
              label={method === 'encrypt' ? '公钥 (PEM格式)' : '私钥 (PEM格式)'}
              placeholder={
                method === 'encrypt'
                  ? '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----'
                  : '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
              }
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={method === 'encrypt' ? publicKey : privateKey}
              onChange={
                method === 'encrypt' ? onPublicKeyChange : onPrivateKeyChange
              }
            />
            <TextField
              label='明文'
              placeholder='请输入要加密的明文'
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={plaintext}
              onChange={onPlaintextChange}
              sx={{ display: method === 'encrypt' ? 'block' : 'none' }}
            />
            <TextField
              label='密文'
              placeholder='请输入要解密的密文'
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={ciphertext}
              onChange={onCiphertextChange}
              sx={{ display: method === 'decrypt' ? 'block' : 'none' }}
            />
            <Stack
              direction='row'
              spacing={16}
              sx={{ mt: 2, justifyContent: 'center' }}
            >
              <Button
                variant='contained'
                onClick={method === 'encrypt' ? handleEncrypt : handleDecrypt}
                sx={{ alignSelf: 'start' }}
              >
                {method === 'encrypt' ? '加密' : '解密'}
              </Button>
              <Button
                variant='contained'
                onClick={
                  method === 'encrypt'
                    ? handleParsePublicKey
                    : handleParsePrivateKey
                }
                sx={{ alignSelf: 'start' }}
              >
                {method === 'encrypt' ? '解析公钥' : '解析私钥'}
              </Button>
            </Stack>
            <TextField
              label={method === 'encrypt' ? '密文' : '明文'}
              placeholder={method === 'encrypt' ? '加密结果' : '解密结果'}
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={method === 'encrypt' ? ciphertext : plaintext}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        )}
        {method === 'generate' && (
          <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
            <Button
              variant='contained'
              onClick={generateKeyPair}
              sx={{ alignSelf: 'start' }}
            >
              {isGenerating ? '请等待密钥生成...' : '生成密钥'}
            </Button>
          </Stack>
        )}
        {method === 'generate' && (
          <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
            <TextField
              label='公钥 (PEM格式)'
              placeholder={
                '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----'
              }
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={publicKey}
              onChange={onPublicKeyChange}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label='私钥 (PEM格式)'
              placeholder={
                '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----'
              }
              multiline
              rows={4}
              fullWidth
              margin='normal'
              variant='outlined'
              value={privateKey}
              onChange={onPrivateKeyChange}
              InputProps={{
                readOnly: true,
              }}
            />
          </Stack>
        )}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>密钥信息</DialogTitle>
          <DialogContent
            dividers
            sx={{ overflowY: 'auto', maxHeight: '200px' }}
          >
            {Object.entries(keyInfo).map(([key, value]) => (
              <DialogContentText key={key} sx={{ wordBreak: 'break-all' }}>
                <strong>{key} = </strong> {value}
              </DialogContentText>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCopyToClipboard}>复制信息</Button>
            <Button onClick={() => setOpenDialog(false)}>关闭</Button>
          </DialogActions>
        </Dialog>
      </>
    </MainContent>
  );
};

export default AES;
