import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Stack } from '@mui/material';
import {
  School as EducatorsIcon,
  Palette as ArtistsIcon,
  SportsEsports as GameDevIcon,
  Favorite as CharityIcon,
  Work as ProfessionalsIcon,
   RocketLaunch as EntrepreneursIcon, // More dynamic
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';


// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedCard = ({ children, index }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
    delay: index * 100
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      style={{ height: '100%' }}
    >
      {children}
    </motion.div>
  );
};

const CanDoMas = () => {

  const [logoRef, inView] = useInView({  threshold: 0.5 });

  const features = [
    {
      icon: <EducatorsIcon fontSize="large"  />,
      title: "Educators",
      description: "Deliver lessons and get paid in crypto"
    },
    {
      icon: <ArtistsIcon fontSize="large"  />,
      title: "Artists",
      description: "Sell your creative work or offer perks"
    },
    {
      icon: <GameDevIcon fontSize="large"  />,
      title: "Game Developers",
      description: "Monetize your game economy"
    },
    {
      icon: <CharityIcon fontSize="large"  />,
      title: "Charities & NGOs",
      description: "Receive verified donations"
    },
    {
      icon: <ProfessionalsIcon fontSize="large"  />,
      title: "Professionals",
      description: "Offer services and receive support"
    },
      {
      icon: <EntrepreneursIcon fontSize="large"  />,
      title: "Entrepreneurs",
      description: "Launch your crypto-powered business"
    }
  ];

  return (
    <Box sx={{
      maxWidth: 1400,
      mx: 'auto',
      px: { xs: 2, sm: 3, lg: 4 },
      py: 8,
      display: 'flex',
      flexDirection: { xs: 'column', lg: 'row' },
      gap: { xs: 4, lg: 8 }
    }}>
      {/* Left Column - Titles */}
      <Box sx={{
        width: { xs: '100%', lg: '50%' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: { xs: 'center', lg: 'left' }
      }}>
        <Typography variant="h2" component="h2" sx={{
          fontWeight: 800,
          color: 'white',
          mb: 3,
          fontSize: { xs: '2rem', lg: '2.2rem' },
          lineHeight: 1.2,
        }}>
               What You Can Do on MAS
        </Typography>
        
        <Typography variant="h5" component="h3" sx={{
          mb: 4,
          color: 'rgb(255, 255, 255)',
          fontSize: { xs: '1.1rem', lg: '1.3rem' },
          lineHeight: 1.6
        }}>
          A Full Ecosystem for Digital Creativity & Giving
         </Typography>

         <Box my={4} ref={logoRef}>
        <motion.img
    src="\assets\Images\masfooter-logo1.svg"
    alt="Logo"
    width="300px"
    initial={{ rotate: 0 }}
    animate={inView ? { rotate: 360 } : { rotate: 0 }}
    transition={{ duration: 1 }}
  />
        </Box>
        
        <Box sx={{
          width: '100px',
          height: '4px',
          backgroundColor: (theme) => theme.custom.mainButton,
          mb: 4,
          display: { xs: 'none', lg: 'block' }
        }} />
      </Box>

      {/* Right Column - Cards */}
      <Box sx={{
        width: { xs: '100%', lg: '60%' },
        position: 'relative'
      }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item key={index} xs={12} sm={6}>
              <AnimatedCard index={index}>
                <Card sx={{
                  height: '100%',
                  background: (theme) => theme.custom.CarBackGround,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  },
                  borderRadius: 3,
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #ff00cc 0%, #3333ff 100%)'
                  }
                }}>
                  <CardContent sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3
                  }}>
                    <Box sx={{
                      flexShrink: 0,
                      p: 2,
                      backgroundColor: 'rgb(255, 255, 255)',
                      borderRadius: '12px',
                      color: (theme) => theme.custom.mainButton,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {feature.icon}
                    </Box>
                    <Box>
                      <Typography variant="h5" component="h4" gutterBottom sx={{
                        fontWeight: 700,
                        fontSize: { xs: '1.1rem', lg: '1.1rem' },
                        color: "white",
                      
                      }}>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" sx={{
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: { xs: '0.9rem', lg: '0.9rem' },
                        lineHeight: 1.2
                      }}>
                        {feature.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default CanDoMas;