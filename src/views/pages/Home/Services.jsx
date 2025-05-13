import React, { useEffect, useState } from "react";
import { Typography ,Box ,Container} from '@mui/material'
import axios from "axios";
import Apiconfigs from '../../../Apiconfig/Apiconfigs';
import "src/views/pages/Home/HowWorks/HowWorks.css"
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";


const Services = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 {/* const getLandingPageSectionsHandler = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.landingContent1List,
      });
      if (res.data.statusCode === 200 && res.data.result.length > 0) {
        // Get only the first item (index 0) from the array
        setSectionData(res.data.result[1]);
      }
    } catch (error) {
      console.log(error);
      setError("Failed to load content");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLandingPageSectionsHandler();
  }, []);*/}


const AnimatedBox = ({ fromLeft = true, children }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0,
        x: fromLeft ? -100 : 100
      }}
      animate={{ 
        opacity: inView ? 1 : 0,
        x: inView ? 0 : (fromLeft ? -100 : 100)
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  );
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;



  return (
<>
<Container  maxWidth="xl">
<Box display="flex" justifyContent="center" alignItems="center">
   <AnimatedBox fromLeft={true}>
            <Box
              component={motion.div}
              animate={{
                scale: [1, 1.009, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
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
                position: "relative",
                width: '100%',
              }}>


              <Box padding="20px">
                <Box textAlign="center">
                  <Typography sx={{
                    fontSize: "25px",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0px 0px 10px white"
                  }}
                    m={2}>How MAS Works</Typography>
                </Box>

                <Box textAlign="center" mb={2} ml={1}>
                  <Typography variant="h3" color='white'>A Smarter Way to Support, Create, and Earn</Typography>




                </Box>

        <Box textAlign='left' display='flex' flexDirection='column' justifyContent='flex-start' alignItems='flex-start' color='white' gap='10px'>
          <h2 className="HowWorks-subtitle">1. Create Your Wallet-Linked Account: Seamless sign-up with MetaMask or Trust Wallet.</h2>
          <h2 className="HowWorks-subtitle">2. Choose a Role: Creator, Supporter, or Both.</h2>       
          <h2 className="HowWorks-subtitle">3. Donate, Sell, or Subscribe: Support creators through bundles, donations, or purchases.</h2>      
          <h2 className="HowWorks-subtitle">4. Earn and Track Everything Transparently: Every action is logged through Proof of Donation.</h2>   
          </Box>                 
       
  

        </Box>
        

        
      <div className="service-image-container">
      <img src={'assets/Images/22.jpg'} alt="How Works" className="service-image" />
      </div>
      </Box>
      </AnimatedBox>
      </Box>
      </Container>
</>
  )
}

export default Services