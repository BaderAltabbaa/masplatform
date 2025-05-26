import { Box, Typography ,Button } from "@mui/material/";
import React from "react";
import Page from "src/component/Page";
import { ArrowForward } from '@mui/icons-material';
import { motion } from "framer-motion";


import { Link, useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Page  title="404 Not Found">
      <Box p={9} align="center" sx={{background:(theme) => theme.custom.PageBackGround ,display:"flex" ,flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <Link to="/">
          <img src="/images/E404.png" width={"500px"}/> <br />
        </Link>
         <Button
               component={motion.button}
          animate={{
        scale: [1, 1.1, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
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
                    background: (theme) => theme.custom.gradientButton,
                    "&:hover":{
                    background: (theme) => theme.custom.hoverGradientButton,

                    }
                  }}
                  onClick={() => {navigate("/")}}
                >
                  Go To Home Page
                </Button>
      </Box>
    </Page>
  );
}
