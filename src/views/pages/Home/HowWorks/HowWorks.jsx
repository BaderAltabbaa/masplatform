import React, { useEffect, useState } from "react";
import Typography from '../../../../component/ui/typography/typography';
import './HowWorks.css';
import axios from "axios";
import Apiconfigs from '../../../../Apiconfig/Apiconfigs';

const HowWorks = () => {
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
        setSectionData(res.data.result[0]);
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
    <div className='HowWorks'>
      <div className="HowWorks-content">
        <Typography className='headTitle'>{sectionData.title}</Typography>
        <h2 className="HowWorks-subtitle">{sectionData.description}</h2>
        {sectionData.contents.map((content, index) => (
          <React.Fragment key={index}>
            <h2 className="HowWorks-section-title">{content.heading}</h2>
            <p className="HowWorks-text">{content.contentDescription}</p>
          </React.Fragment>
        ))}
      </div>
      <div className="HowWorks-image-container">
        <img 
          src={'assets/Images/25.webp'} 
          alt={"How it works"} 
          className="HowWorks-image" 
        />
      </div>
    </div>
  );
};

export default HowWorks;