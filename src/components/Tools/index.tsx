import { defaultTextClick, primary } from '@/constant';
import { Box, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

type sizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type weightType = 'bold' | 'thin' | 'regular';
type langType = 'zh' | 'en' | 'num';

export const SecondUnitBtn = styled(Typography)(() => ({
  cursor: 'pointer',
  minWidth: '30px',
  textAlign: 'right',
  '&:hover': {
    color: primary,
  },
}));
export const ToolsForm = styled(Box)(() => ({
  pt: '10px',
  display: 'flex',
  flexDirection: 'column',
  width: '838px',
  margin: 'auto',
  gap: 16,
  '& .MuiOutlinedInput-root': {
    flexShrink: 0,
    flexGrow: 1,
  },
  '&  .MuiOutlinedInput-input': {
    paddingTop: '4px',
    paddingBottom: '4px',
  },
  '& .MuiInputLabel-root': {
    position: 'relative',
    transform: 'unset',
    width: '155px',
    color: defaultTextClick,
    fontSize: '14px',
    maxWidth: '838px',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#E3E8EF',
  },
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-20px',
  },
  '& .MuiInputAdornment-positionEnd > p': {
    fontSize: '14px!important',
  },
  '& input': {
    fontSize: '14px!important',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: 'unset',
  },
}));

export const UnixStartBtn = styled(Stack)(() => ({
  cursor: 'pointer',
  alignItems: 'center',
  fontSize: '14px',
  borderRadius: '4px',
}));

export const UnixInputWrap = styled(Stack)(() => ({
  '& .MuiOutlinedInput-root': {
    '@media(min-width: 1520px)': {
      width: '360px',
    },
  },
}));
