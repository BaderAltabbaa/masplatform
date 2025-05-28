import "./AboutUs.css";
import { useTranslation } from 'react-i18next';
import { Box,useMediaQuery ,useTheme  } from "@mui/material";
import UniqueFeatures from "./UniqueFeatures";
import MarketplaceCarousel from "./MarketplaceCarousel";
import TechnicalInfrastructure from "./TechnicalInfrastructure";
import DigitalEcosystem from "./DigitalEcosystem";
import MembershipTiers from "./MembershipTiers";
import Roadmap from "./Roadmap";
import WhyMasNow from "./WhyMasNow";
import FinalCTA from "./FinalCTA";
import VisionMission from "./VisionMission";
import CryptoBannerCarousel from "../Home/BannerSection";



export default function AboutUs() {
    const { t } = useTranslation(); 
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

   

 
   
 const cryptoBannerData = [
    {
      id: 1,
      title: "About Us",
      subtitle: "In an era defined by accelerating digitization and the intersection of commerce, knowledge, and creativity, MAS was born as an advanced digital platform, pulsing with innovation and powered by blockchain. ",
      cta: "",
      background: "/assets/Images/b3.webp",
      media: "/assets/Images/masfooter-logo1.svg",
      mediaType: "image",
      nav:""
    },
    {
      id: 2,
      title: "About Us",
      subtitle: "MAS is not just a tech project—it is a response to a profound global need: a space that empowers content creators, innovators, businesses, educational institutions, and charities, giving them the wings to thrive in a secure and decentralized digital ecosystem.",
      cta: "",
      background: "/assets/Images/b5.webp",
      media: "/assets/Images/masfooter-logo1.svg",
      mediaType: "image",
      nav:""
    },
    {
      id: 3,
      title: "About Us",
      subtitle: "We don’t offer a single service; we’re building a smart, integrated digital ecosystem that unites commerce with creativity, education with financial transactions, and services with real experiences",
      cta: "",
      background: "/assets/Images/b1.webp",
      media: "/assets/Images/bader-logo.svg",
      mediaType: "image",
     nav:""
    },
    {
      id: 4,
      title: "About Us",
      subtitle: "all through a unified, flexible, and seamless interface. No traditional intermediaries. Minimal cost.",
      cta: "",
      background: "/assets/Images/b5.webp",
      media: "/assets/Images/masfooter-logo1.svg",
      mediaType: "image",
     nav:""
    },
     {
      id: 5,
      title: "About Us",
      subtitle: "Because the future doesn’t wait, MAS bridges the familiar world of Web2 and the decentralized universe of Web3. ",
      cta: "",
      background: "/assets/Images/b3.webp",
      media: "/assets/Images/masfooter-logo1.svg",
      mediaType: "image",
     nav:""
    },

      {
      id: 6,
      title: "About Us",
      subtitle: "We provide traditional internet users with a welcoming and intuitive gateway to the digital industries of tomorrow. ",
      cta: "",
      background: "/assets/Images/b1.webp",
      media: "/assets/Images/bader-logo.svg",
      mediaType: "image",
     nav:""
    },
    {
      id: 7,
      title: "About Us",
      subtitle: "With a user-friendly experience and familiar design, we open the doors of the new economy to millions—allowing them to become active participants in this global transformation without technical or knowledge barriers.",
      cta: "",
      background: "/assets/Images/b5.webp",
      media: "/assets/Images/masfooter-logo1.svg",
      mediaType: "image",
     nav:""
    },
  ];

 


    

    return (
        <>
            <Box sx={{background: (theme) => theme.custom.PageBackGround}}>
              
                <CryptoBannerCarousel bannerData={cryptoBannerData} subtitleStyle={{
  fontSize:"1rem"  
}}
buttonDisplay={{display:"none"}}/>
                <VisionMission/>
                <DigitalEcosystem/>
                <UniqueFeatures/>    
                <MarketplaceCarousel/>
                <TechnicalInfrastructure/>
                
                <MembershipTiers/>
                <Roadmap/>
                <WhyMasNow/>
                <FinalCTA/>


               
            </Box>
        </>
    )
}