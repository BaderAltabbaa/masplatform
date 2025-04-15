import React from 'react'
import { Typography ,Box} from '@mui/material'

const Services = () => {
  return (
<>
<Box
 display='flex' 
 justifyContent='center' 
 flexWrap='wrap'
 sx={{
   background: "linear-gradient(to top right,#75017b,#3a013d)",
   margin: { xs: '10px', sm: '20px' },
   borderRadius: "50px", 
   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
   overflow: "hidden",
   paddingTop: '10px', // Reduced padding
   gap: '10px', // Consistent gap between items
   width: 'fit-content', // Makes container shrink to fit content
   maxWidth: '100%' // Ensures it doesn't overflow viewport
 }}>
<div className="Solution-text-content">
        <Typography variant='h2' color='white' m={1}>Services </Typography>
     
        
          <p className="" style={{ 
color:"white",
marginBottom:"30px"
          }}>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

          </p>
       
      </div>


      <div className="Service-image-container">
      {/* <img src={contentFile} alt="" /> */}
      </div>
      </Box>
</>
  )
}

export default Services