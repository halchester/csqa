import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/csqa.png'></link>
          <link rel='icon' type='image/png' href='/csqa.png' />
          <meta content='Discussion forum for developers or anyone starting with dev journey!' />
          <meta name='theme-color' content='#fff' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
