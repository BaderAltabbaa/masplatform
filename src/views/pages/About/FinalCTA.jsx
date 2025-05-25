import React from 'react';
import { Box, Typography, Button, useTheme ,Container} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const MotionBox = motion(Box);

const FinalCTA = () => {
    const navigate = useNavigate();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <Container maxWidth="lg">

    <MotionBox
      ref={ref}
      initial={{ opacity: 0, x: 100 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      sx={{
        maxWidth: 900,
        mx: 'auto',
        px: { xs: 1, md: 2 },
        py: 3,
        textAlign: 'center',
        background: (theme) => theme.custom.CarBackGround,
        borderRadius: '20px',
        color: 'white',
        mt: 4,
        boxShadow: 3
      }}
    >
      {/* Main Heading */}
      <Typography variant="h2" component="h2" sx={{
        fontWeight: 800,
        mb: 3,
        fontSize: { xs: '1rem', sm: '1.5rem', md: '2rem' },
        lineHeight: 1.2,
        color: "white"
      }}>
       Ready to Join?
      </Typography>

      {/* Subheading */}
      <Typography variant="h5" component="p" sx={{
        maxWidth: 800,
        mx: 'auto',
        mb: 5,
        fontSize: { xs: '1rem', md: '1.2rem' },
        opacity: 0.9,
        color: "white"
      }}>
Open your wallet, create your account, and start building your professional and financial future within MAS.      </Typography>

      {/* CTA Buttons */}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 3,
        mt: 4
      }}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            px: 3,
            py: 1,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            minWidth: 200,
            backgroundColor:  (theme) => theme.custom.mainButton
          }}
          onClick={() => {navigate("/login")}}
        >
          Get Started
        </Button>

        <Button
          variant="outlined"
          color="inherit"
          size="large"
          sx={{
            px: 3,
            py: 1,
            fontSize: '1.1rem',
            fontWeight: 600,
            borderRadius: '50px',
            minWidth: 200,
            borderWidth: 2,
            '&:hover': { borderWidth: 2 }
          }}
          onClick={() => {navigate("/Contact_Us")}}
        >
          Learn More
        </Button>
      </Box>
    </MotionBox>
        </Container>
    
  );
};

export default FinalCTA;
