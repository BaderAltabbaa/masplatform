import React, { useEffect, useState } from "react";
import { Typography ,Box ,Container} from '@mui/material'
import axios from "axios";
import Apiconfigs from '../../../Apiconfig/Apiconfigs';
import "src/views/pages/Home/HowWorks/HowWorks.css"

const Services = () => {
  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLandingPageSectionsHandler = async () => {
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
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!sectionData) return null;



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
         m={2}>{sectionData.title.replace(/<\/?p>/gi, '')} </Typography>
        </Box>

        <Box textAlign="left" mb={2} ml={1}>
        <Typography  color='white'>{sectionData.description.replace(/<\/?p>/gi, '')}</Typography>
        <Typography  color='white'>
          <h2 className="HowWorks-subtitle">{sectionData.description.replace(/<\/?p>/gi, '',)}</h2>
                          {sectionData.contents.map((content, index) => (
                            <React.Fragment key={index}>
                              <h2 className="HowWorks-section-title">{content.heading}</h2>
                              <p className="HowWorks-text">{content.contentDescription}</p>
                            </React.Fragment>
                          ))}
        </Typography>
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