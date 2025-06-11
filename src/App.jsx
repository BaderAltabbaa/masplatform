/**
 * @file app.jsx
 * @description Main application component that sets up all providers and routes
 * @module App
 * 
 * Handles:
 * - Application routing with nested routes
 * - Context providers (Theme, User, Wallet, Cookies)
 * - Authentication guards
 * - Layout composition
 * - Internationalization
 */

import React, { Suspense, Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

// Application routes configuration
import { routes } from './routes';

// Context Providers
import { UserContextProvider } from 'src/context/User';
import { WalletProvider } from 'src/views/pages/Profile/WalletContext';

// Components
import PageLoading from 'src/component/PageLoading';
import AuthGuard from 'src/component/AuthGuard';
import NavigationScroll from './views/pages/Dashboard/layout/NavigationScroll';
import ScrollToTop from './component/ScrollToTop';

// Theme configuration
import themes from './theme';

/**
 * Renders application routes with appropriate guards and layouts
 * @constant {Array<JSX.Element>}
 * 
 * For each route:
 * - Applies AuthGuard if specified
 * - Wraps with Suspense for lazy loading
 * - Uses specified layout or Fragment as fallback
 * - Handles nested routes recursively
 */
const RenderRoutes = routes.map((route, i) => {
  const Component = route.element;
  const Guard = route.guard ? AuthGuard : Fragment;
  const Layout = route.layout || Fragment;

  if (route.children) {
    return (
      <Route
        key={`parent-${i}`}
        path={route.path}
        element={
          <Guard>
            <Suspense fallback={<PageLoading />}>
              <Layout>
                <Component />
              </Layout>
            </Suspense>
          </Guard>
        }
      >
        {route.children.map((child, j) => (
          <Route
            key={`child-${i}-${j}`}
            path={child.path}
            index={child.index}
            element={
              <Suspense fallback={<PageLoading />}>
                <child.element />
              </Suspense>
            }
          />
        ))}
      </Route>
    );
  }

  return (
    <Route
      key={`route-${i}`}
      path={route.path}
      element={
        <Guard>
          <Suspense fallback={<PageLoading />}>
            <Layout>
              <Component />
            </Layout>
          </Suspense>
        </Guard>
      }
    />
  );
});

/**
 * Main Application Component
 * 
 * Wraps the application with all necessary providers:
 * 1. CookiesProvider - For cookie management
 * 2. WalletProvider - For wallet/Web3 context
 * 3. UserContextProvider - For user authentication state
 * 4. ThemeProvider - For Material-UI theming
 * 
 * Also includes:
 * - NavigationScroll - Scroll to top on route change
 * - ScrollToTop - Component for manual scroll control
 * - Route configuration from RenderRoutes
 */
function App() {
  const customization = useSelector((state) => state.customization);
  const { i18n } = useTranslation();

  return (
    <CookiesProvider>
      <WalletProvider>
        <UserContextProvider>
          <ThemeProvider theme={themes(customization)}>
            <NavigationScroll>
              <div className="app-container">
                <ScrollToTop />
                <Routes>
                  {RenderRoutes}
                </Routes>
              </div>
            </NavigationScroll>
          </ThemeProvider>
        </UserContextProvider>
      </WalletProvider>
    </CookiesProvider>
  );
}

export default App;