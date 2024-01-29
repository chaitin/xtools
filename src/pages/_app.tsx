import '@/styles/global.css';
import '@/styles/static/slick.css';
import '@/styles/static/effect-creative.min.css';
import '@/styles/static/navigation.min.css';
import '@/styles/static/swiper-customize.css';
import '@/styles/static/swiper.css';
import theme from '@/styles/theme';
import createEmotionCache from '@/utils/emotionCache';
import { CacheProvider } from '@emotion/react';
import { Stack, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import PropTypes from 'prop-types';
import Header from '@/layouts/Header';
import SideBar from '@/layouts/SideBar';
import { LikeContextProvider } from '@/hooks/useLikeList';
import { AnchorContextProvider } from '@/hooks/useAnchor';
import { usePath } from '@/hooks';
import { useMemo } from 'react';
import { allTools } from '@/utils/tools';
import Head from 'next/head';
import { Header as RiverHeader } from '@chaitin_rivers/multi_river';
import '@chaitin_rivers/excalidraw/index.css';

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
}: any) {
  const { path } = usePath();
  const isProduction = process.env.NODE_ENV === 'production';
  const currentItem = useMemo(() => {
    return allTools.find((item) => item.path === path);
  }, [path]);
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no'
        />
        <title>
          {currentItem?.label
            ? currentItem?.label + ' - 百川在线工具箱'
            : '百川云常用工具'}
        </title>
        <meta
          name='description'
          property='og:description'
          content={currentItem?.subTitle || '百川云常用工具'}
        />
        <meta name='keywords' content='常用的工具'></meta>
      </Head>

      <ThemeProvider theme={theme}>
        <CacheProvider value={emotionCache}>
          <CssBaseline />
          <AnchorContextProvider>
            <LikeContextProvider>
              <QueryClientProvider client={queryClient}>
                {isProduction ? <RiverHeader noSsr={false} /> : null}
                <Stack sx={{ width: '1180px', mx: 'auto', height: '100%' }}>
                  <Header />
                  <Stack
                    direction='row'
                    spacing={2}
                    sx={{ pb: 1, flex: 1, overflow: 'auto' }}
                  >
                    <SideBar />
                    <Component />
                  </Stack>
                </Stack>
              </QueryClientProvider>
            </LikeContextProvider>
          </AnchorContextProvider>
        </CacheProvider>
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
};
