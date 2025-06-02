import React from 'react'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.png'
import { Typography ,Box } from '@mui/material'
import Table from '../components/ui/Table'
import { motion } from "framer-motion";



const BusinessModel = () => {
  return (
    <Box className='min-h-screen text-white relative text-center flex justify-center' sx={{background: (theme) => theme.custom.CarBackGround,
    }}>
      
      <motion.div  
         animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 360],
          borderRadius: [ "50%", "50%",],
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
            <Typography  variant={"h5"} className='text-white' sx={{fontSize:"25px"}}>Business Model</Typography>
        </div>
      
        </motion.div>
    
      <div className='w-[500px]  h-[500px] rounded-b-full clip-path-half-circle border-[#8033a1] border-4 text-center flex items-center justify-center absolute top-[-280px]  '>
        
      </div>
    

      <Table className="mt-40 over" />
    </Box>
  )
}

export default BusinessModel
