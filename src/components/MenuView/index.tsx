import { defaultTextClick, secondaryClick } from '@/constant';
import { usePath } from '@/hooks';
import { AllTags, Tags, Tool, routesMenu } from '@/utils/tools';
import ErrorIcon from '@mui/icons-material/Error';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputBase,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';
import { Container, Main, MenuPage, SideMenu } from './components';

export interface MenuProps {
  children: React.ReactElement;
}

const ifChecked = (currentPath: string, itemPath: string) => {
  return currentPath === itemPath;
};

const MenuView: React.FC<MenuProps> = ({ children }) => {
  const { path } = usePath();
  const [tags, setTags] = React.useState<Tags[]>([]);
  const [tools, setTools] = React.useState<Tool[]>(routesMenu);
  const [searchText, setSearchText] = React.useState<string>('');

  const [openStaus, setOpenStatus] = React.useState(
    routesMenu.map((item) => true)
  );
  const router = useRouter();

  const currentItem = useMemo(() => {
    const _item = routesMenu.find((item) => item.path === '.' + path);
    if (_item) return _item;
  }, [path]);
  const checkTags = (tag: Tags) => {
    const _index = tags.findIndex((item) => item === tag);
    const _tags = [...tags];
    if (_index >= 0) {
      _tags.splice(_index, 1);
    } else {
      _tags.push(tag);
    }
    setTags(_tags);
  };

  useEffect(() => {
    let toolsFilter: Tool[] = [];
    if (tags.length)
      toolsFilter = routesMenu.filter((item) =>
        item.tags.some((tag) => tags.includes(tag))
      );
    else toolsFilter = routesMenu;
    setTools(
      toolsFilter.filter((item) => {
        return (
          item.label.toUpperCase().includes(searchText?.toUpperCase()) ||
          item.subTitle.toUpperCase().includes(searchText?.toUpperCase())
        );
      })
    );
  }, [tags, searchText]);

  return (
    <>
      <Head>
        <title>{currentItem?.label + ' - 长亭百川云工具库'}</title>
        <meta
          name='description'
          content={currentItem?.label + '-' + currentItem?.subTitle}
        />
      </Head>
      <MenuPage>
        <SideMenu>
          <Box
            sx={{
              width: '220px',
              maxWidth: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Paper
              sx={{ width: '100%', borderRadius: '4px', mb: 1 }}
              elevation={0}
            >
              <IconButton sx={{ padding: '10px' }} aria-label='search'>
                <SearchIcon />
              </IconButton>
              <InputBase
                autoFocus
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                placeholder='输入关键词搜索工具'
                inputProps={{ 'aria-label': 'search icons' }}
                sx={{ grow: 1, fontSize: '12px' }}
              />
            </Paper>
            <Paper
              sx={{
                MozBorderRadiusTopright: '4px',
                MozBorderRadiusTopLeft: '4px',
                width: '100%',
                pt: 1,
              }}
            >
              {AllTags.map((item) => (
                <Button
                  onClick={() => checkTags(item.name)}
                  sx={{
                    mx: 1,
                    mb: 1,
                    borderRadius: '4px',
                    background: tags.includes(item.name)
                      ? secondaryClick
                      : 'unset',
                  }}
                  size='small'
                  key={item.name}
                  variant='outlined'
                  startIcon={<item.icon />}
                >
                  {item.label}
                </Button>
              ))}
            </Paper>
            <Box
              sx={{
                width: '210px',
                mx: 'auto',
                height: '1px',
                background: '0,0,0,0.12',
              }}
            />
            <List
              sx={{
                width: '100%',
                maxWidth: 360,
                height: '100%',
                bgcolor: 'background.paper',
                MozBorderRadiusBottomright: '4px',
                MozBorderRadiusBottomLeft: '4px',
                overflowY: 'scroll',
              }}
              component='nav'
              aria-labelledby='nested-list-subheader'
            >
              {tools.map((item, index) => (
                <a key={index} className='custom-link' href={item.path}>
                  <ListItemButton
                    sx={{ pl: 4 }}
                    selected={ifChecked(currentItem?.path || '', item.path)}
                  >
                    <ListItemText
                      primaryTypographyProps={{
                        fontSize: '12px',
                        fontWeight: ifChecked(
                          currentItem?.path || '',
                          item.path
                        )
                          ? '500'
                          : '400',
                      }}
                      primary={item.label}
                    />
                  </ListItemButton>
                </a>
              ))}
            </List>
          </Box>
        </SideMenu>
        <Main
          sx={{
            pt: 2,
            pl: 0,
            pr: 0,
            pb: 0,
          }}
        >
          <Container sx={{ p: 3 }}>
            <Grid container sx={{ width: '838px', mx: 'auto' }} spacing={2}>
              <Grid item xs sm container sx={{ pl: '0 !important' }}>
                <Grid item xs container direction='column' spacing={1}>
                  <Grid item>
                    <Typography
                      sx={{
                        mb: '0px',
                        fontWeight: 600,
                        color: defaultTextClick,
                      }}
                      gutterBottom
                      variant='h5'
                      component='div'
                    >
                      {currentItem?.label}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs
                    sx={{ pt: '6px!important', alignSelf: 'start' }}
                  >
                    {currentItem?.subTitle ? (
                      <Typography
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 12px',
                          lineHeight: '20px',
                          background: 'rgba(30,111,255,0.1)',
                          color: '#1E6FFF',
                          flexGrow: 0,
                          borderRadius: '4px',
                          minWidth: '300px',
                        }}
                        gutterBottom
                        variant='caption'
                        component='div'
                      >
                        <ErrorIcon
                          sx={{
                            width: '15px',
                            transform: 'rotate(180deg)',
                            mr: '8px',
                            position: 'relative',
                          }}
                        />
                        {currentItem?.subTitle}
                      </Typography>
                    ) : null}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {children}
          </Container>
        </Main>
      </MenuPage>
    </>
  );
};

export default MenuView;
