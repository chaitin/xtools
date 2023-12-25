import { Tag } from '@/utils/tags';
import { Tool } from '@/utils/tools';
import { Avatar, CardHeader, Typography } from '@mui/material';
import LikeIcon from '../LikeIcon';
import { grayText2 } from '@/constant';

export const ToolCard = (props: {
  tool: Tool;
  tag?: Tag;
  showStar?: boolean;
}) => {
  const { tool, tag, showStar = true } = props;
  return (
    <>
      <CardHeader
        sx={{
          pb: '6px',
          ...(!showStar ? { pl: '0', pb: '2px', pt: '6px' } : {}),
        }}
        avatar={
          <Avatar
            sx={{
              display: showStar ? 'block' : 'none',
              bgcolor: tag?.avatar_color || 'rgba(245, 117, 130, 1)',
              width: '20px',
              height: '20px',
              fontSize: '12px',
              fontFamily: 'Mono',
              textAlign: 'center',
              lineHeight: '20px',
              background: tag?.avatar_color || 'rgba(245, 117, 130, 1)',
            }}
            aria-label='recipe'
          >
            {tool.label[0]}
          </Avatar>
        }
        action={
          <LikeIcon
            path={tool.path}
            style={{
              visibility: showStar ? 'visible' : 'hidden',
              left: '-12px',
              position: 'relative',
            }}
          />
        }
        title={tool.label}
      />
      <Typography
        component='div'
        variant='caption'
        sx={{
          pl: 2,
          color: grayText2,
          height: '24px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {tool.subTitle}
      </Typography>
    </>
  );
};
