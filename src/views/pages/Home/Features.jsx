import React from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import {
  AccountTree as BlockchainIcon,
  Receipt as PodIcon,
  Paid as FeesIcon,
  Verified as CertificatesIcon,
  CurrencyExchange as CurrencyIcon,
  ConnectWithoutContact as SocialIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
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
transition={{ 
  type: "spring",
  stiffness: 100,
  damping: 10,
  delay: index * 0.1
}}      style={{ height: '100%' }}
      
    >
      {children}
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <BlockchainIcon fontSize="medium" />,
      title: "Blockchain Transparency",
      description: "Every transaction is publicly verifiable on the blockchain"
    },
    {
      icon: <PodIcon fontSize="medium"  />,
      title: "Proof of Donation (PoD)",
      description: "Immutable records of all charitable contributions"
    },
    {
      icon: <FeesIcon fontSize="medium" />,
      title: "Ultra-low Fees (0.5%)",
      description: "Industry-leading low transaction costs"
    },
    {
      icon: <CertificatesIcon fontSize="medium"  />,
      title: "Donation Certificates",
      description: "Automatically generated verifiable certificates"
    },
    {
      icon: <CurrencyIcon fontSize="medium"  />,
      title: "Multi-Currency Support",
      description: "Accept payments in multiple cryptocurrencies"
    },
    {
      icon: <SocialIcon fontSize="medium"  />,
      title: "Social & Matchmaking Tools",
      description: "Connect donors with causes they care about"
    }
  ];

  return (
    <>
    <Box>
       <Typography variant="h3" component="h2" sx={{
          fontWeight: 700,
          color: 'white',
          mb: 1,
          textAlign: 'center',
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
        }}>
          Key Features
        </Typography>
        
        <Typography variant="h5" component="h3" sx={{
          mb: 2,
          color: 'white',
          textAlign: 'center',
          fontSize: { xs: '1rem', sm: '1rem', md: '1.2rem' },
          }}>
          Why MAS Stands Out
        </Typography>
    </Box>
    
    <Box sx={{
      maxWidth: 1400,
      mx: 'auto',
      px: 2,
      py: 2,
      background: (theme) => theme.custom.CarBackGround,
      borderRadius: "20px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)"
    }}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
       
      </motion.div>

      {/* Features Grid */}
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <AnimatedCard index={index}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 3
                },
                borderRadius: 3,
                boxShadow: 2,
              background:"#b8b6b6",
              }}>
                <CardContent sx={{
                  flexGrow: 1,
                  p: 2,
                  textAlign: 'center'
                }}>
                  <Box sx={{
                    display: 'inline-flex',
                    p: 1,
                    mb: 1,
                    backgroundColor: (theme) => theme.custom.mainButton,
                    borderRadius: '30%',
                    color: 'white'
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" component="h4" gutterBottom sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    color: (theme) => theme.custom.mainButton
                  }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{
                    color: (theme) => theme.custom.mainButton,
                    fontSize: { xs: '0.8rem', md: '0.9rem' }
                  }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </AnimatedCard>
          </Grid>
        ))}
      </Grid>
    </Box>
 </> );
};

export default Features;