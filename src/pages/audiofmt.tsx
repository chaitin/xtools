import MainContent from '@/components/MainContent';
import dynamic from 'next/dynamic';

const AudioFMT = () => {
  const AudioFmt = dynamic(() => import('@/components/Dynamic/AudioFmt'), {
    ssr: false,
  });
  return (
    <MainContent>
      <AudioFmt />
    </MainContent>
  );
};

export default AudioFMT;
