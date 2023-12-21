import React, { useCallback } from 'react';
import emblem from '@/asset/img/emblem.webp';
import { ImageIcon } from '@/icon';
import { Stack, SxProps } from '@mui/material';
import Text from '@/components/Text';
import { useMobileView } from '@/hooks';
import { Side_Margin } from '@/styles/colors';

const Copyright: React.FC<{ sx?: SxProps; fontColor?: string }> = ({
  sx,
  fontColor,
}) => {
  const isMobile = useMobileView();

  const openBeianLink = useCallback(() => {
    window.open('https://beian.miit.gov.cn/#/Integrated/recordQuery', '_blank');
  }, []);

  return (
    <Stack sx={{ position: 'fixed', bottom: 0, lefet: Side_Margin, ...sx }}>
      <Text
        size='xs'
        weight='thin'
        sx={
          isMobile
            ? { fontSize: '12px', color: fontColor }
            : { color: fontColor }
        }
      >
        Copyright ©2022 北京长亭未来科技有限公司
      </Text>
      <Text
        size='xs'
        weight='thin'
        sx={{
          color: fontColor,
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          ...(isMobile ? { fontSize: '12px' } : null),
          gap: '4px',
          '& > a': { color: 'inherit' },
        }}
        onClick={openBeianLink}
      >
        <ImageIcon src={emblem} />
        京ICP备 19035216号-1
      </Text>
    </Stack>
  );
};

export default Copyright;
