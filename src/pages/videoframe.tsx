import MainContent from '@/components/MainContent';
import dynamic from 'next/dynamic';

const VideoFrame = () => {
  const Frame = dynamic(() => import('@/components/Frame'), {
    ssr: false,
  });
  return (
    <MainContent>
      <Frame />
    </MainContent>
  );
};

export default VideoFrame;
