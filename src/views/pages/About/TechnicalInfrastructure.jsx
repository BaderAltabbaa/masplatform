import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Grid,
  Divider,
  Chip
} from '@mui/material';
import { 
  AccountBalanceWallet, 
  Code, 
  Link, 
  Verified 
} from '@mui/icons-material';

const infrastructureItems = [
  {
    title: "Binance Smart Chain",
    description: "Built on BSC (Binance Smart Chain) using BEP-20 tokens",
    icon: <Link fontSize="medium" />
  },
  {
    title: "Smart Contracts",
    description: "Smart contracts automate all operations: donations, payments, distributions",
    icon: <Code fontSize="medium" />
  },
  {
    title: "Wallet Integration",
    description: "Integrated with wallets like MetaMask and Trust Wallet",
    icon: <AccountBalanceWallet fontSize="medium" />
  },
  {
    title: "Proof of Donation",
    description: "PoD mechanism to transparently document every act of support",
    icon: <Verified fontSize="medium" />
  }
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const TechnicalInfrastructure = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
         <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          align="center"
          sx={{ 
            fontWeight: 800,
            mb: 2,
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: "white"
          }}
        >
          Technical Infrastructure
        </Typography>
        
        
      </motion.div>
    <Box sx={{ 
      px: isMobile ? 2 : 3,
      py: 3,
      background: (theme) => theme.custom.CarBackGround,
      borderRadius: '16px',
      maxWidth: '1200px',
      mx: 'auto',
      my: 4
    }}>
     

      <Grid container spacing={4}>
        {infrastructureItems.map((item, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <motion.div
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              style={{ height: '100%' }}
            >
              <Box sx={{
                height: '100%',
                p: 3,
              background: (theme) => theme.custom.secCardBackGround,
                borderRadius: '12px',
                borderLeft: `4px solid rgb(56, 0, 59)`,
                boxShadow: theme.shadows[2],
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: theme.shadows[6]
                },
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box sx={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background:  (theme) => theme.custom.mainButton,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  mb: 1
                }}>
                  {item.icon}
                </Box>
                
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700,
                    mb: 1,
                    fontSize: isMobile ? '1rem' : '1.2rem',
                    color:"white"
                  }}
                >
                  {item.title}
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    mb: 2,
                    fontSize: isMobile ? '0.9rem' : '0.9rem',
                    color:"white"
                  }}
                >
                  {item.description}
                </Typography>
                
                <Box sx={{ mt: 'auto' }}>
                  <Chip 
                    label={`Feature ${index + 1}`} 
                    color="primary" 
                    size="small" 
                    sx={{ fontWeight: 600 ,background:  (theme) => theme.custom.mainButton}} 
                  />
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Box>
  );
};

export default TechnicalInfrastructure;