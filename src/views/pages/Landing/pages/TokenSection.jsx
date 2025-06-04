import React from 'react';
import { Box, Typography, Grid, useTheme, Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AttachMoney as TokenIcon,
  SwapHoriz as ExchangeIcon,
  AccountBalanceWallet as WalletIcon,
  ShowChart as MarketIcon,
  MonetizationOn as StablecoinIcon
} from '@mui/icons-material';

const TokenSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const cardData = [
    {
      icon: <TokenIcon fontSize="large" sx={{color:"white"}} />,
      title: "MAS Token ($MAS)",
      content: "Primary digital currency for all platform contributions via Binance Smart Chain"
    },
    {
      icon: <ExchangeIcon fontSize="large" sx={{color:"white"}} />,
      title: "Frictionless Exchange",
      content: "Seamless swapping between MAS tokens and stablecoins (USDT, USDC, BUSD)"
    },
    {
      icon: <WalletIcon fontSize="large" sx={{color:"white"}} />,
      title: "BSC-Compatible Wallets",
      content: "Store MAS tokens in any BSC wallet like MetaMask for easy access"
    },
    {
      icon: <MarketIcon fontSize="large" sx={{color:"white"}} />,
      title: "Market-Driven Value",
      content: "Token price determined by supply/demand after Initial Exchange Offering (IEO)"
    },
    {
      icon: <StablecoinIcon fontSize="large" sx={{color:"white"}} />,
      title: "Flexible Contributions",
      content: "Accepting various tokens but with incentives for using $MAS"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <Container 
      maxWidth="lg" // 1200px by default in MUI
      sx={{ 
        pt: 12,
        pb:4,
        px: { xs: 2, sm: 3 }
      }}
    >
      <Box 
        ref={ref}
        sx={{
          maxWidth: 1200,
          mx: 'auto'
        }}
      >
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom 
            textAlign="center"
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.6rem', md: '2.5rem' }, // Responsive font size
              color:"white"
            }}
          >
            MAS Token Economy
          </Typography>

          <motion.div variants={itemVariants}>
            <Typography 
              variant="h5" 
              component="p" 
              textAlign="center" 
              sx={{ 
                mb:4,
                maxWidth: '800px',
                mx: 'auto',
                color: "white",
                fontSize: { xs: '1rem', md: '1.25rem' } // Responsive font size
              }}
            >
              Powering the MAS Platform through Binance Smart Chain with seamless digital transactions
            </Typography>
          </motion.div>

          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {cardData.map((card, index) => (
              <Grid item xs={12} sm={6} lg={4} key={index} sx={{ display: 'flex' }}>
                <motion.div variants={itemVariants} style={{ width: '100%' }}>
                  <Box
                    sx={{
                      p:2,
                      height: '100%',
                      minHeight: '170px', // Fixed minimum height
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      boxShadow: 3,
                      background: `linear-gradient(to top right,#5f0064,#1d0033)`,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    <Box textAlign="center">
                      {card.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      gutterBottom 
                      textAlign="center"
                      sx={{ 
                        fontSize: { xs: '1.1rem', md: '1.2rem' },
                        fontWeight: 600,
                        color:"white"
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      textAlign="center"
                      sx={{ 
                        mt: 'auto', // Pushes content to top
                        fontSize: { xs: '0.9rem', md: '0.9rem' },
                        color:"white"
                      }}
                    >
                      {card.content}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
};

export default TokenSection;