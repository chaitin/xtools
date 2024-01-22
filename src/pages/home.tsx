import { Box, Card, Paper, Stack, Typography } from '@mui/material';
import { useLocalStorageState } from 'ahooks';
import { LikeContext } from '@/hooks/useLikeList';
import { Tag, Tags, allTags } from '@/utils/tags';
import { Tool, allTools } from '@/utils/tools';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';

import NoLike from '@/asset/tag/no_like.png';
import { ToolCard } from '@/components/ToolCard';
import { AnchorContext } from '@/hooks/useAnchor';

interface TagWithTool extends Tag {
  tools: Tool[];
}
export default function App() {
  const [scrollTop, setScrollTop] = useLocalStorageState<number>(
    'home_scrollTop',
    { defaultValue: 0 }
  );
  const { updateAnchor } = useContext(AnchorContext);
  const { likeList } = useContext(LikeContext);
  const [tagAndTools, setTagAndTools] = useState<TagWithTool[] | null>(
    allTags.map((item) => {
      return {
        ...item,
        tools: allTools.filter((tool) => tool.tags.includes(item.name)),
      };
    })
  );
  const mainPageRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!mainPageRef.current?.children) return;
      const scrollPosition = mainPageRef?.current.scrollTop;
      let originTop = 0;
      for (let i = 0; i < mainPageRef?.current?.children?.length; i++) {
        const liElement = mainPageRef?.current?.children[i];
        if (i === 0) originTop = liElement.offsetTop;
        const liTop = liElement.offsetTop - originTop;
        const liBottom = liTop + liElement.offsetHeight;
        setScrollTop(scrollPosition);
        if (scrollPosition >= liTop && scrollPosition < liBottom) {
          const liId = liElement.getAttribute('id');
          updateAnchor(liId);
          break;
        }
      }
    };
    mainPageRef.current?.addEventListener('scroll', handleScroll);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainPageRef.current?.removeEventListener('scroll', handleScroll);
      updateAnchor('');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const addLikeTagForTools = allTools.map((item) => {
      if (likeList?.includes(item.path))
        return { ...item, tags: [...item.tags, Tags.LIKE] };
      return item;
    });
    setTagAndTools(
      allTags.map((tag: Tag) => {
        return {
          ...tag,
          tools: addLikeTagForTools.filter((tool) =>
            tool.tags.includes(tag.name)
          ),
        };
      })
    );
  }, [likeList]);

  useEffect(() => {
    if (!mainPageRef.current) return;
    if (scrollTop) {
      mainPageRef.current?.scrollTo({ top: scrollTop });
    } else if (window.location.hash && mainPageRef?.current.children) {
      let originTop = 0;
      for (let i = 0; i < mainPageRef?.current?.children?.length; i++) {
        const liElement = mainPageRef?.current?.children[i];
        if (i === 0) originTop = liElement.offsetTop;
        if (liElement.id === window.location.hash.slice(1)) {
          mainPageRef.current?.scrollTo({
            top: liElement.offsetTop - originTop,
          });
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainPageRef.current]);

  return (
    <Paper
      id='tag_with_tools'
      ref={mainPageRef}
      sx={{
        p: 3,
        pt: 0,
        width: '100%',
        borderRadius: 2,
        overflow: 'auto',
        boxShadow:
          '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
      }}
      elevation={0}
    >
      {tagAndTools?.map((tag) => (
        <Box id={tag.name} key={tag.name} sx={{ position: 'relative', pt: 3 }}>
          <Typography variant='subtitle2' sx={{ mb: 2 }}>
            {tag.label}
          </Typography>
          <Stack direction='row' flexWrap='wrap' sx={{ mx: -1 }}>
            {tag.tools.length ? (
              tag.tools.map((tool: Tool) => (
                <Card
                  key={tool.path}
                  sx={{
                    background: tag.bg_color,
                    width: '296px',
                    mx: 1,
                    mb: 2,
                    pb: 1,
                    borderRadius: '8px',
                    '&:hover': {
                      background: tag.bg_color.replace('0.2', '0.15'),
                    },
                  }}
                >
                  <Link
                    prefetch={false}
                    scroll={false}
                    href={tool.path}
                    className='custom-link'
                  >
                    <ToolCard tag={tag} tool={tool} />
                  </Link>
                </Card>
              ))
            ) : (
              <Image
                alt='no_like'
                src={NoLike}
                style={{
                  width: '200px',
                  height: '100px',
                  margin: 'auto',
                  opacity: '0.4',
                }}
              />
            )}
          </Stack>
        </Box>
      ))}
    </Paper>
  );
}
