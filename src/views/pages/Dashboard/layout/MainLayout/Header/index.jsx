import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { UserContext } from "src/context/User";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";


import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import ProfileSection from './ProfileSection';


// project imports
// import LogoSection from '../LogoSection';



// assets
import { IconMenu2 } from '@tabler/icons-react';
import Buttons from './Buttons';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
  const theme = useTheme();
 const user = useContext(UserContext);
   const navigate = useNavigate();

   
 

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
        
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
       
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
       
        <Avatar
        onClick={() => navigate("/profile")}
                src={
                  user.userData && user.userData?.profilePic
                    ? user.userData?.profilePic
                    : `https://avatars.dicebear.com/api/miniavs/${user?.userData?._id}.svg`
                }
                style={{
                  width: "50px",
                  height: "50px",
                  border: 'solid 2px rgb(255, 255, 255)',
                  cursor: "pointer"
                }}
              />          
        </Box>
        <ButtonBase sx={{ 
          borderRadius: '8px', overflow: 'hidden',
          backgroundColor:"transparent",
          '&:hover': {
                background: 'transparent',
                
              }
            
          }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: ' #8c0087',
                color: theme.palette.secondary.light
              }
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="1.3rem" />
          </Avatar>
        </ButtonBase>

       

      </Box>
      <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ flexGrow: 1 }} />
        <Buttons />

      <ProfileSection />

    
     
  
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
