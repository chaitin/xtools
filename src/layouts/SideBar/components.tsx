import { defaultText, grayBg, grayBorder, grayText } from '@/constant';
import { Box, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

export const IssueIconWrap = styled(Stack)(() => ({
  background: 'linear-gradient(180deg, rgba(255, 182, 85, 0.2) 0%, rgba(255, 58, 116, 0.2) 100%)',
  filter: 'blur(1px)',
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  marginLeft: 'auto',
}));
export const IssueIcon = styled(Box)(() => ({
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  background: 'linear-gradient(141deg, #FFB655 0%, #FF3A74 100%)',
}));
