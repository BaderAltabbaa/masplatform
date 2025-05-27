import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip
} from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import "src/views/pages/Users/UsersList.css"

const membershipTiers = [
  { name: "Basic", masBalance: "0", withdrawalFee: "3%" },
  { name: "Silver", masBalance: "100", withdrawalFee: "2.5%" },
  { name: "Gold", masBalance: "250", withdrawalFee: "2%" },
  { name: "Diamond", masBalance: "1,500", withdrawalFee: "1.5%" },
  { name: "MAS+", masBalance: "10,000", withdrawalFee: "1%" }
];

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5
    }
  })
};

const MembershipTiers = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      px: isMobile ? 2 : 6,
      py: 8,
      maxWidth: '1000px',
      mx: 'auto'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          align="center"
          sx={{ 
            fontWeight: 700,
            mb: 2,
            fontSize: isMobile ? '2rem' : '2.5rem',
            color: "white"
          }}
        >
          Membership Tiers
        </Typography>
        
        <Typography 
          variant="h5" 
          align="center" 
          sx={{ 
            mb: 4, 
            fontSize: isMobile ? '1.1rem' : '1.3rem',
            color: 'white'
          }}
        >
          Multi-level membership system with benefits based on $MAS token holdings
        </Typography>
      </motion.div>

       <div className="tableWrapper">
            <div className="tableAnimatedBackground"></div>
            <div className="tableInnerBlurEffect"></div>
      <TableContainer 
        component={Paper} 
        sx={{ 
          borderRadius: '16px',
          boxShadow: theme.shadows[3],
          border:"none",
          position:"relative"
        
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="membership tiers table">
          <TableHead sx={{ background: (theme) => theme.custom.CarBackGround }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 700 }}>Membership</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 700 }}>$MAS Balance</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 700 }}>Withdrawal Fee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {membershipTiers.map((tier, index) => (
              <TableRow 
                key={tier.name}
                component={motion.tr}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={rowVariants}
                sx={{ 
                  '&:nth-of-type(odd)': { 
                    backgroundColor: theme.palette.action.hover 
                  },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell component="th" scope="row">
                  <Chip 
                    label={tier.name} 
                    color={
                      tier.name === "MAS+" ? "secondary" : 
                      tier.name === "Diamond" ? "info" : 
                      tier.name === "Gold" ? "warning" : 
                      tier.name === "Silver" ? "success" : "default"
                    }
                    sx={{ 
                      fontWeight: 700,
                      px: 1,
                      fontSize: '0.9rem'
                    }} 
                  />
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>{tier.masBalance}</TableCell>
                <TableCell align="right" sx={{ 
                  fontWeight: 700,
                  color: theme.palette.error.main
                }}>
                  {tier.withdrawalFee}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: '8px',
          bgcolor: theme.palette.primary.light,
          maxWidth: '600px',
          mx: 'auto',
          mt:2
        }}>
          <InfoIcon sx={{ mr: 1, color:  (theme) => theme.custom.mainButton}} />
          <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
            When using MAS Tokens for withdrawal, fees drop to only 0.5%.
          </Typography>
        </Box>
      </motion.div>
    </Box>
  );
};

export default MembershipTiers;