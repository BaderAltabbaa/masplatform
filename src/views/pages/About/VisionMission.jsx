import React from 'react';
import { Box, Grid, Typography, useTheme, useMediaQuery, styled } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BoltIcon from '@mui/icons-material/Bolt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';
import PublicIcon from '@mui/icons-material/Public';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VisionMission = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8 }
    }
  };

  const slideInFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const FeatureItem = ({ icon, title, desc, ml = 0, index }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <Box
        ref={ref}
        display="flex"
        alignItems="flex-start"
        mb={4}
        ml={{ xs: 0, md: ml }}
        component={motion.div}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={featureItemVariants}
        custom={index}
      >
        {/* Diamond icon wrapper */}
        <Box
          component={motion.div}
          initial={{ rotate: 0 }}
          animate={inView ? { rotate: 45 } : { rotate: 0 }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          sx={{
            width: 60,
            height: 60,
            backgroundColor: 'transparent',
            border: '4px solid rgb(255, 255, 255)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
            borderRadius: 2,
            mb: 1
          }}
        >
          {/* Re-rotate the icon */}
          <Box sx={{ transform: 'rotate(-45deg)' }}>{icon}</Box>
        </Box>

        {/* Text content */}
        <Box>
          <Typography variant="h4" fontWeight="bold" color='rgb(242, 196, 253)' mb={1}>
            {title}
          </Typography>
          <Typography variant="h5" color="white">
            {desc}
          </Typography>
        </Box>
      </Box>
    );
  };

  const Diamond = () => (
    <Box
      sx={{
        width: 15,
        height: 15,
        background: (theme) => theme.custom.CarBackGround,
        transform: 'rotate(45deg)',
        mx: 0.5,
      }}
    />
  );

  const RotatedGridContainer = styled(Box)({
    transform: "rotate(45deg)",
    width: "500px",
    height: "500px",
    margin: "50px auto",
    overflow: "hidden",
  });

  const ImageBox = styled(Box)({
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    transition: "transform 0.3s ease",
    margin: 20,
  });

  const AnimatedRotatedGrid = () => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <RotatedGridContainer 
        ref={ref}
        component={motion.div}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
          {[1,2,3,4].map((img, index) => (
            <Grid item xs={6} key={index} sx={{ padding: "0 !important" }}>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "100%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <ImageBox
                  sx={{
                    background: (theme) => theme.custom.CarBackGround,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    borderRadius: 10
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </RotatedGridContainer>
    );
  };

  const TitleWithDecorations = ({ children, isMobile }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <Box textAlign="center" ref={ref}>
        {/* Top Decoration - slides in from right */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          mr={30}
          component={motion.div}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideInFromRight}
        >
          <Box flex={1} maxWidth={50} height={2} bgcolor="white" />
          <Diamond />
          <Diamond />
          <Diamond />
          <Box flex={1} maxWidth={50} height={2} bgcolor="white" />
        </Box>

        {/* Main Heading */}
        <Typography
          fontWeight="bold"
          gutterBottom
          color='white'
          sx={{ fontSize: isMobile ? "2rem" : "3.5rem" }}
          mb={0}
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {children}
        </Typography>

        {/* Bottom Decoration - slides in from left */}
        <Box 
          display="flex" 
          justifyContent="center" 
          alignItems="center" 
          ml={20}
          component={motion.div}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={slideInFromLeft}
        >
          <Box flex={1} maxWidth={50} height={2} bgcolor="white" />
          <Diamond />
          <Diamond />
          <Diamond />
          <Box flex={1} maxWidth={50} height={2} bgcolor="white" />
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Box px={4} sx={{ py: { xs: 3, md: 6 } }} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "end", alignItems: "center" }}>
          <AnimatedRotatedGrid />
        </Box>
        <Box sx={{ mr: { xs: 0, md: 5 } }}>
          <Grid item xs={12} md={6}>
            <TitleWithDecorations isMobile={isMobile}>Our Vision</TitleWithDecorations>

            <Box px={2} py={4}>
              <FeatureItem
                icon={<EmojiObjectsIcon sx={{ color: 'white' }} />}
                title="the world's leading digital platform"
                desc="The bridge that connects creators with their audience"
                ml={0}
                index={0}
              />
              <FeatureItem
                icon={<BoltIcon sx={{ color: 'white' }} />}
                title="A future where talent is rewarded,"
                desc="engagement is built on trust, and income is driven by creativity"
                ml={5}
                index={1}
              />
              <FeatureItem
                icon={<PublicIcon sx={{ color: 'white' }} />}
                title="A mirror of a new era"
                desc="one built on transparency, speed, and openness."
                ml={10}
                index={2}
              />
            </Box>
          </Grid>
        </Box>
      </Box>

      <Box px={4} sx={{ py: { xs: 0, md: 6 } }} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
        <Box sx={{ ml: { xs: 0, md: 5 } }}>
          <Grid item xs={12} md={6}>
            <TitleWithDecorations isMobile={isMobile}>Our Mission</TitleWithDecorations>

            <Box px={2} py={4}>
              <FeatureItem
                icon={<EmojiObjectsIcon sx={{ color: 'white' }} />}
                title="Empowerment with Web3"
                desc="Giving creators and startups tools for financial freedom."
                ml={10}
                index={0}
              />
              <FeatureItem
                icon={<BoltIcon sx={{ color: 'white' }} />}
                title="Smart Ecosystem"
                desc="mart contract-based ground for growth and trade."
                ml={5}
                index={1}
              />
              <FeatureItem
                icon={<PublicIcon sx={{ color: 'white' }} />}
                title="Global Access"
                desc="Expand to borderless markets with crypto payments."
                ml={0}
                index={2}
              />
              <FeatureItem
                icon={<MonetizationOnIcon sx={{ color: 'white' }} />}
                title="Creative Economy"
                desc="Monetization based on creativity—not monopolies."
                ml={5}
                index={3}
              />
              <FeatureItem
                icon={<GroupIcon sx={{ color: 'white' }} />}
                title="Inclusive Platform"
                desc="A global system for all believers in creative freedom."
                ml={10}
                index={4}
              />
            </Box>
          </Grid>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "end", alignItems: "center" }}>
          <AnimatedRotatedGrid />
        </Box>
      </Box>
    </>
  );
};

export default VisionMission;