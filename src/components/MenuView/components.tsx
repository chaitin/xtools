import { defaultText, grayBg, grayBorder, grayText } from '@/constant';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MenuPage = styled(Box)(() => ({
  display: 'flex',
  height: '100% ',
  backgroundColor: grayBg,
  borderTop: `1px solid ${grayBorder}`,
  paddingBottom: '16px',
  paddingRight: '16px',
  '& .Mui-selected': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)!important',
  },
}));

export const Main = styled('div')(() => ({
  flex: 1,
  padding: '24px',
  paddingBottom: '0',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  '& code, & code *': {
    fontFamily: 'Mono',
  },
  '& code .linenumber': {
    backgroundColor: 'rgba(82, 196, 26, 0.08)',
    marginRight: '24px',
    paddingRight: '5px!important',
    minWidth: '2em!important',
  },
  '& pre': {
    borderRadius: '4px',
    minHeight: '150px',
  },
}));

export const SideMenu = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  padding: '16px 16px 0 16px',
  gap: '8px',
  height: '100%',
}));

export const SubMenu = styled('div', {
  shouldForwardProp: (prop) => prop !== 'expand' && prop !== 'height',
})<{ expand: string; height: number | string }>(({ expand, height }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '12px',
  height: 0,
  transition: 'height 0.2s linear',
  overflow: 'hidden',
  ...(expand === 'true' && {
    height: height ?? 'auto',
    transition: 'height 0.2s linear',
  }),
}));

export const Breadcrumbs = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  gap: '4px',
  marginTop: '16px',
}));

export const BreadcrumbsItem = styled(Box)(() => ({
  color: grayText,
  cursor: 'pointer',
  '&:hover': {
    color: defaultText,
  },
  fontSize: '14px',
}));

export const ToolsIcon = styled(Box)(() => ({
  width: '60px',
  height: '60px',
  background: 'linear-gradient(180deg, #230970 0%, #1C0254 100%)',
  borderRadius: '8px',
}));

export const Tag = styled('div', {
  shouldForwardProp: (prop) => prop !== 'highlight',
})<{ highlight: 'true' | 'false' }>(({ highlight }) => ({
  display: 'inline-block',
  width: '24px',
  lineHeight: '14px',
  fontSize: '10px',
  borderRadius: '4px',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#FF665D',
  ...(highlight === 'true' && { color: '#FF665D', backgroundColor: '#fff' }),
}));

export const ScrollY = styled('div')(() => ({
  height: '100%',
  overflow: 'auto',
  ...(navigator?.userAgent?.indexOf('Chrome') != -1 && { overflow: 'overlay' }),
}));

export const SubTitle = styled('div')(() => ({
  height: '20px',
  padding: '12px',
  background: 'rgba(30, 111, 255, 0.1)',
  borderRadius: '4px',
}));

export const Container = styled(Box)(() => ({
  background: '#fff',
  borderRadius: '4px',
  boxShadow: '0px 4px 10px 0px rgba(145,158,171,0.1)',
  overflow: 'auto',
  minHeight: '100%',
  '& > *': {
    '@media(min-width: 1520px)': {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  '& > .MuiGrid-container': {
    '@media(min-width: 1520px)': {
      marginLeft: 'auto!important',
      marginRight: 'auto!important',
      '& > .MuiGrid-item:first-of-type': {
        paddingLeft: '0!important',
      },
    },
  },
}));
