import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from '@mui/material';

const CookieConsent = () => {
  const [cookies, setCookie] = useCookies(['cookie_consent']);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Only show popup if cookie consent hasn't been given
    if (!cookies.cookie_consent) {
      setOpen(true);
    }
  }, [cookies.cookie_consent]);

  const handleAccept = () => {
    setCookie('cookie_consent', 'accepted', { 
      path: '/', 
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: 'strict'
    });
    setOpen(false);
  };

  const handleDecline = () => {
    setCookie('cookie_consent', 'declined', { 
      path: '/', 
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: 'strict'
    });
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      disableScrollLock={true} // This prevents scroll locking
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        sx: {
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          margin: 0,
          borderRadius: 0,
          backgroundImage: 'url(/assets/Images/doodle2.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          '@media (min-width: 600px)': {
            bottom: 20,
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
            borderRadius: 2,
          }
        }
      }}
    >
      <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color="#43005e" fontSize='24px'>Cookie Consent</DialogTitle>
     <Box sx={{
                      background:"rgba(255, 255, 255, 0.68)",
                      padding:"5px",
                      borderRadius:"20px"
                    }}>
      <DialogContent>
        <Typography variant="body1" paragraph>
          We use cookies to enhance your experience on our website. 
          By clicking "Accept", you agree to our use of cookies.
        </Typography>
        <Typography variant="body2" color="text.secondary">
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDecline} color="secondary"  sx={{color: " #43005e" }}>
          Decline
        </Button>
        <Button onClick={handleAccept} variant="contained" color="primary"  sx={{
                  background: "#43005e",
                  "&:hover": {
                    background: "#320046"
                  },
                  "&:disabled": {
                    background: "#e0e0e0",
                    color: "#9e9e9e"
                  }
                }}>
          Accept
        </Button>
      </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CookieConsent;