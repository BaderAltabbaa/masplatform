/**
 * @file routes.jsx
 * @description Application route configuration
 * @module Routes
 * 
 * Defines all application routes including:
 * - Public routes (login, home, etc.)
 * - Protected routes (require authentication)
 * - Nested dashboard routes
 * - Error handling routes
 * 
 * Features:
 * - Lazy loading for all components
 * - Route guards for authentication
 * - Layout composition
 * - Nested routing
 */

import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import HomeLayout from "./layouts/index";

/**
 * Application Route Configuration
 * @constant {Array<Object>}
 * 
 * Each route can have:
 * @property {string} path - Route URL
 * @property {React.Component} [layout] - Wrapper layout component
 * @property {React.Component} element - Page component (lazy loaded)
 * @property {boolean} [guard] - Whether authentication is required
 * @property {Array} [children] - Nested routes
 */

export const routes = [
  // ==================== PUBLIC ROUTES ====================
  {
    path: "/",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Home/Main/Main")),
  },

  {
    path: "/login",
    layout: HomeLayout,
    element: lazy(() =>
      import("src/views/pages/UserSignUp/login/login")
    ),
  },
  {
    path: "/Forget",
    layout: HomeLayout,
    element: lazy(() =>
      import("src/views/pages/UserSignUp/forgetPassword/forgetPassword")
    ),
  },
  {
    path: "/create-account",
    layout: HomeLayout,
    element: lazy(() =>
      import("src/views/pages/UserSignUp/register/register")
    ),
  },

  // ==================== PROTECTED DASHBOARD ROUTES ====================

  {
    path: "/profile",
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Dashboard/layout/MainLayout")
    ),
    children: [
      {
        index: true, // This makes it the default route
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Wallet/Wallet")
        ),
      },
      {

        path: 'My_Bundles',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Bundles/Bundles")
        ),
      },

      {

        path: 'My_Education',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/MyEducation/MyEducation")
        ),
      },

      {
        path: 'My_Marketplace',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Marketplace/Marketplace")
        ),
      },

      {
        path: 'My_Wallet',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Wallet/Wallet")
        ),
      },
      {
        path: 'My_Fundraise',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Fundraise/Fundraise")
        ),
      },

      {
        path: 'My_purchases',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/purchases/purchases")
        ),
      },
      {
        path: 'My_sales',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/sales/sales")
        ),
      },

      {
        path: 'My_subscriptions',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/subscriptions/subscriptions")
        ),
      },
      {
        path: 'My_feed',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Feed/Feed")
        ),
      },

      {
        path: 'My_Auctions',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Auction/Auction")
        ),
      },
      {
        path: 'My_Subscribers',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/Subscribers/Subscribers")
        ),
      },
      {
        path: 'Supporter_List',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/SupporterList/SupporterList")
        ),
      },
      {
        path: 'Donate_Transaction',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/DonateList/DonateList")
        ),
      },
      {
        path: 'Transaction_History',
        element: lazy(() =>
          import("src/views/pages/Dashboard/pages/TransactionHistory/TransactionHistory")
        ),
      },
    ]
  },

  {
    path: "/profilesettings",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/ProfileSetting")),
  },

  // ==================== PROTECTED SERVICE LIST ROUTES ====================

  {
    path: "/creators",
    guard: true,

    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/Searchresult")),
  },

  {
    path: "/bundles",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/AllBundles/AllBundles")),
  },

  {
    path: "/items",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Allitems/Allitems")),
  },

  {
    path: "/user-list",
    guard: true,

    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Users/UsersList")),
  },

  {
    path: "/Fundraise",
    layout: HomeLayout,
    guard: true,

    element: lazy(() => import("src/views/pages/Fundraise/Fundraise")),
  },

  {
    path: "/RWA",
    guard: true,
    layout: HomeLayout,

    element: lazy(() => import("src/views/pages/RWA/RWA")),
  },

  // ==================== PROTECTED EDUCATION LIST ROUTES ====================

  {
    path: "/edu-home",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education-Beta/Home")),
  },

  {
    path: "/edu-courses",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education-Beta/Courses")),
  },

  {
    path: "/education",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Education")),
  },

  {
    path: "/plans",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Plans")),
  },

  {
    path: "/lesson/:id",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Education/Lesson")),
  },

  {
    path: "/courses-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Courses/CourseDetails")
    ),
  },

  // ==================== PROTECTED METAVERSE LIST ROUTES ====================

  {
    path: "/corporate/:pageName",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/staticPage")),
  },

  // ==================== PROTECTED ABOUTUS LIST ROUTES ====================


  {
    path: "/corporate/company",
    layout: HomeLayout,

    element: lazy(() => import("src/views/pages/Landing")),
  },
  {
    path: "/About_us",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/About/AboutUs")),
  },
  {
    path: "/Blogs",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/About/Blog")),
  },
  {
    path: "/Contact_Us",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/About/ContactUs")),
  },
  {
    path: "/FAQ",
    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/About/FAQ")),
  },


  // ==================== CHAT ROUTES ====================


  {
    path: "/chat",
    layout: HomeLayout,
    element: () => <Navigate to="/chat/t" />,
  },

  {
    path: "/chat/:chatId",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Chat/index")),
  },

  // ==================== PROTECTED WALLET ROUTES ====================

  {
    path: "/kyc",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/kyc")),
  },
  {
    path: "/buymas",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/buymas")),
  },
  {
    path: "/connectWallet",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/connectWallet")),
  },

  {
    path: "/refferal",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/UserSignUp/Refferal")),
  },
  {
    path: "/WalletContext",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Profile/WalletContext")),
  },
  {
    path: "/user-profile/:username",
    layout: HomeLayout,
    guard: true,
    element: lazy(() => import("src/views/pages/Users/UserProfile")),
  },

  // ==================== PROTECTED DETAILS ROUTES ====================


  {
    path: "/bundles-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Bundles/BundleDetails")
    ),
  },

  {
    path: "/items-details",
    layout: HomeLayout,
    guard: true,
    element: lazy(() =>
      import("src/views/pages/Profile/Items/ItemDetails")
    ),
  },

  {
    path: "/FundDetails",
    guard: true,

    layout: HomeLayout,
    element: lazy(() => import("src/views/pages/Fundraise/FundDetails")),
  },

  // ==================== ERROR HANDLING ROUTES ====================

  {
    path: "/404",
    layout: HomeLayout,

    element: lazy(() => import("src/views/errors/NotFound")),
  },
  {
    path: "*",
    element: () => <Navigate to="/404" />,
  },
];
