import React, { useCallback, useState } from 'react';
import MainContent from '@/components/MainContent';
import {
  Box,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import TextField from '@mui/material/TextField';

function wordToLeetEasy(word: string): string {
  const leetMap: { [key: string]: string } = {
    a: '4',
    b: '8',
    e: '3',
    g: '6',
    i: '1',
    o: '0',
    s: '5',
    t: '7',
    l: '1',
  };

  return word
    .split('')
    .map((c) => {
      return leetMap[c.toLowerCase()] || c;
    })
    .join('');
}

function wordToLeet(word: string): string {
  // Reference: https://en.wikipedia.org/wiki/Leet
  const leetMap: { [key: string]: string[] } = {
    a: ['4', '/\\', '@', '/-\\', '^', '(L', 'Д'],
    b: ['I3', '8', '13', '|3', 'ß', '!3', '(3', '/3', ')3', '|-]', 'j3'],
    c: ['[', '¢', '<', '(', '©'],
    d: [')', '|)', '(|', '[)', 'I>', '|>', '?', 'T)', 'I7', 'cl', '|}', '|]'],
    e: ['3', '&', '£', '€', '[-', '|=-'],
    f: ['|=', 'ƒ', '|#', 'ph', '/=', 'v'],
    g: ['6', '&', '(_+', '9', 'C-', 'gee', '(?,', '[,', '{,', '<-', '(.'],
    h: [
      '#',
      '/-/',
      '\\-\\',
      '[-]',
      ']-[',
      ')-(',
      '(-)',
      ':-:',
      '|~|',
      '|-|',
      ']~[',
      '}{',
      '!-!',
      '1-1',
      '\\-/',
      'I+I',
      '?',
    ],
    i: ['1', '|', '][', '!', 'eye', '3y3'],
    j: [',_|', '_|', '._|', '._]', '_]', ',_]', ']'],
    k: ['>|', '|<', '1<', '|c', '|(', '7<'],
    l: ['1', '7', '2', '£', '|_', '|'],
    m: [
      '/\\/',
      '/V\\',
      '[V]',
      '|\\/|',
      '^^',
      '<\\/>',
      '{V}',
      '(v)',
      '(V)',
      '|\\|\\',
      ']\\/[',
      'nn',
      '11',
    ],
    n: ['^/', '|\\|', '/\\/', '[\\]', '<\\>', '{\\}', '/V', '^', 'ท', 'И'],
    o: ['0', '()', 'oh', '[]', 'p', '<>', 'Ø'],
    p: ['|*', '|o', '|º', '?', '|^', '|>', '|"', '9', '[]D', '|°', '|7'],
    q: ['(_)', '()_', '2', '0_', '<|', '&', '9', '¶', '⁋', '℗'],
    r: [
      'I2',
      '9',
      '|`',
      '|~',
      '|?',
      '/2',
      '|^',
      'lz',
      '7',
      '2',
      '12',
      '®',
      '[z',
      'Я',
      '.-',
      '|2',
      '|-',
    ],
    s: ['5', '$', 'z', '§', 'ehs', 'es', '2'],
    t: ['7', '+', '-|-', "']['", '†', '«|»', '~|~'],
    u: ['(_)', '|_|', 'v', 'L|', 'บ'],
    v: ['\\/', '|/', '\\|'],
    w: [
      '\\/\\/',
      'vv',
      '\\N',
      '//',
      '\\\\',
      '\\^/',
      '\\/\\/',
      '(n)',
      '\\V/',
      '\\X/',
      '\\|/',
      '\\_|_/',
      '\\_:_/',
      'uu',
      '2u',
      '\\//\\//',
      'พ',
      '₩',
    ],
    x: ['><', '}{', 'ecks', '×', '?', '}{', ')(', ']['],
    y: ['j', '`/', '\\|/', '¥', '\\//'],
    z: ['2', '7_', '-/_', '%', '>_', 's', '~/_', '-_\\', '/-|_'],
  };

  return word
    .split('')
    .map((char) => {
      const leetChars = leetMap[char.toLowerCase()];
      return leetChars
        ? leetChars[Math.floor(Math.random() * leetChars.length)]
        : char;
    })
    .join('');
}

const LeetConvert: React.FC = () => {
  let [output, setOutput] = useState<string>('');
  let [value, setValue] = useState<string>('');
  const [mode, setMode] = React.useState('EASY');

  const onModeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value);

      if (event.target.value === 'EASY') {
        setOutput(wordToLeetEasy(value));
      } else {
        setOutput(wordToLeet(value));
      }
    },
    [value]
  );

  const onValueChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);

      if (mode === 'EASY') {
        setOutput(wordToLeetEasy(event.target.value));
      } else {
        setOutput(wordToLeet(event.target.value));
      }
    },
    [mode]
  );

  return (
    <MainContent>
      <>
        <Stack direction='row'>
          <FormLabel
            sx={{
              lineHeight: '42px',
              width: '100px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            模式
          </FormLabel>
          <RadioGroup row value={mode} onChange={onModeChange}>
            <FormControlLabel value='EASY' control={<Radio />} label='简单' />
            <FormControlLabel
              value='COMPLEX'
              control={<Radio />}
              label='复杂'
            />
          </RadioGroup>
        </Stack>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='subtitle2'>输入</Typography>
          <Stack sx={{ mt: 2 }}>
            <TextField
              value={value}
              variant='outlined'
              multiline
              rows={4}
              onChange={onValueChange}
              sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='subtitle2'>Leet</Typography>
          <Stack sx={{ mt: 2 }}>
            <TextField
              value={output}
              variant='outlined'
              multiline
              rows={4}
              InputProps={{
                readOnly: true,
              }}
              sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
      </>
    </MainContent>
  );
};

export default LeetConvert;
