import {useEffect} from 'react';
import Head from 'next/head';
import {connect} from 'react-redux';
import {ChakraProvider} from '@chakra-ui/react';
import {Auth0Provider} from '@auth0/auth0-react';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import Theme from '../theme';
import {wrapper} from '../state';
import {initialize} from '../state/actions/session';
import {MainLayout} from '../layouts';

const MyApp = ({Component, pageProps, onMount}) => {
  const Layout = Component.Layout || MainLayout;
  useEffect(() => {
    onMount();
  }, [onMount]);
  return (
    <Auth0Provider
      domain="dev-t8rv4t8rt4dxhpiz.us.auth0.com"
      clientId="KJ7rRDDQdtvDUcejl7WsJbk7iyzUHTUY"
      redirectUri={process.env.ALLOWED_URL}
      scope="openid profile email"
      audience={process.env.API_ENDPOINT}
      useRefreshTokens={false}
      cacheLocation="localstorage">
      <ChakraProvider theme={Theme}>
        <Head>
          <title>Kings Parlay</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <script
            src="https://core.spreedly.com/iframe/iframe-v1.min.js"
            async
          />
        </Head>
        <DndProvider backend={HTML5Backend}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DndProvider>
      </ChakraProvider>
    </Auth0Provider>
  );
};

export default wrapper.withRedux(connect(null, {onMount: initialize})(MyApp));
