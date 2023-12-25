import RedTag from '@/asset/tag/red_like.svg';
import RedTagCheck from '@/asset/tag/red_like_check.png';
import HoverRedTagCheck from '@/asset/tag/hover_red_like.svg';
import { LikeContext } from '@/hooks/useLikeList';
import React, { useContext, useMemo } from 'react';
import { Box } from '@mui/material';

const LikeIcon: React.FC<{ path: string; style: React.CSSProperties }> = (
  props
) => {
  const { path, style = {} } = props;
  const { likeList, updateLikeList } = useContext(LikeContext);

  const hanldeLike = (
    event: React.MouseEvent<HTMLDivElement>,
    path: string
  ) => {
    event.preventDefault();
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        let newLike = [];
        if (likeList?.includes(path)) {
          newLike = likeList.filter((item) => item !== path);
        } else {
          newLike = [...(likeList || []), path];
        }
        updateLikeList(newLike);
      } finally {
        console.log('Get like list error');
      }
    }
  };
  const isCheck = useMemo(() => {
    return likeList?.includes(path);
  }, [likeList, path]);

  return (
    <Box
      sx={{
        width: '14px',
        height: '14px',
        cursor: 'pointer',
        ...style,
        // background: `url(${isCheck ? RedTagCheck : RedTag})`
        backgroundImage: `url(${isCheck ? RedTagCheck.src : RedTag.src})`,
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        '&:hover': {
          backgroundImage: `url(${
            isCheck ? RedTagCheck.src : HoverRedTagCheck.src
          })`,
          opacity: isCheck ? '0.5' : '1',
        },
      }}
      onClick={(event) => hanldeLike(event, path)}
    />
  );
};

export default LikeIcon;
