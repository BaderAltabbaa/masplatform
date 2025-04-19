import React, { useEffect, useState } from "react";
import Typography from '../../../../component/ui/typography/typography';
import './Solutions.css'
import axios from "axios";
import Apiconfigs from '../../../../Apiconfig/Apiconfigs';

const Solutions = () => {

  const [sectionData, setSectionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLandingPageSectionsHandler = async () => {
    try {
      setLoading(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.landingContentList,
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
<div className="HowWorks">
<div className="HowWorks-content">
        <Typography component='headTitle'>{sectionData.title} </Typography>
        </div>


        
          <h2 className="HowWorks-section-title" style={{textAlign:"center" ,color:"white"}}> 
     {sectionData.description}
          </h2>
        
      


      <div className="HowWorks-image-container">
      <img 
          src={'assets/Images/15.jpg'} 
          alt={"How it works"} 
          className="HowWorks-image" 
        />     
         </div>
      </div>
</>
  )
}

export default Solutions
