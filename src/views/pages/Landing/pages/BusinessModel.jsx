import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import Table from '../components/ui/Table'
import { motion } from "framer-motion";
import TokenSection from './TokenSection';
import BusinessModelSection from "./BusinessModelSection";


const BusinessModel = () => {
  return (<>
    <Box sx={{
      background: (theme) => theme.custom.CarBackGround,
    }}>
      <Box sx={{position:"relative" ,display:"flex",justifyContent:"center"}}>

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

       


       

      </Box>
      <TokenSection/>
      <Table/>
      <BusinessModelSection/>
     
    </Box>
  </>
  )
}

export default BusinessModel
