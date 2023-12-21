import React, { useCallback } from 'react';
import { styled } from '@mui/material/styles';
import { useNavigateParams } from '@/hooks';
import { Logo as CompanyLogo } from '@/icon';
import Text from '@/components/Text';
import { useMobileView } from '@/hooks';
import { primary, defaultText } from '@/styles/colors';

const LogoComponent = styled('a')(({ theme }) => ({
  display: 'flex',
  userSelect: 'none',
  margin: '8px',
  marginRight: '60px',
  fontSize: '20px',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    margin: '24px 8px',
    marginRight: '0px',
  },
}));

const Logo: React.FC<unknown> = () => {
  const navigate = useNavigateParams();
  const isMobile = useMobileView();

  const toHome = useCallback(() => navigate('/'), [navigate]);

  return (
    <LogoComponent onClick={toHome}>
      <CompanyLogo sx={{ fontSize: 28, margin: '0px 12px' }} />
      <Text
        weight='bold'
        sx={{
          fontSize: '20px',
          lineHeight: '28px',
          color: isMobile ? primary : defaultText,
        }}
      >
        长亭百川云平台
      </Text>
    </LogoComponent>
  );
};

export default Logo;
