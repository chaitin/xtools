import MainContent from '@/components/MainContent';
import { Box, Button, MenuItem, OutlinedInput, Stack } from '@mui/material';
import Select from '@mui/material/Select';
import React, { useCallback } from 'react';

import crypt from 'apache-crypt';
import md5 from 'apache-md5';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

import alert from '@/components/Alert';
import FormItem from '@/components/FormItem';
import { ToolsForm } from '@/components/Tools';

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

const Htpasswd: React.FC = () => {
  // values
  const [username, setUsername] = React.useState('');
  const [passwd, setPasswd] = React.useState('');
  const [method, setmethod] = React.useState('');
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
                    {item}
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
    </MainContent>
  );
};

export default Htpasswd;
