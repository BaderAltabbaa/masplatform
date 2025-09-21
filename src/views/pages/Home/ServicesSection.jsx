import React, { useState, useEffect ,useRef } from "react";
import { Box, Typography ,useTheme, useMediaQuery} from '@mui/material'
import { Link } from "react-router-dom";
import "./style.css";
import { useInView } from "react-intersection-observer";
import "src/views/pages/About/FAQ.css"
import { motion } from 'framer-motion';

 


 
 
 function ServicesSection() {
      const theme = useTheme();
      const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
      const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'lg'));

      const AnimatedItem = ({ children, index }) => {
        const [ref, inView] = useInView({
          threshold: 0.1,
          triggerOnce: true
        });
      
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            {children}
          </motion.div>
        );
      };
    
      const services = [
        { img: "/assets/Images/bundleIcon.webp", text: "Bundles", link: "/bundles" },
        { img: "/assets/Images/edu.webp", text: "Education", link: "/education" },
        { img: "/assets/Images/market.webp", text: "MarketPlace", link: "/items" },
        { img: "/assets/Images/rwa.webp", text: "RWA", link: "/RWA" },
        { img: "/assets/Images/transfer.webp", text: "Transfer", link: "/user-list" },
        { img: "/assets/Images/fundraise.webp", text: "Fundraise", link: "/Fundraise" },
      ];
    
      const getCardDimensions = () => {
        if (isSmall) return { width: '100px', height: '220px' };
        if (isMedium) return { width: '180px', height: '240px' };
        return { width: '220px', height: '250px' };
      };
    
      const getFontSize = () => {
        if (isSmall) return '1.5rem';
        if (isMedium) return '1.2rem';
        return '1.5rem';
      };
    
      return (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexDirection: 'column',
          mb: 6,
          px: 2
        }}>
          <Typography variant="h2" sx={{
            fontWeight: 700,
            color: 'white',
            mb: 4,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            textAlign: 'center'
          }}>
            MAS Platform Services
          </Typography>
    
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { 
              xs: 'repeat(2, 1fr)', 
              sm: 'repeat(3, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(6, 1fr)' 
            },
            gap: { xs: 2, md: 3 },
            maxWidth: '1400px',
            width: '100%',
            padding: { xs: 2, md: 2 },
        background: (theme) => theme.custom.CarBackGround,
            borderRadius: "50px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
            margin: '0 auto'
          }}>
            {services.map((item, index) => (
              <AnimatedItem key={index} index={index}>
                <Link to={item.link} style={{ textDecoration: 'none' }}>
                  <Box sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '50px',
                    height: getCardDimensions().height,
                    transition: 'transform 0.3s ease-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      '& .service-overlay': {
                        opacity: 0.9
                      }
                    }
                  }}>
                    <Box
                      component="img"
                      src={item.img}
                      alt={item.text}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                    <Box className="service-overlay" sx={{
                      position: 'absolute',
                      top: "80%",
                      left: 0,
                      right: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'opacity 0.3s ease',
                      opacity: 0.7
                    }}>
                      <Typography sx={{
                        color: 'white',
                        fontSize: getFontSize(),
                        fontWeight: 'bold',
                        textAlign: 'center',
                        px: 1,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                      }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Box>
                </Link>
              </AnimatedItem>
            ))}
          </Box>
        </Box>
      );}

      export default ServicesSection