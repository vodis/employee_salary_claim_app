import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './components/Loading';
import routes from './routes';
import { RouterProvider } from 'react-router-dom';
import Layout from './layout';
import NotificationsProvider from './providers/Notifications';
import LayOutModule from './modules/LayOut/index.module';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme, ThemeContext } from './theming';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { bsc, polygon } from 'viem/chains';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { selectTheme } from './store/theme/theme-selector';

const chains = [polygon, bsc];
const projectId = process.env.REACT_APP_WALLETCONECT_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [...w3mConnectors({ chains, version: 2, projectId })],
  publicClient
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

function App() {
  const currentThemeText = useSelector(selectTheme);
  const currentTheme = currentThemeText === 'light' ? lightTheme : darkTheme;

  return (
    <React.Suspense fallback={<Loading />}>
      <ThemeProvider theme={currentTheme}>
        <ThemeContext.Provider value={currentTheme}>
          <NotificationsProvider>
            <Layout>
              <WagmiConfig config={wagmiConfig}>
                <LayOutModule>
                  <RouterProvider router={routes} />
                </LayOutModule>
              </WagmiConfig>

              <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                explorerRecommendedWalletIds={[
                  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
                  '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
                  'c286eebc742a537cd1d6818363e9dc53b21759a1e8e5d9b263d0c03ec7703576',
                  '2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01',
                  'c03dfee351b6fcc421b4494ea33b9d4b92a984f87aa76d1663bb28705e95034a',
                  'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'
                ]}
                explorerExcludedWalletIds="ALL"
              />
            </Layout>
          </NotificationsProvider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </React.Suspense>
  );
}

export default App;
