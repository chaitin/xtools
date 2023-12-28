import MainContent from '@/components/MainContent';
import {
  Box,
  Grid,
  Button,
  MenuItem,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import Select from '@mui/material/Select';
import React, { useCallback } from 'react';
import Image from 'next/image';
import sunglasses from '@/asset/tools/sunglasses.png';

import crypt from 'apache-crypt';
import md5 from 'apache-md5';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import alert from '@/components/Alert';
import FormItem from '@/components/FormItem';
import { ToolsForm } from '@/components/Tools';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/hljs';
interface IHtpasswdEncrypt {
  Options?: Record<string, any>;
  Encrypt(text: string): string;
}

class Md5Encryptor implements IHtpasswdEncrypt {
  Encrypt(text: string): string {
    return md5(text);
  }
}

class PlainEncryptor implements IHtpasswdEncrypt {
  Encrypt(text: string): string {
    return text;
  }
}

class ShaEncryptor implements IHtpasswdEncrypt {
  Encrypt(text: string): string {
    let hash = crypto.createHash('sha1');
    return '{SHA}' + hash.update(text).digest('base64');
  }
}

class CryptEncryptor implements IHtpasswdEncrypt {
  Encrypt(text: string): string {
    return crypt(text);
  }
}

class BcryptEncryptor implements IHtpasswdEncrypt {
  Options = { cost: 10 };

  Encrypt(text: string): string {
    let salt: string = bcrypt.genSaltSync(this.Options.cost);
    return bcrypt.hashSync(text, salt);
  }
}

const encryptors: Record<string, IHtpasswdEncrypt> = {
  md5: new Md5Encryptor(),
  sha: new ShaEncryptor(),
  plain: new PlainEncryptor(),
  crypt: new CryptEncryptor(),
  bcrypt: new BcryptEncryptor(),
};

const encryption_desc: Record<string, string> = {
  md5: '使用 md5 加密，2.2.18 以后的默认加密方式',
  sha: '使用 sha1 加密，当前已经不安全',
  plain: '不加密，全平台通用',
  crypt: '使用 crypt 加密，2.2.17 之前的默认加密方式，当前已经不安全',
  bcrypt: "使用 bcrypt 加密，号称当前全地球'最安全'的加密方式",
};

const nginx_basci_conf = `server {
  auth_basic           "Administrator’s Area";
  auth_basic_user_file /etc/nginx/.htpasswd;
}
`;

const Htpasswd: React.FC = () => {
  // values
  const [username, setUsername] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [method, setmethod] = React.useState('md5');
  const [ciphertext, setCiphertext] = React.useState('');

  // handlers
  const onEncrypt = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (username === '') {
        alert.warning('用户名不能为空');
        return;
      }
      if (passwd === '') {
        alert.warning('密码不能为空');
        return;
      }
      if (method === '') {
        alert.warning('需要选择一个加密方式');
        return;
      }
      let encryptor: IHtpasswdEncrypt = encryptors[method] || encryptors['md5'];
      setCiphertext(username + ':' + encryptor.Encrypt(passwd));
    },
    [username, passwd, method]
  );

  return (
    <MainContent>
      <>
        <ToolsForm sx={{ width: '100%' }}>
          <form onSubmit={onEncrypt}>
            <Stack sx={{ mt: '30px', gap: '18px' }}>
              <FormItem label='用户名' singleLine>
                <OutlinedInput
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </FormItem>
              <FormItem label='密码' singleLine>
                <OutlinedInput
                  value={passwd}
                  onChange={(e) => {
                    setPasswd(e.target.value);
                  }}
                />
              </FormItem>
              <FormItem label='加密算法'>
                <Select
                  variant='outlined'
                  value={method}
                  onChange={(e) => {
                    setmethod(e.target.value);
                  }}
                >
                  {Object.keys(encryptors).map((item) => (
                    <MenuItem key={item} value={item}>
                      {item.toUpperCase()}
                      <Typography variant='caption'>
                        （{encryption_desc[item]}）
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormItem>
              <Box sx={{ pl: '157px' }}>
                <Button
                  size='small'
                  sx={{
                    borderRadius: '4px',
                    px: 4,
                  }}
                  variant='contained'
                  color='primary'
                  type='submit'
                >
                  加密
                </Button>
              </Box>
              {ciphertext ? (
                <FormItem label='密文' singleLine>
                  <OutlinedInput value={ciphertext} />
                </FormItem>
              ) : null}
            </Stack>
          </form>
        </ToolsForm>

        <Box
          sx={{
            width: '100%',
            background: '#F7F8FA',
            borderRadius: '4px',
          }}
        >
          <Grid container spacing={1}>
            <Grid item>
              <Image width={80} alt='complex' src={sunglasses} />
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction='column' spacing={2}>
                <Grid item>
                  <Typography
                    gutterBottom
                    variant='body2'
                    sx={{ fontWeight: 600, pt: 2 }}
                    component='div'
                  >
                    小 Tips
                  </Typography>
                </Grid>
                <Grid item xs sx={{ pt: '4px!important' }}>
                  <Stack>
                    <Typography
                      sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                      variant='caption'
                    >
                      轻松两步骤搞定 Nginx Basic Authentication 配置！
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid item>
            <Typography
              gutterBottom
              variant='body2'
              sx={{ fontWeight: 600, pt: 2 }}
              component='div'
            >
              1. 创建文件 /etc/nginx/.htpasswd 并将上述密文写入
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              gutterBottom
              variant='body2'
              sx={{ fontWeight: 600, pt: 2 }}
              component='div'
            >
              2. 在对应的 location 修改配置如下，并 nginx -s reload
            </Typography>
          </Grid>
        </Box>

        <Box
          sx={{
            position: 'relative',
            '& pre': { minHeight: '120px' },
            '& *': { fontFamily: 'Mono' },
          }}
        >
          <SyntaxHighlighter language={'nginx'} style={tomorrow}>
            {nginx_basci_conf}
          </SyntaxHighlighter>
          <CopyToClipboard
            text={nginx_basci_conf}
            onCopy={(e) => {
              alert.success('复制成功');
            }}
          >
            <ContentCopyIcon
              sx={{
                zIndex: 1,
                position: 'absolute',
                right: '6px',
                top: '16px',
                cursor: 'pointer',
                '& svg': {
                  width: '20px',
                  height: '20px',
                },
              }}
              fontSize='small'
              color='primary'
            />
          </CopyToClipboard>
        </Box>
      </>
    </MainContent>
  );
};

export default Htpasswd;
