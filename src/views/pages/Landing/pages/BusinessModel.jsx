import React from 'react'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import Table from '../components/ui/Table'
import { motion } from "framer-motion";

const businessModelSections = [
  {
    content:
      "The main revenue source for the MAS platform will be a commission fee charged upon the contributions made by clients to MAS.",
  },
  {
    content:
      "The commission is extracted from MAS’ balances when they withdraw funds in order to exchange them for stable coins or fiat currency.",
  },
  {
    content:
      "The commission is calculated as a percentage of the withdrawal, based on the membership package that corresponds to each MAS, according to how many MAS tokens are in his account.",
  },
  {
    content:
      "There are 5 membership packages: basic, silver, gold, diamond and MAS plus. Commission percentage fees will vary according to the package.",
  },
];

const BusinessModel = () => {
  return (<>
    <Box sx={{
      background: (theme) => theme.custom.CarBackGround,
    }}>
      <Box className='min-h-screen text-white relative text-center flex justify-center' >

        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 360],
            borderRadius: ["50%", "50%",],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: 5,
            repeatDelay: 1,
          }}
          className='w-48  h-48 rounded-full bg-[#220021] text-center flex items-center justify-center absolute top-[-100px]  '

        >

          <div className='w-44 h-44 border-[#8033a1] border-4 rounded-full flex items-center justify-center'>
            <Typography variant={"h5"} className='text-white' sx={{ fontSize: "25px" }}>Business Model</Typography>
          </div>

        </motion.div>

        <div className='w-[500px]  h-[500px] rounded-b-full clip-path-half-circle border-[#8033a1] border-4 text-center flex items-center justify-center absolute top-[-280px]  '>

        </div>


        <Table className="mt-40 over" />

      </Box>
      <Box
        sx={{
          pb: 4,
          px: 2,
        }}
      >
        <Grid container spacing={3} justifyContent="center">
          {businessModelSections.map((section, index) => (
            <Grid item xs={12} md={8} key={index}>
              <Card
                sx={{
                  background: "linear-gradient(to right top, #6b2b99, #8438af, #9f45c6,#8c26ac,#bb46d6)",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: 5,
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ fontSize: "1.1rem" }}>
                    {section.content}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  </>
  )
}

export default BusinessModel
