import React from 'react';
import { Box, Typography, Stack, Paper } from '@mui/material';
import { TimelineDot } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

const RoadMap = () => {
  const theme = useTheme();
  const milestones = [
    {
      period: "Q1–Q2 2026",
      title: "Beta Launch",
      description: "Token presale and platform beta release"
    },
    {
      period: "Q3 2026",
      title: "Marketplace Expansion",
      description: "Educator onboarding and feature upgrades"
    },
    {
      period: "Q4 2026",
      title: "Social Features",
      description: "Networking and matchmaking tools"
    },
    {
      period: "2027",
      title: "DAO Launch",
      description: "Governance and regional expansion"
    }
  ];

  return (
    <Box sx={{ maxWidth: 1300, mx: 'auto', px: { xs: 2, md: 4 }, py: 2, overflowX: 'auto'  , overflowY:"hidden"}}>
      <Typography variant="h3" component="h2" sx={{
        fontWeight: 'bold', textAlign: 'center', color: 'white', mb: 2,
        fontSize: { xs: '2rem', md: '2.5rem' }
      }}>
        Roadmap & Vision
      </Typography>

      <Typography variant="h5" component="h3" sx={{
        textAlign: 'center', mb: 6, color: 'white',
        fontSize: { xs: '1.2rem', md: '1.5rem' }
      }}>
        Our Journey — Built for the Future
      </Typography>

      <Stack 
        direction={{ xs: 'column', md: 'row' }} 
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          position: 'relative',
              background: (theme) => theme.custom.CarBackGround,
          padding: 2,
          borderRadius: 10,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          '&:before': {
            content: '""',
            position: 'absolute',
            top: { xs: 0, md: '50%' },
            left: 0,
            right: 0,
            height: { xs: '100%', md: 4 },
            width: { xs: 4, md: '100%' },
            bgcolor: (theme) => theme.custom.mainButton,
            mx: 'auto',
            zIndex: 0
          }
        }}
      >
        {milestones.map((milestone, index) => {
          const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

          return (
            <MotionPaper
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              elevation={3}
              sx={{
                p: 3,
                width: { xs: '100%', md: 240 },
                position: 'relative',
                zIndex: 1,
                background:"#b8b6b6",
                borderRadius: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)'
                }
              }}
            >
              <Box sx={{
                position: 'absolute',
                top: { xs: -12, md: '50%' },
                left: { xs: '50%', md: -12 },
                transform: { xs: 'translateX(-50%)', md: 'translateY(-50%)' },
                zIndex: 2
              }}>
                <TimelineDot  sx={{
                  width: 24,
                  height: 24,
                  boxShadow: theme.shadows[4],
                  backgroundColor: (theme) => theme.custom.mainButton,
                }} />
              </Box>
              <Typography variant="h6" component="h4" sx={{
                fontWeight: 600,
                color: (theme) => theme.custom.mainButton,
                mb: 1
              }}>
                {milestone.period}
              </Typography>
              <Typography variant="h5" component="h3" sx={{
                fontWeight: 700,
                mb: 1.5,
                color:(theme) => theme.custom.mainButton
              }}>
                {milestone.title}
              </Typography>
              <Typography variant="body1" sx={{ color: (theme) => theme.custom.mainButton }}>
                {milestone.description}
              </Typography>
            </MotionPaper>
          );
        })}
      </Stack>
    </Box>
  );
};

export default RoadMap;
