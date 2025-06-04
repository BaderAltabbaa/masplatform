import React from 'react';
import { Box, Typography, Grid, useTheme } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const BusinessModelSection = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const businessModelSections = [
    {
      emoji: "💸",
      content: "The main revenue source for the MAS platform will be a commission fee charged upon the contributions made by clients to MAS.",
    },
    {
      emoji: "🔄",
      content: "The commission is extracted from MAS' balances when they withdraw funds in order to exchange them for stable coins or fiat currency.",
    },
    {
      emoji: "📊",
      content: "The commission is calculated as a percentage of the withdrawal, based on the membership package that corresponds to each MAS, according to how many MAS tokens are in his account.",
    },
    {
      emoji: "🏆",
      content: "There are 5 membership packages: basic, silver, gold, diamond and MAS plus. Commission percentage fees will vary according to the package.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <Box 
      ref={ref}
      sx={{
        pt: 2,
        pb: 6,
        px: { xs: 2, sm: 3 },
        maxWidth: 1200,
        mx: 'auto'
      }}
    >
      <Typography 
        variant="h3" 
        component="h2" 
        gutterBottom 
        textAlign="center"
        sx={{ 
          fontWeight: 700,
          fontSize: { xs: '1.6rem', md: '2.5rem' },
          mb: { xs: 3, md: 6 },
          color:"white"
        }}
      >
        How MAS Platform Generates Revenue
      </Typography>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <Grid container spacing={{ xs: 2, md: 0.5 }}>
          {businessModelSections.map((section, index) => (
            <Grid 
              item 
              xs={12} 
              md={6} 
              lg={3} 
              key={index}
              sx={{
                display: 'flex',
                mt: {
                  lg: index === 1 || index === 3 ? '40px' : 0
                }
              }}
            >
              <motion.div 
                variants={itemVariants}
                style={{ width: '100%' }}
              >
                <Box
                  sx={{
                    p: { xs: 2, md: 3 },
                    height: { xs: 'auto', lg: '250px' },
                    minHeight: '180px',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 2,
                    boxShadow: 3,
                    background: `linear-gradient(to top right,#5f0064,#1d0033)`,
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: 6,
                      '&::before': {
                        opacity: 1
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      border: '2px solid white',
                      borderRadius: '8px',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }
                  }}
                >
                  <Typography 
                    variant="h4" 
                    component="div"
                    sx={{ 
                      mb: 2,
                      fontSize: '2.5rem',
                      lineHeight: 1
                    }}
                  >
                    {section.emoji}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    textAlign="center"
                    sx={{
                      fontSize: { xs: '0.9rem', md: '0.92rem' },
                      fontWeight: 400,
                      color: "white"
                    }}
                  >
                    {section.content}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
};

export default BusinessModelSection;