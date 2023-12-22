import MenuView from '@/components/MenuView';
import { count } from '@homegrown/word-counter';
import { Box, Divider, Stack, Typography, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';

interface IWordStatisticiansResult {
  lines: number;
  characters: number;
  charactersWithSpaces: number;
  chinese: number;
  alphabet: number;
  chinesePunctuate: number;
  englishPunctuate: number;
  digit: number;
}

const MyStack = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const MyTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '20px',
}));

function countWords(text: string): IWordStatisticiansResult {
  let result = count(text);
  let chineseTotal = 0;
  let otherTotal = 0;
  let alphabetTotal = 0;
  let englishPunctuate = 0;
  let digit = 0;
  for (let c of text) {
    if (c.match(/[\u4e00-\u9fa5]/) || c.match(/[\u9FA6-\u9fcb]/)) {
      chineseTotal++;
    }

    if (c.match(/[\x00-\xff]/)) {
      if (c.match(/[a-zA-Z]/)) {
        alphabetTotal++;
      }

      if (c.match(/[^\w\s]/)) {
        englishPunctuate++;
      }
    } else {
      otherTotal++;
    }

    if (c.match(/[0-9]/)) {
      digit++;
    }
  }

  let chinesePunctuate = otherTotal - chineseTotal;
  return {
    lines: result.lines,
    characters: result.characters,
    charactersWithSpaces: result.charactersWithSpaces,
    chinese: chineseTotal,
    chinesePunctuate: chinesePunctuate,
    englishPunctuate: englishPunctuate,
    alphabet: alphabetTotal,
    digit: digit,
  };
}

const WordCount: React.FC = () => {
  let [value, setValue] = useState<string>();
  let [statisticians, setStatisticians] = useState<IWordStatisticiansResult>({
    lines: 0,
    characters: 0,
    charactersWithSpaces: 0,
    chinese: 0,
    alphabet: 0,
    chinesePunctuate: 0,
    englishPunctuate: 0,
    digit: 0,
  });

  return (
    <MenuView>
      <Stack
        direction='column'
        divider={<Divider orientation='vertical' flexItem />}
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          
          mx: 'auto',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box
            sx={{
              borderRadius: '10px',
              border: '1px solid #e0e0e0',
              backgroundImage: 'none',
            }}
          >
            <Stack
              direction='row'
              spacing={{ xs: 1, sm: 2 }}
              useFlexGap
              flexWrap='wrap'
              sx={{
                padding: '10px',
                gap: '18px',
                maxWidth: '1020px',
                fontFamily: 'Mono',
                mx: 'auto',
              }}
            >
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  字符数
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.charactersWithSpaces}
                </MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  行数
                </Typography>
                <MyTypography variant='h5'>{statisticians?.lines}</MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  数字
                </Typography>
                <MyTypography variant='h5'>{statisticians?.digit}</MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  汉字
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.chinese}
                </MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  中文标点
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.chinesePunctuate}
                </MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  字母
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.alphabet}
                </MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  英文标点
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.englishPunctuate}
                </MyTypography>
              </MyStack>
              <MyStack direction='column'>
                <Typography
                  sx={{ fontSize: 14 }}
                  color='text.secondary'
                  gutterBottom
                >
                  空格
                </Typography>
                <MyTypography variant='h5'>
                  {statisticians?.charactersWithSpaces -
                    statisticians?.characters}
                </MyTypography>
              </MyStack>
            </Stack>
          </Box>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          输入
          <Stack spacing={1} sx={{}}>
            <TextField
              value={value}
              variant='outlined'
              multiline
              rows={10}
              onChange={(event) => {
                setValue(event.target.value);
                setStatisticians(countWords(event.target.value));
              }}
              sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </Stack>
        </Box>
      </Stack>
    </MenuView>
  );
};

export default WordCount;
