

import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
// material-ui
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
// project imports
import { CssBaseline, styled, useTheme } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Customization from '../Customization';
// import Breadcrumbs from 'ui-component/extended/Breadcrumbs';
import { SET_MENU } from '../../store/actions';
import { drawerWidth } from '../../store/constant';
import Breadcrumbs from '../../ui-component/extended/Breadcrumbs';
import TopBar from '../../../../../layouts/TopBar/TopBar'

// assets
import { IconChevronRight } from '@tabler/icons-react';
import Footer from '../../../../../layouts/Footer/Footer';

// استخدم قيمة drawerWidth مباشرة (يمكن تعديلها حسب احتياجاتك)
// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' && prop !== 'theme' })(({ theme, open }) => ({
//   ...theme.typography.mainContent,
//   borderBottomLeftRadius: 0,
//   borderBottomRightRadius: 0,
//   transition: theme.transitions.create(
//     'margin',
//     open
//       ? {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen
//         }
//       : {
//           easing: theme.transitions.easing.sharp,
//           duration: theme.transitions.duration.leavingScreen
//         }
//   ),
//   [theme.breakpoints.up('md')]: {
//     marginLeft: open ? 0 : -(drawerWidth - 20),
//     width: `calc(100% - ${drawerWidth}px)`
//   },
//   [theme.breakpoints.down('md')]: {
//     marginLeft: '20px',
//     width: `calc(100% - ${drawerWidth}px)`,
//     padding: '16px'
//   },
//   [theme.breakpoints.down('sm')]: {
//     marginLeft: '10px',
//     width: `calc(100% - ${drawerWidth}px)`,
//     padding: '16px',
//     marginRight: '10px'
//   }
// }));


// // ==============================|| MAIN LAYOUT ||============================== //

// const MainLayout = () => {
//   const theme = useTheme();
//   console.log(theme)
//   const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

//   // إدارة الحالة محليًا بدلاً من Redux
//   const [leftDrawerOpened, setLeftDrawerOpened] = useState(true);

//   const handleLeftDrawerToggle = () => {
//     setLeftDrawerOpened((prev) => !prev);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
    
//       {/* header */}
//       <AppBar
//         enableColorOnDark
//         position="fixed"
//         color="inherit"
//         elevation={0}
//         sx={{
//           bgcolor: theme.palette.background.default,
//           transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
//           background: (theme) => "linear-gradient(to bottom, #640D5F, rgb(199, 113, 238))" ,
//           padding : '5px'
//         }}
//       >
//         <Toolbar>
//           <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
//         </Toolbar>
//       </AppBar>

//       {/* يمكنك إلغاء التعليق على الـ Sidebar إذا كنت ستستخدمها */}


// <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
   

//       {/* main content */}
//       <Main theme={theme} open={leftDrawerOpened} sx={{background : "red", marginTop : "86px"}}>
// vvvvvvv
//         {/* يمكنك استخدام Breadcrumbs هنا إذا احتجت */}
//         {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
//         <Outlet />
//       </Main>

//       {/* <Customization /> */}
//     </Box>
//   );
// };

// export default MainLayout;
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  transition: theme.transitions.create(
    'margin',
    open
      ? {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        }
      : {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }
  ),
  [theme.breakpoints.up('md')]: {
    marginLeft: open ? 0 : -(drawerWidth - 20),
    width: `calc(100% - ${drawerWidth}px)`
  },
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px'
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    width: `calc(100% - ${drawerWidth}px)`,
    padding: '16px',
    marginRight: '10px'
  }
}));


// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
  const theme = useTheme();
  console.log(theme)
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const dispatch = useDispatch();
  const handleLeftDrawerToggle = () => {
    dispatch({ type: SET_MENU, opened: !leftDrawerOpened });
  };

  return (
  <>


    <Box sx={{ display: 'flex', padding:"0"  }}>
      <CssBaseline />
   
      {/* header */}
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          // bgcolor: theme.palette.background.default,
          // background: (theme) => "linear-gradient(to bottom, #640D5F, rgb(199, 113, 238))" ,
          background: (theme) => "linear-gradient(to top , #640D5F, #38014e)" ,

          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
          // top :  "80px"
        }}
      >
        <TopBar
  sx={{
    // bgcolor: theme.palette.background.default,
    // background: (theme) => "linear-gradient(to bottom, #640D5F, rgb(199, 113, 238))" ,
    position :  "absolute",
    top :  "0"
  }}
/>
        <Toolbar>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      {/* drawer */}
      <Sidebar drawerOpen={!matchDownMd ? leftDrawerOpened : !leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />

      {/* main content */}
      <Main sx={{padding:"0"}}  open={leftDrawerOpened}>
        
        {/* breadcrumb */}
        {/* <Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign /> */}
        <Outlet />
     
      </Main>
      {/* <Customization /> */}
      
    </Box>
    
  
  </>
    
  
  

  );
};

export default MainLayout;
