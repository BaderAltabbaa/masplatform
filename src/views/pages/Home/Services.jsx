import React from 'react'
import { Typography ,Box ,Container} from '@mui/material'
import "src/views/pages/Home/HowWorks/HowWorks.css"

const Services = () => {
  return (
<>
<Container  maxWidth="xl">
<Box display="flex" justifyContent="center" alignItems="center">
<Box
 display='flex' 
 flexDirection='row'
 flexWrap='wrap'
 justifyContent='space-between'
 sx={{
   background: "linear-gradient(to top right,#75017b,#3a013d)",
   marginTop: { xs: '10px', sm: '20px' },
   borderRadius: "50px", 
   boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
   overflow: "hidden",
   paddingTop: '0px', 
   gap: '10px', 
  position:"relative",
   width: '100%', 
 }}>
            <Box padding="20px">
          <Box textAlign="center">
        <Typography  sx={{
         fontSize:"25px",
         color:"white",
         fontWeight:"bold",
         textShadow:"0px 0px 10px white"
        }}
         m={2}>MAS PLATFORM Services </Typography>
        </Box>

        <Box textAlign="left" mb={2} ml={1}>
        <Typography variant='h4' color='white'>Digital & Physical Marketplace</Typography>
        <Typography  color='white'>Buy & sell products or services using crypto (MAS, USDT, USDC)—fast, secure, and borderless.</Typography>
        </Box>

        <Box textAlign="left" mb={2} ml={1}>
        <Typography variant='h4' color='white'>Creator Economy Tools</Typography>
        <Typography  color='white'>Monetize content (videos, courses) and receive transparent donations via Proof of Donation (PoD).</Typography>
        </Box>

        <Box textAlign="left" mb={2} ml={1}>
        <Typography variant='h4' color='white'>Financial Services</Typography>
        <Typography  color='white'>Low-cost global remittances, auctions, and B2B crypto integrations.</Typography>
        </Box>

        <Box textAlign="left" mb={2} ml={1}>
        <Typography variant='h4' color='white'>RWA (Real World Assets)</Typography>
        <Typography  color='white'>Tokenize and trade real-world assets (property, art, commodities) on-chain for liquidity & accessibility.</Typography>
        </Box>
         
       
  

        </Box>
      <div className="service-image-container">
      <img src={'assets/Images/22.jpg'} alt="How Works" className="service-image" />
      </div>
      </Box>
      </Box>
      </Container>
</>
  )
}

export default Services