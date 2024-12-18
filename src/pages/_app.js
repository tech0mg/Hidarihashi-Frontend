import '../../styles/globals.css';
import Head from 'next/head'; // Headコンポーネントをインポート

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* ファビコンを設定 */}
      <Head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
