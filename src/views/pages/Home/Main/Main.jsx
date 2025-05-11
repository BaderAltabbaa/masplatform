import React, { useEffect, useState } from "react";
import AuctionPage from "../AuctionPage";
import BannerSection from "../BannerSection";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import LandingSection from "src/views/pages/Home/LandingSection/LandingSection";
import './Main.css'
import { Box } from "@mui/material";
import HowWorks from "../HowWorks/HowWorks";
import Solutions from "../Solutions/Solutions";
import Services from "../Services";
import { ButtonwithAnimation } from "../../../../component/ui/Button/button";
import { useTranslation } from 'react-i18next';
import DataLoading from "../../../../component/DataLoading";
import CookieConsent from "../../../../cookies/CookieConsent";
import RoadMap from "../RoadMap";
import CanDoMas from "../CanDoMas";



export default function Main() {
      const {t} = useTranslation();
    const [isLoading, setIsLoading] = useState(true);
  
  const [state, setState] = useState({
    bannerDetails: [],
    bannerDuration: undefined,
    landingSections: [],
    staticSections: []
  });
  const { bannerDuration, bannerDetails, landingSections, staticSections } = state;

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const getBannerContentHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.listBanner,
      });
      if (res.data.statusCode === 200) {
        updateState({ bannerDetails: res.data.result.docs });
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  const getBannerDuration = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.getBannerDuration,
      });
      if (res.data.statusCode === 200) {
        updateState({ bannerDuration: res.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getLandingPageSectionsHandler = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.landingContentList,
      });
      if (res.data.statusCode === 200) {
        updateState({ landingSections: res.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log("mm",landingSections)
  async function getStaticSections() {
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.staticSectionList,
      });
      if (res.data.statusCode === 200) {
        updateState({ staticSections: res.data.result });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBannerDuration().catch(console.error);
    getBannerContentHandler().catch(console.error);
    getLandingPageSectionsHandler().catch(console.error);
    getStaticSections().catch(console.error);
  }, []);

  useEffect(() => {
    console.log(bannerDuration);
  }, [bannerDuration]);


  
  return (
    <Box className="home" 
   
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
   
    >

{isLoading ? (<>

 <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
        <DataLoading />
        </Box>
</>) :  (<>



  <Box>
    <CookieConsent/>

{bannerDetails.length > 0 && (
  <BannerSection
    bannerDetails={bannerDetails}
    bannerDuration={bannerDuration}
  />
)}

<Services/>


<AuctionPage staticSections={staticSections}/>

</Box>
</>)}




    </Box>
  );
}
