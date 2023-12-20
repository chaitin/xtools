import "@/styles/global.css";
import "@/styles/static/slick.css";
import "@/styles/static/effect-creative.min.css";
import "@/styles/static/navigation.min.css";
import "@/styles/static/swiper-customize.css";
import "@/styles/static/swiper.css";
import theme from "@/styles/theme";
import createEmotionCache from "@/utils/emotionCache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PropTypes from "prop-types";

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
}: any) {
  return (
    <>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <Component />
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
};
