import React from 'react';
import { GetServerSidePropsContext } from 'next';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentProps,
  DocumentContext,
} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createEmotionCache from '@/utils/emotionCache';
import Script from 'next/script';

interface MyDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function MyDocument({ emotionStyleTags }: MyDocumentProps) {
  return (
    <Html lang='zh-cmn-Hans'>
      <Head>
        <script type='text/javascript' src='/tools/cnzz.js' async />
        {emotionStyleTags}
      </Head>
      <body style={{ margin: 0 }}>
        <div id={'rivers-header'}></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (
  context: GetServerSidePropsContext & DocumentContext
) => {
  const originalRenderPage = context.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props: JSX.IntrinsicAttributes) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = (await Document.getInitialProps(context)) as {
    html: string;
  };

  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style, index) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key + index}
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));
  return {
    ...initialProps,
    emotionStyleTags, // will be passed to the page component as props
  };
};
