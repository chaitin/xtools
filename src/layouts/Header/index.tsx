import { ToolCard } from '@/components/ToolCard';
import { usePath } from '@/hooks';
import { Tags } from '@/utils/tags';
import { Tool, allTools } from '@/utils/tools';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

const ifChecked = (currentPath: string, itemPath: string) => {
  return currentPath === itemPath;
};

const Header: React.FC<{}> = () => {
  const { path } = usePath();
  const [tags, setTags] = React.useState<Tags[]>([]);
  const [tools, setTools] = React.useState<Tool[]>(allTools);
  const [openSearch, setOpenSearch] = React.useState<boolean>(false);
  const [searchText, setSearchText] = React.useState<string>('');

  const [openStaus, setOpenStatus] = React.useState(
    allTools.map((item) => true)
  );
  const router = useRouter();

  const currentItem = useMemo(() => {
    const _item = allTools.find((item) => item.path === path);
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
      toolsFilter = allTools.filter((item) =>
        item.tags.some((tag) => tags.includes(tag))
      );
    else toolsFilter = allTools;
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
    <Stack
      direction='row'
      alignItems='center'
      sx={{ width: '100%', height: '84px', flexShrink: 0 }}
    >
      <Typography
        variant='subtitle1'
        fontWeight={600}
        sx={{ mr: 2, color: 'rgba(11, 37, 98, 1)' }}
      >
        <Link className='custom-link' href='/home'>
          百川在线工具箱
        </Link>
      </Typography>
      <Link className='custom-link' href='https://github.com/chaitin/xtools'>
        <GitHubIcon
          fontSize='small'
          sx={{
            mt: '4px',
            color: 'rgba(0, 0, 0, 0.57)',
            '&:hover': {
              color: 'rgba(0, 0, 0, 0.87)',
            },
          }}
        />
      </Link>
      <Typography
        variant='body2'
        sx={{
          ml: 'auto',
          color: 'rgba(255,110,103, 0.5)!important',
          '&:hover': {
            color: '#FF6E67!important',
          },
        }}
      >
        <Link
          href='https://github.com/chaitin/xtools/issues'
          className='custom-link'
          target='_blank'
        >
          工具不够？提个需求
        </Link>
      </Typography>
      <Paper
        sx={{
          width: '381px',
          borderRadius: '4px',
          height: '36px',
          ml: 4,
          '& .MuiInput-underline': { height: '36px', borderBottom: 'none' },
          '& .MuiAutocomplete-inputRoot:before': {
            borderBottom: 'none!important',
          },
          boxShadow:
            '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
        }}
      >
        <Autocomplete
          disablePortal
          blurOnSelect
          id='combo-box-demo'
          open={openSearch}
          onClose={() => setOpenSearch(false)}
          onOpen={() => setOpenSearch(true)}
          filterOptions={(menu, state) =>
            menu.filter((item) => {
              return (
                item.label
                  .toUpperCase()
                  .includes(state.inputValue?.toUpperCase()) ||
                item.subTitle
                  .toUpperCase()
                  .includes(state.inputValue?.toUpperCase())
              );
            })
          }
          options={allTools}
          renderOption={(props: object, option: Tool) => (
            <Box
              sx={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                '&:hover': {
                  background: 'rgba(17, 35, 90, 0.05)',
                },
              }}
            >
              <Link
                href={option.path}
                className='custom-link'
                onClick={() => setOpenSearch(false)}
              >
                <ToolCard tool={option} showStar={false} />
              </Link>
            </Box>
          )}
          sx={{ height: '100%' }}
          renderInput={(params) => (
            <Stack direction='row'>
              <SearchIcon sx={{ mt: 1, mx: 1 }} />
              <TextField
                // autoFocus
                {...params}
                placeholder='搜索'
                sx={{ height: '100%' }}
              />
            </Stack>
          )}
        />
      </Paper>
    </Stack>
  );
};

export default Header;
