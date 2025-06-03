import React, { useState } from "react";
import { Box, Typography, Grid, Button, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

// Mock data for crypto platform with image backgrounds


const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: '0 0 24px 24px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  },
  bannerSlide: {
    minHeight: '55vh',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(4, 0),
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
    },
    [theme.breakpoints.down('md')]: {
      minHeight: '100%',
      padding: theme.spacing(8, 0, 0),
    },
    [theme.breakpoints.down('sm')]: {
      minHeight: '100%',
    },
  },
  contentContainer: {
     maxWidth: 1280,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 4),
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2),
    },
  },
   gridContainer: {
    width: '100%',
    justifyContent: 'space-between', // Space between on large screens
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center', // Center on smaller screens
    },
  },
  leftSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent: 'center',
    height: '100%',
    gap:"20px",
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      textAlign: 'center',
      padding: theme.spacing(2, 0),
    },
  },
 
 
 
  rightSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    height: '100%',
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(4),
      height: 'auto',
    },
  },
  mediaContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 500,
    height: 300,
    display: 'flex',
    zIndex:10,
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      height: 250,
    },
    [theme.breakpoints.down('sm')]: {
      height: 200,
    },
  },
  cryptoImage: {
    maxWidth: '80%',
    maxHeight: '80%',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))',
    animation: '$float 6s ease-in-out infinite',
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-20px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
  indicator: {
    background: 'white !important',
    width: '10px !important',
    height: '10px !important',
    margin: '0 5px !important',
    display: 'inline-block !important',
    borderRadius: '50% !important',
    opacity: '0.5 !important',
    '&.selected': {
      opacity: '1 !important',
    },
  },
}));

export default function CryptoBannerCarousel( {bannerData , subtitleStyle , buttonDisplay} ) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

    // Add these state and ref
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

   const minSwipeDistance = 50; 

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    // If there's no touch start or we don't know the direction yet, return
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isHorizontalSwipe = Math.abs(distance) > minSwipeDistance;
    
    // If it's a horizontal swipe, prevent vertical scroll
    if (isHorizontalSwipe) {
      e.preventDefault();
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe || isRightSwipe) {
      // Handle swipe logic here if needed
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <Box className={classes.carouselContainer}>
      <Carousel
        autoPlay
        infiniteLoop
        interval={6000}
        transitionTime={1000}
        showThumbs={false}
        showStatus={false}
        showIndicators={!isMobile}
        showArrows={false}  // Removed arrows as requested
        renderIndicator={(onClickHandler, isSelected, index, label) => (
          <div
            className={`${classes.indicator} ${isSelected ? 'selected' : ''}`}
            onClick={onClickHandler}
            onKeyDown={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            aria-label={`Slide ${index + 1}`}
          />
        )}
        swipeable={true}
        emulateTouch={true}
        preventMovementUntilSwipeScrollTolerance={true}
        swipeScrollTolerance={50}
      >
        {bannerData.map((item) => (
          <Box
            key={item.id}
            className={classes.bannerSlide}
            style={{
              backgroundImage: `url(${item.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <Box className={classes.contentContainer}>
              <Grid container className={classes.gridContainer} alignItems="center" >
                <Grid item xs={12} md={5} lg={5}>
                  <Box className={classes.leftSection}>
                    <Typography  color="white" sx={{fontSize:{xs:"2rem",md:"3rem"},fontWeight:"800"}}>
                      {item.title}
                    </Typography>
                    <Typography variant="h3" color="white" sx={{ ...(item.subtitleStyle || subtitleStyle),}}>
                      {item.subtitle}
                    </Typography>
                   
                    <Button
                      variant="contained"
                      sx={{ background: (theme) => theme.custom.gradientButton,
                        width:"100%",
                        maxWidth:"150px",
                        borderRadius:"50px",
                        "&:hover":{
                          background: (theme) => theme.custom.hoverGradientButton
                        },
                        ...(item.buttonDisplay || buttonDisplay)
                        ,
                      }}
                      onClick={() => {navigate(item.nav)}}
                    >
                      {item.cta}
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={5} lg={5}>
                  <Box className={classes.rightSection}>
                    <Box className={classes.mediaContainer}>
                      {item.mediaType === 'image' ? (
                        <img
                          src={item.media}
                          alt={item.title}
                          className={classes.cryptoImage}
                        />
                      ) : (
                        <video
                          autoPlay
                          muted
                          loop
                          className={classes.cryptoImage}
                        >
                          <source src={item.media} type="video/mp4" />
                        </video>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}