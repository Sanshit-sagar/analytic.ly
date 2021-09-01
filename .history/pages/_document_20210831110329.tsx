import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { getCssString } from '../stitches.config';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head>
            <link 
                href='https://fonts.googleapis.com/css2?family=Inter'
                rel='stylesheet'
            />
            <style 
                id='stitches'
                dangerouslySetInnerHTML={{ __html: getCssString() }} 
            />
            <meta 
                name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}