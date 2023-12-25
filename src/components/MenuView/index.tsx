import { grayText } from '@/constant';
import { usePath } from '@/hooks';
import { allTags } from '@/utils/tags';
import { Tool, allTools } from '@/utils/tools';
import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';

export interface MenuProps {
  children: React.ReactElement;
}

const ifChecked = (currentPath: string, itemPath: string) => {
  return currentPath === itemPath;
};

const MenuView: React.FC<MenuProps> = ({ children }) => {
  const { path } = usePath();

  const [tool] = React.useState<Tool | undefined>(
    allTools.find((item) => item.path === path)
  );

  return (
    <Paper
      sx={{
        px: '50px',
        py: 2,
        overflow: 'auto',
        flex: 1,
        borderRadius: '8px',
        boxShadow:
          '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Box>
          <Typography
            sx={{
              mb: '0px',
              fontWeight: 600,
              color: grayText,
              fontSize: '20px',
            }}
            gutterBottom
            variant='subtitle1'
            component='div'
          >
            {tool?.label}
          </Typography>
        </Box>
        <Stack direction='row' sx={{ fontFamily: 'Mono' }}>
          {allTags
            .filter((tag) => tool?.tags.includes(tag.name))
            .map((tag) => (
              <Box
                key={tag.name}
                sx={{
                  height: '24px',
                  lineHeight: '24px',
                  fontSize: '12px',
                  background: 'rgba(52,90,255,0.1)',
                  color: '#345AFF',
                  px: 1,
                  borderRadius: 1,
                  ml: 1,
                }}
              >
                {tag.label}
              </Box>
            ))}
        </Stack>
      </Stack>
      <Typography
        variant='caption'
        sx={{
          display: 'inline-block',
          maxWidth: '100%',
          pl: '6px',
          color: 'rgba(11,37,98,0.5)',
          background: 'rgba(11,37,98,0.04)',
          borderRadius: 1,
          lineHeight: '24px',
        }}
      >
        {tool?.subTitle}
      </Typography>
      {children}
    </Paper>
  );
};

export default MenuView;
