import Document, { Head, Html, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css"/>
          <script src="https://www.amcharts.com/lib/4/core.js"></script>
          <script src="https://www.amcharts.com/lib/4/maps.js"></script>
          <script src="https://www.amcharts.com/lib/4/geodata/worldLow.js"></script>
          <script src="https://www.amcharts.com/lib/4/themes/animated.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}