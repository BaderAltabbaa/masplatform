/**
 * @file main.jsx
 * @description Entry point for the React application
 * @module Main
 * 
 * Sets up the core application infrastructure including:
 * - React DOM rendering
 * - Redux store
 * - Internationalization (i18n)
 * - Routing
 * - Global styles and toast notifications
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n/i18n';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';
import CssBaseline from '@mui/material/CssBaseline';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

// Third-party styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../public/assets/scss/style.scss';

// Redux store setup
import reducer from './views/pages/Dashboard/store/reducer';

/**
 * Configure the Redux store with combined reducers
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 */
const store = configureStore({ 
  reducer,
});

/**
 * Root DOM container where the app will be mounted
 * @constant {HTMLElement}
 */
const container = document.getElementById('root');

/**
 * Renders the entire application with all context providers
 * 
 * The application is wrapped with:
 * 1. BrowserRouter - For client-side routing
 * 2. CssBaseline - Material-UI's CSS reset
 * 3. I18nextProvider - Internationalization support
 * 4. Redux Provider - State management
 * 5. ToastContainer - Global notification system
 */
ReactDOM.render(
  <BrowserRouter>
    <CssBaseline /> {/* Normalize CSS across browsers */}
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App /> {/* Main application component */}
      </Provider>
    </I18nextProvider>
    
    {/* Global toast notification configuration */}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored" // Consider adding theme based on app design
    />
  </BrowserRouter>,
  container
);

/**
 * Service Worker Registration
 * 
 * By default, the service worker is unregistered which means:
 * - No offline capabilities
 * - Faster development reloads
 * 
 * To enable PWA features:
 * 1. Change unregister() to register()
 * 2. Create a proper service worker file
 * 3. Configure webpack if using custom setup
 * 
 * @see https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();