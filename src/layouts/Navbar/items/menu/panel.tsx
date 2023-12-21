import search_icon from '@/asset/img/search_icon.webp';
import { useDebounce } from '@/hooks';
import { Side_Margin, grayLight } from '@/styles/colors';
import { ApplicationInfo } from '@/types';
import { Drawer, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import MenuItem from './item';

export interface NavPanelProps {
  open: boolean;
  onClose?: () => void;
  apps: ApplicationInfo[];
}

const PanelContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: `${parseInt(Side_Margin) / 1.5}% ${Side_Margin}`,
  paddingTop: `calc(${parseInt(Side_Margin) / 4}%  + 64px)`,
  justifyContent: 'flex-start',
  gap: 20,
}));

const Content = styled('div')(() => ({
  display: 'flex',
  gap: 40,
  flexWrap: 'wrap',
  alignItems: 'stretch',
}));

export const Icon = ({
  style,
  src,
}: {
  style?: React.CSSProperties;
  src: string | StaticImageData;
}) => {
  return (
    <Image
      alt='search'
      src={src}
      style={{
        objectFit: 'contain',
        ...style,
      }}
      loading='lazy'
    />
  );
};

const ContentCard = styled('div')(() => ({
  flex: '0 0 220px',
  padding: '12px 24px',
  transition: 'background-color 0.2s linear',
  '&:hover': {
    backgroundColor: grayLight,
    transition: 'background-color 0.2s linear',
  },
}));

const NavPanel: React.FC<NavPanelProps> = (props) => {
  const { open, onClose, apps } = props;
  const [menuContent, setMenuContent] = useState<ApplicationInfo[]>(apps ?? []);
  const [input, setInput] = useState<string>('');
  const router = useRouter();
  const debounceInput = useDebounce(input, 500);

  const handleSearch = useCallback(
    (search: string) => {
      if (apps && search.length > 0) {
        const data = JSON.parse(JSON.stringify(apps)) as ApplicationInfo[];
        const searchResult = data?.filter((item) => item.name.includes(search));
        setMenuContent([...searchResult]);
      } else {
        setMenuContent(apps);
      }
    },
    [apps]
  );

  const handleSetInput = useCallback((event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const input = target?.value?.trim();
    setInput(input ?? '');
  }, []);

  const toWorkbench = useCallback(
    (app: ApplicationInfo) => () => {
      if (app?.scope) {
        router.push(`/landing/${app?.scope}`);
      } else {
        router.push('/workbench');
      }
      onClose?.();
    },
    [router, onClose]
  );

  useEffect(() => {
    handleSearch(debounceInput);
  }, [debounceInput, handleSearch]);

  return (
    <Drawer
      keepMounted
      PaperProps={{ sx: { boxShadow: 'none' } }}
      componentsProps={{
        backdrop: { style: { backgroundColor: 'rgba(0,0,0,0.2)' } },
      }}
      anchor='top'
      open={open}
      onMouseLeave={onClose}
      onClose={onClose}
      sx={{ zIndex: 1202 }}
    >
      <PanelContent onMouseLeave={onClose}>
        <TextField
          placeholder='搜索产品名称'
          fullWidth={true}
          onChange={handleSetInput}
          InputProps={{
            startAdornment: (
              <Icon
                src={search_icon}
                style={{ width: '14px', margin: '0 12px' }}
              />
            ),
          }}
        />
        <Content>
          {menuContent?.map((item, index) => (
            <ContentCard key={`nav-content-item-${index}`}>
              <MenuItem
                highlight={true}
                title={item?.name}
                subTitle={item?.slogan}
                sx={{ fontSize: 16 }}
                onClick={toWorkbench(item)}
              />
            </ContentCard>
          ))}
        </Content>
      </PanelContent>
    </Drawer>
  );
};

export default NavPanel;
