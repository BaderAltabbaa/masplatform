import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const CountUpTimer = () => {
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed((prevTime) => calculateNewTime(prevTime));
    }, 1000);

    return () => clearInterval(timer); 
  }, []);

  function calculateNewTime(prevTime) {
    let { days, hours, minutes, seconds } = prevTime;

    seconds += 1;
    if (seconds >= 60) {
      seconds = 0;
      minutes += 1;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours += 1;
    }
    if (hours >= 24) {
      hours = 0;
      days += 1;
    }

    return { days, hours, minutes, seconds };
  }

  return (
    <Box sx={{display:{xs:"grid",md:"flex"},gridTemplateColumns:"1fr 1fr" ,gap:3,m:2}}>
      <Box sx={{background: (theme) => theme.custom.gradientButton, px:5,py:0.5,borderRadius:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.days}</Typography>
        <Typography className="text-white">Days</Typography>
      </Box>
      <Box sx={{background: (theme) => theme.custom.gradientButton, px:5,py:0.5,borderRadius:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.hours}</Typography>
        <Typography className="text-white">Hours</Typography>
      </Box>
      <Box sx={{background: (theme) => theme.custom.gradientButton, px:5,py:0.5,borderRadius:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography  variant="h5" className="text-white text-xl">{timeElapsed.minutes}</Typography>
        <Typography className="text-white">Minutes</Typography>
      </Box>
      <Box sx={{background: (theme) => theme.custom.gradientButton, px:5,py:0.5,borderRadius:2,display:"flex",flexDirection:"column",alignItems:"center"}}>
        <Typography variant="h5" className="text-white text-xl">{timeElapsed.seconds}</Typography>
        <Typography className="text-white">Seconds</Typography>
      </Box>
    </Box>
  );
};

export default CountUpTimer;

