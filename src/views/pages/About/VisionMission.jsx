import { Box, Grid, Typography, Card, Avatar, useTheme,Container } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import PublicIcon from '@mui/icons-material/Public';
import BoltIcon from '@mui/icons-material/Bolt';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import GroupIcon from '@mui/icons-material/Group';

const VisionMission = () => {
  const theme = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView]);

  const missionItems = [
    {
      title: "Empowerment with Web3",
      description: "Giving creators and startups tools for financial freedom.",
      icon: <EmojiObjectsIcon />,
    },
    {
      title: "Smart Ecosystem",
      description: "Smart contract-based ground for growth and trade.",
      icon: <BoltIcon />,
    },
    {
      title: "Global Access",
      description: "Expand to borderless markets with crypto payments.",
      icon: <PublicIcon />,
    },
    {
      title: "Creative Economy",
      description: "Monetization based on creativity—not monopolies.",
      icon: <MonetizationOnIcon />,
    },
    {
      title: "Inclusive Platform",
      description: "A global system for all believers in creative freedom.",
      icon: <GroupIcon />,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <Box sx={{
        py: 4,
      maxWidth: '1400px',
      mx: 'auto'
    }}>
   <Container maxWidth="xl" sx={{ py: 2 }}>
  <motion.div
    ref={ref}
    initial="hidden"
    animate={controls}
  >
    {/* Vision Section */}
    <Grid container justifyContent="center" sx={{ mb: 3 }}>
      <Grid item xs={12} md={10}>
        <motion.div >
          <Card
            sx={{
              p: 4,
              background: (theme) => theme.custom.secCardBackGround,
              color: 'white',
              borderRadius: 4,
              boxShadow: 6,
            }}
          >
            <Typography variant="h1" gutterBottom sx={{ fontWeight: 700 ,color:"white",textShadow:"0 0 12px white" }}>
              Our Vision
            </Typography>
            <Typography variant="h4" paragraph color='white'>
              To become the world’s leading digital platform—not as a technical intermediary, but as a bridge that connects creators with their audience and redefines the meaning of value in the digital age.
            </Typography>
            <Typography variant="h4" color='white'>
              We envision a future where talent is fairly rewarded, engagement is built on trust, and income is driven by creativity—not dominance or monopolization. MAS aspires to be a mirror of a new era—one built on transparency, speed, and openness.
            </Typography>
          </Card>
        </motion.div>
      </Grid>
    </Grid>

    {/* Mission Title */}
    <Typography
      variant="h1"
      align="center"
      gutterBottom
      sx={{ mb: 3, fontWeight: 700,color:"white",textShadow:"0 0 12px white" }}
    >
      Our Mission
    </Typography>

    {/* Mission Cards */}
    <Grid container spacing={4} justifyContent="center">
      {missionItems.map((item, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Card
              sx={{
                background: (theme) => theme.custom.CarBackGround,
                p:2,
                height: '100%',
                borderRadius: 3,
                boxShadow: 4,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: '0.3s ease',
              }}
            >
              <Avatar
                sx={{
                  background: (theme) => theme.custom.mainButton,
                  width: 40,
                  height: 40,
                  color:"white"
                }}
              >
                {item.icon}
              </Avatar>
              <Typography variant="h4" fontWeight={600} color='white'>
                {item.title}
              </Typography>
              <Typography variant="body2" color="white">
                {item.description}
              </Typography>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </motion.div>
</Container>
</Box>

  );
};

export default VisionMission;
