import React, { Suspense, Fragment } from 'react'
import { Routes, Route, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import {UserContextProvider} from 'src/context/User'
import PageLoading from 'src/component/PageLoading'
import AuthGuard from 'src/component/AuthGuard'
import { ThemeProvider } from '@mui/material/styles';
// import { CreateTheme } from 'src/theme'
import { useSelector } from 'react-redux';
import { WalletProvider } from 'src/views/pages/Profile/WalletContext';
import NavigationScroll from './views/pages/Dashboard/layout/NavigationScroll';
import themes from './theme';

// const RenderRoutes = routes.map((route, i) => {
//   const Component = route.element
//   const Guard = route.guard ? AuthGuard : Fragment
//   const Layout = route.layout || Fragment
//   const hasChildren=route.children

// console.log(route)
  
 
//   if(hasChildren){
//     return <Route
//     key={i}
//     path={route.path}
//     element={
//       <Guard>
//         <Suspense fallback={<PageLoading />}>
//           <Layout>
//             <Component />
//           </Layout>
//         </Suspense>
//       </Guard>
//     }
//   >
//     {route.children.map((child,i)=>
    
//     {
//       const  childComponent = child.element;
//      return (
//  <Route 
//  key={i}
//  path={route.path + child.path}
//  element={
//   <childComponent />
//  }
 
//  />
//     )
//     }
//   )}
   
    
//      </Route>
//   }

//     return <Route
//       key={i}
//       path={route.path}
//       element={
//         <Guard>
//           <Suspense fallback={<PageLoading />}>
//             <Layout>
//               <Component />
//             </Layout>
//           </Suspense>
//         </Guard>
//       }
//     />

  
    
  
//   // return <Route
//   //     key={i}
//   //     path={route.path}
//   //     element={
//   //       <Guard>
//   //         <Suspense fallback={<PageLoading />}>
//   //           <Layout>
//   //             <Component />
//   //           </Layout>
//   //         </Suspense>
//   //       </Guard>
//   //     }
//   //   />
// })
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
  return (
    <WalletProvider>
    
      <UserContextProvider>
      <ThemeProvider  theme={themes(customization)}>
      <NavigationScroll> 

      
        <Routes>
          {RenderRoutes}
        </Routes>
        </NavigationScroll>
        </ThemeProvider>
      </UserContextProvider>
    
    </WalletProvider>
  )
}

export default App

