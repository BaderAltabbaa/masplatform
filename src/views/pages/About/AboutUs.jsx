import "./AboutUs.css";
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Typography ,Box,useMediaQuery ,useTheme , Card, CardContent,Grid,Collapse, } from "@mui/material";
import UniqueFeatures from "./UniqueFeatures";
import MarketplaceCarousel from "./MarketplaceCarousel";
import TechnicalInfrastructure from "./TechnicalInfrastructure";
import DigitalEcosystem from "./DigitalEcosystem";
import MembershipTiers from "./MembershipTiers";
import Roadmap from "./Roadmap";
import WhyMasNow from "./WhyMasNow";
import FinalCTA from "./FinalCTA";
import { motion, AnimatePresence } from 'framer-motion';
import VisionMission from "./VisionMission";



export default function AboutUs() {
    const { t } = useTranslation(); 
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { ref: ref1, inView: inView1 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
    });

   const [ref2, inView2] = useInView({ threshold: 0.1, triggerOnce: true });

   


  const content = [
    {
      text: "In an era defined by accelerating digitization and the intersection of commerce, knowledge, and creativity, MAS was born as an advanced digital platform, pulsing with innovation and powered by blockchain. MAS is not just a tech project—it is a response to a profound global need: a space that empowers content creators, innovators, businesses, educational institutions, and charities, giving them the wings to thrive in a secure and decentralized digital ecosystem.",
      image: "/assets/Images/masfooter-logo1.svg"
    },
    {
      text: "We don't offer a single service; we're building a smart, integrated digital ecosystem that unites commerce with creativity, education with financial transactions, and services with real experiences—all through a unified, flexible, and seamless interface. No traditional intermediaries. Minimal cost.",
      image: "/assets/Images/logopurple.svg"
    },
    {
      text: "Because the future doesn't wait, MAS bridges the familiar world of Web2 and the decentralized universe of Web3. We provide traditional internet users with a welcoming and intuitive gateway to the digital industries of tomorrow. With a user-friendly experience and familiar design, we open the doors of the new economy to millions—allowing them to become active participants in this global transformation without technical or knowledge barriers."
      , image: "/assets/Images/logolight.svg"
    },];


     useEffect(() => {
    if (isHovered || !inView2) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, inView2, content.length]);

    return (
        <>
            <Box sx={{background: (theme) => theme.custom.PageBackGround}}>
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"25px", overflow: "hidden"}} className="bunner-animaton">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <img 
                            src="/assets/Images/wave20.png" 
                            alt="Description" 
                            style={{ display: 'flex', maxHeight:"120px" }}
                        />
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            color: 'white',
                            fontSize: '2.5rem',
                            fontWeight:"bold",
                            textShadow:"0px 0px 10px white",
                        }}>
                            About Us
                        </div>
                    </div>
                </div>

<Box p={2}>
                 <Box className="who-we-are-sec" 
                 sx={{background:(theme) => theme.custom.CarBackGround,
                 mx:"auto",
                 maxWidth:1400,
                 p:4,
                 borderRadius:5,
                 boxShadow:10,
                 }}>
      <div 
        className={`who-top-sec ${inView2 ? 'animate' : ''}`} 
        ref={ref2}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="who-title">WHO WE ARE</span>
        
        <AnimatePresence mode='wait'>
          <motion.span
            key={currentIndex}
            className="who-text2"
            style={{ maxWidth: "700px", color: "white", display: "block" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {content[currentIndex].text}
          </motion.span>
        </AnimatePresence>

        <Link to="/login"> 
          <button className="learn-btn">Learn More</button>
        </Link>
      </div>
      
      <div style={{
        width:"100%",
        maxWidth:"450px",
        height:"100%",
        maxHeight:"300px",
        objectFit:"fill",
      }}>
        <AnimatePresence mode='wait'>
          <motion.img
            key={currentIndex}
            src={content[currentIndex].image}
            alt="Description visual"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{width:"100%"  ,maxWidth:"450px",
        height:"100%",
        maxHeight:"250px",
    }}
            
          />
        </AnimatePresence>
      </div>
    </Box>
    </Box>

                <VisionMission/>
                <UniqueFeatures/>    
                <MarketplaceCarousel/>
                <TechnicalInfrastructure/>
                <DigitalEcosystem/>
                <MembershipTiers/>
                <Roadmap/>
                <WhyMasNow/>
                <FinalCTA/>


               
            </Box>
        </>
    )
}