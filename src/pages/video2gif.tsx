import MainContent from '@/components/MainContent';
import dynamic from 'next/dynamic';

const _C = () => {
  const Video2Gif = dynamic(() => import('@/components/Dynamic/Video2Gif'), {
    ssr: false,
  });
  return (
    <MainContent>
      <Video2Gif />
    </MainContent>
  );
};

export default _C;
