import React, { useEffect, useState } from "react";
import LandingSection from '../LandingSection/LandingSection'
import Typography from '../../../../component/ui/typography/typography'
import './NFT.css'
import {  useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import axios from "axios";
import Apiconfigs from '../../../../Apiconfig/Apiconfigs';
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BsBox2 } from "react-icons/bs";

const NFTSection = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  

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
  }, []); */}

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  {/*if (!sectionData) return null;*/}

  return (
    <Box className='NFTSection'
     component={motion.div}
                      animate={{
                        scale: [1, 1.001, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}>
        <LandingSection >
        <div className="NFT-text-content">
        <Typography component='headTitle'>RWA</Typography>
       
     
        <p className="" style={{fontSize:"21px", marginBottom:"10px"}}>Real World Assets</p>
        
            <p className="" style={{ marginBottom: "10px" }}> Comming Soon..</p>

        

       
      </div>


      <div className="NFT-image-container">
      <img src={'assets/Images/24.png'} alt="" />
      </div>


        </LandingSection>
    
    </Box>
  )
}

export default NFTSection



