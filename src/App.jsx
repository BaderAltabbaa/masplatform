import React, { Suspense, Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { routes } from './routes';
import { UserContextProvider } from 'src/context/User';
import PageLoading from 'src/component/PageLoading';
import AuthGuard from 'src/component/AuthGuard';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { WalletProvider } from 'src/views/pages/Profile/WalletContext';
import NavigationScroll from './views/pages/Dashboard/layout/NavigationScroll';
import themes from './theme';

const RenderRoutes = routes.map((route, i) => {
  const Component = route.element;
  const Guard = route.guard ? AuthGuard : Fragment;
  const Layout = route.layout || Fragment;

  if (route.children) {
    return (
      <Route
        key={i}
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
            key={j}
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
      key={i}
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

function App() {
  const customization = useSelector((state) => state.customization);
  const { i18n } = useTranslation(); // Use the useTranslation hook

  // Check if the current language is RTL
  const isRTL = i18n.language === 'ar';

  // Update the HTML `dir` and `lang` attributes
  useEffect(() => {
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language, isRTL]);

  return (
    <WalletProvider>
      <UserContextProvider>
        <ThemeProvider theme={themes(customization)}>
          <NavigationScroll>
            {/* Apply RTL/LTR class to the root div */}
            <div className={isRTL ? 'rtl' : 'ltr'}>
              <Routes>
                {RenderRoutes}
              </Routes>
            </div>
          </NavigationScroll>
        </ThemeProvider>
      </UserContextProvider>
    </WalletProvider>
  );
}

export default App;