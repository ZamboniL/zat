import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zat!</title>
        <meta
          name="description"
          content="Zat é um webapp de chat e conversa em grupos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:url" content="http://www.yourdomain.com" />
        <meta property="og:title" content="Converse com o mundo usando Zat!" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="Com Zat você pode bater papo com todos seus amigos :)"
        />
        <meta
          property="og:image"
          content="http://www.yourdomain.com/images/og:image.png"
        />
        <meta name="twitter:url" content="http://www.yourdomain.com" />
        <meta name="twitter:title" content="Converse com o mundo usando Zat!" />
        <meta
          name="twitter:description"
          content="Com Zat você pode bater papo com todos seus amigos :)"
        />
        <meta
          name="twitter:image"
          content="http://www.yourdomain.com/images/og:image.png"
        />
      </Head>
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
