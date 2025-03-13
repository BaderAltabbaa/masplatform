import PropTypes from 'prop-types';
import { forwardRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import { MENU_OPEN, SET_MENU } from '../../../../../store/actions';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

const NavItem = ({ item, level }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const customization = useSelector((state) => state.customization);
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

  const Icon = item.icon;
  const itemIcon = item?.icon ? (
    <Icon stroke={1.5} size="1.3rem" />
  ) : (
    <FiberManualRecordIcon
      sx={{
        width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  let listItemProps = {
    component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />)
  };
  if (item?.external) {
    listItemProps = { component: 'a', href: item.url, target: itemTarget };
  }

  const itemHandler = (id) => {
    dispatch({ type: MENU_OPEN, id });
    if (matchesSM) dispatch({ type: SET_MENU, opened: false });
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch({ type: MENU_OPEN, id: item.id });
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <ListItemButton
      {...listItemProps}
      disabled={item.disabled}
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        mb: 0.5,
        alignItems: 'flex-start',
        backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
        

        py: level > 1 ? 1 : 1.25,
        pl: `${level * 24}px`
      }}
      selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
      onClick={() => itemHandler(item.id)}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36,color: 'white' }}>{itemIcon}</ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={customization.isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'} 
          sx={{ color: customization.isOpen.findIndex((id) => id === item.id) > -1 ? '#5e35b1' : 'white',
            "&:hover":{
              color:"#5e35b1 !important",
              fontWeight:"bold"
            }
           }}
          >
            {item.title}
          </Typography>
        }
        secondary={
          item.caption && (
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              {item.caption} 
            </Typography>
          )
        }
      />
      {item.chip && (
        <Chip
          color={item.chip.color}
          variant={item.chip.variant}
          size={item.chip.size}
          label={item.chip.label}
          avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
        />
      )}
    </ListItemButton>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number
};

export default NavItem;
// import PropTypes from 'prop-types';
// import { forwardRef, useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
// import useMediaQuery from '@mui/material/useMediaQuery';

// // assets
// import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// // ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

// const NavItem = ({ item, level, customization, setCustomization }) => {
//   const theme = useTheme();
//   const { pathname } = useLocation();
//   const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

//   const Icon = item.icon;
//   const itemIcon = item?.icon ? (
//     <Icon stroke={1.5} size="1.3rem" />
//   ) : (
//     <FiberManualRecordIcon
//       sx={{
//         width: customization.isOpen.includes(item.id) ? 8 : 6,
//         height: customization.isOpen.includes(item.id) ? 8 : 6,
//       }}
//       fontSize={level > 0 ? 'inherit' : 'medium'}
//     />
//   );

//   let itemTarget = '_self';
//   if (item.target) {
//     itemTarget = '_blank';
//   }

//   let listItemProps = {
//     component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />),
//   };
//   if (item?.external) {
//     listItemProps = { component: 'a', href: item.url, target: itemTarget };
//   }

//   const itemHandler = (id) => {
//     setCustomization((prev) => ({
//       ...prev,
//       isOpen: prev.isOpen.includes(id) ? prev.isOpen : [...prev.isOpen, id],
//     }));
//     if (matchesSM) {
//       setCustomization((prev) => ({
//         ...prev,
//         isMenuOpen: false,
//       }));
//     }
//   };

//   // active menu item on page load
//   useEffect(() => {
//     const currentIndex = document.location.pathname
//       .toString()
//       .split('/')
//       .findIndex((id) => id === item.id);
//     if (currentIndex > -1) {
//       setCustomization((prev) => ({
//         ...prev,
//         isOpen: prev.isOpen.includes(item.id) ? prev.isOpen : [...prev.isOpen, item.id],
//       }));
//     }
//   }, [pathname, item.id, setCustomization]);

//   return (
//     <ListItemButton
//       {...listItemProps}
//       disabled={item.disabled}
//       sx={{
//         borderRadius: `${customization?.borderRadius}px`,
//         mb: 0.5,
//         alignItems: 'flex-start',
//         backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
//         py: level > 1 ? 1 : 1.25,
//         pl: `${level * 24}px`,
//       }}
//       selected={customization.isOpen.includes(item.id)}
//       onClick={() => itemHandler(item.id)}
//     >
//       <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
//       <ListItemText
//         primary={
//           <Typography
//             variant={customization.isOpen.includes(item.id) ? 'h5' : 'body1'}
//             color="inherit"
//           >
//             {item.title}
//           </Typography>
//         }
//         secondary={
//           item.caption && (
//             <Typography
//               variant="caption"
//               sx={{ ...theme.typography.subMenuCaption }}
//               display="block"
//               gutterBottom
//             >
//               {item.caption}
//             </Typography>
//           )
//         }
//       />
//       {item.chip && (
//         <Chip
//           color={item.chip.color}
//           variant={item.chip.variant}
//           size={item.chip.size}
//           label={item.chip.label}
//           avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//         />
//       )}
//     </ListItemButton>
//   );
// };

// NavItem.propTypes = {
//   item: PropTypes.object.isRequired,
//   level: PropTypes.number.isRequired,
//   customization: PropTypes.object.isRequired,
//   setCustomization: PropTypes.func.isRequired,
// };

// export default NavItem;
