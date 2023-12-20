import "@/styles/global.css";
import "@/styles/static/slick.css";
import "@/styles/static/effect-creative.min.css";
import "@/styles/static/navigation.min.css";
import "@/styles/static/swiper-customize.css";
import "@/styles/static/swiper.css";
import theme from "@/styles/theme";
import createEmotionCache from "@/utils/emotionCache";
import { EmotionCache } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import PropTypes from "prop-types";

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

export default function App({
  emotionCache = clientSideEmotionCache,
}: AppProps & { emotionCache: EmotionCache }) {
  return (
    <>
    </>
  );
}

App.propTypes = {
  emotionCache: PropTypes.object,
};
