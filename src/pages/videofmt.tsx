import MainContent from '@/components/MainContent';
import dynamic from 'next/dynamic';

const VideoFMT = () => {
  const VideoFmt = dynamic(() => import('@/components/Dynamic/VideoFmt'), {
    ssr: false,
  });
  return (
    <MainContent>
      <VideoFmt />
    </MainContent>
  );
};

export default VideoFMT;
