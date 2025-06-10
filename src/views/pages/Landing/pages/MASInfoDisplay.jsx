import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const MASInfoDisplay = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const masData = [
    {
      title: "MAS Tokens Overview",
      content: "All contributions in the MAS platform will take place through digital coins, among them an BSC digital token called the MAS token (symbol: $MAS). The purpose of using digital tokens instead of fiat currency is twofold. First, their use allows monetary flows to be coordinated through binance smart contracts. On the other hand, BSC tokens allow for frictionless monetary flows.",
      image: "/assets/Images/masfooter-logo1.svg" 
    },
    {
      title: "Token Exchange",
      content: "In any case, the MAS platform will procure a seamless exchange between MAS tokens and stable coins such as USDT, USDC and BUSD, which are widely available on third-party exchanges. MAS tokens will be issued and sold through an initial exchange offering (IEO) to be conducted as explained in Section 7.",
      image: "/assets/Images/masfooter-logo1.svg" 
    },
    {
      title: "Token Usage & Storage",
      content: "As mentioned, contributions from clients to MAS will be made in digital tokens. Once the contribution is made as a bundle subscription or generic donation, the MAS will be free to swap the tokens for stable coins or fiat currency. MAS tokens can be stored in any bsc compatible wallet, like Metamask. The platform will facilitate swapping and exchanging of MAS tokens through third party exchanges.",
      image: "/assets/Images/masfooter-logo1.svg" 
    },
    {
      title: "Token Economics",
      content: "The price of MAS tokens, once the IEO is concluded, will be determined by market supply and demand in digital exchanges. While the MAS platform allows contributions to be made in any kind of digital token, there will be certain incentives to use MAS tokens, as explained ahead.",
      image: "/assets/Images/masfooter-logo1.svg" 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Custom arrow components
  const CustomArrow = ({ direction, onClick, isEdge }) => (
    <Box
      onClick={onClick}
      sx={{
        position: 'absolute',
        top: isMobile? '95%' : '100%',
        [direction === 'left' ? 'left' : 'right']: isMobile ? '10px' : '-10px',
        transform: 'translateY(-50%)',
        zIndex: 2,
        cursor: 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: '50%',
        width: '35px',
        height: '35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          transform: 'translateY(-50%) scale(1.1)'
        },
        opacity: isEdge ? 0.3 : 1,
        pointerEvents: isEdge ? 'none' : 'auto'
      }}
    >
      {direction === 'left' ? (
        <ArrowBackIosNewIcon sx={{ color: 'white', fontSize: '20px' }} />
      ) : (
        <ArrowForwardIosIcon sx={{ color: 'white', fontSize: '20px' }} />
      )}
    </Box>
  );

  return (
    <Box sx={{
      maxWidth: '1200px',
      padding: isMobile ? '20px' : '40px',
      background: "linear-gradient(to right top, #7738a3, #9741c9, #9f45c6, #bb52dc, #d760f3)",
      borderRadius: '16px',
      boxShadow: theme.shadows[3],
      mx: isMobile ? 2 : "auto",
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Typography variant="h1" component="h2" gutterBottom sx={{
        fontWeight: 700,
        textAlign: 'center',
        marginBottom: '20px',
        color: "white",
        fontSize: isMobile ? '1.5rem' : '2.5rem'
      }}>
        $MAS Token Information
      </Typography>

      <Box sx={{
        position: 'relative',
        '& .carousel .control-arrow': {
          display: 'none' // Hide default arrows
        }
      }}>
        <Carousel
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={4000}
          swipeable={true}
          emulateTouch={true}
          renderArrowPrev={(onClickHandler, hasPrev, label) => (
            <CustomArrow direction="left" onClick={onClickHandler} isEdge={!hasPrev} />
          )}
          renderArrowNext={(onClickHandler, hasNext, label) => (
            <CustomArrow direction="right" onClick={onClickHandler} isEdge={!hasNext} />
          )}
        >
          {masData.map((item, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <Box sx={{ padding: isMobile ? '10px' : '20px' }}>
                {isMobile ? (
                  <>
                    <motion.div variants={itemVariants}>
                      <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 600, color: "white" }}>
                        {item.title}
                      </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Typography variant="body1" paragraph sx={{ color: "white" }}>
                        {item.content}
                      </Typography>
                    </motion.div>
                  </>
                ) : (
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px'
                  }}>
                    <motion.div variants={itemVariants} style={{ flex: 1 }}>
                      <Typography variant="h3" component="h3" gutterBottom sx={{ 
                        fontWeight: 600,
                        color: "white",
                        fontSize: '1.8rem'
                      }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ color: "white" }}>
                        {item.content}
                      </Typography>
                    </motion.div>
                    <motion.div variants={itemVariants} style={{ flex: 1 }}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.title}
                        sx={{
                          width: '100%',
                          maxHeight: '150px',
                          objectFit: 'contain',
                        }}
                      />
                    </motion.div>
                  </Box>
                )}
              </Box>
            </motion.div>
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default MASInfoDisplay;