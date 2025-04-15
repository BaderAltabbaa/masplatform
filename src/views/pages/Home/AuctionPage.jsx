import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { useNavigate ,Link } from "react-router";
import "./style.css";
import SectionCard from "../../../component/ui/sectionCard/SectionCard";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import NFTSection from './NFT/NFTSection'
import { create } from "lodash";
import MostPopular from "./MostPopular";
import { useTranslation } from 'react-i18next';
import Cardbundle from "../../../component/ui/Card/Cardbundle";
import Services from "./Services";


const AuctionPage = ({ staticSections }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [auctionList, setAuctionList] = useState([]);
  const [allNFTList, setAllNFTList] = useState([]);
  const [allNFT1List, setAllNFT1List] = useState([]);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isLoadingAuctions, setIsLaodingAuctions] = useState(false);
    const {t} = useTranslation();
  


  useEffect(() => {
    auctionNftListHandler().catch(console.error);
    listAllNftHandler().catch(console.error);
    listAllNft1Handler().catch(console.error);
    getuser().catch(console.error);
    let resize = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 500);
    return () => clearTimeout(resize);
  }, []);

 
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(getWindowSize());
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

 const Categories = [
  {name:t("Art"),
   image:"/assets/Images/15.jpg"
  },
  {name:t("Sports"),
    image:"/assets/Images/14.jpg"
   },
   {name:t("Collectors"),
    image:"/assets/Images/5.jpg"
   },
   {name:t("Fashion"),
    image:"/assets/Images/17.jpg"
   },
   {name:t("Video"),
    image:"/assets/Images/22.jpg"
   },
   {name:t("Music"),
    image:"/assets/Images/1.jpg"
   },
   {name:t("Cars"),
    image:"/assets/Images/4.jpg"
   },
   {name:t("Coding"),
    image:"/assets/Images/6.jpg"
   },
   {name:t("Crypto"),
    image:"/assets/Images/7.jpg"
   },
   {name:t("Education"),
    image:"/assets/Images/2.jpg"
   },
   {name:t("Trading"),
    image:"/assets/Images/22.jpg"
   },
   {name:t("Analytics"),
    image:"/assets/Images/1.jpg"
   },
   {name:t("News"),
    image:"/assets/Images/5.jpg"
   },
   {name:t("Gaming"),
    image:"/assets/Images/6.jpg"
   },
   {name:t("Privacy"),
    image:"/assets/Images/7.jpg"
   },
   {name:t("Startups"),
    image:"/assets/Images/8.jpg"
   },
   {name:t("Web3"),
    image:"/assets/Images/10.jpg"
   },
   {name:t("Security"),
    image:"/assets/Images/11.jpg"
   },
   {name:t("Wallets"),
    image:"/assets/Images/12.jpg"
   },
   {name:t("Metaverse"),
    image:"/assets/Images/13.jpg"
   },
 ]

  return (
    <>
       
       {ServicesSection()}
       <Services/>
      {CreatorsSection()}
      {BundlesSection()}
      {ItemsSection()}
      {NFTsection()}
      <MostPopular/>
      {popularCategory()}
    </>
  );

  function NFTsection() {
    const item = staticSections.find((i) => i?.title === "NFT");

    return (
      <Box>
     <NFTSection /> 
      
     </Box> 
    );
  }

  function BundlesSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Link to={"/bundles"}  style={{ textDecoration: "none", outline: "none" }}> <ButtonwithAnimation  >{t("Bundles")}</ButtonwithAnimation></Link>
    
    </div>


  {allNFTList.length !=0 && 
  <SectionCard   
  data={allNFTList}
  CardpersonalInfo
  Bundles
  
 
    
    /> 
  }
    
    </>
     
    );
  }

  function ServicesSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
    <>
      <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }} >
      <Link to={"/bundles"}  style={{ textDecoration: "none", outline: "none" }}> <ButtonwithAnimation  >{t("Our Services")}</ButtonwithAnimation></Link>
    
    </div>
    <Box display="flex" justifyContent="center" alignItems='center' mb={3}>
    <Box 
  display='flex' 
  justifyContent='center' 
  flexWrap='wrap'
  sx={{
    background: "linear-gradient(to top right,#900098,#4d0051)",
    margin: { xs: '10px', sm: '20px' },
    borderRadius: "30px", 
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
    overflow: "hidden",
    padding: '10px', // Reduced padding
    gap: '10px', // Consistent gap between items
    width: 'fit-content', // Makes container shrink to fit content
    maxWidth: '100%' // Ensures it doesn't overflow viewport
  }}
>
  {[
    { img: "/assets/Images/13.jpg", text: t("Creators") },
    { img: "/assets/Images/1.jpg", text: t("Bundles") },
    { img: "/assets/Images/18.jpg", text: t("MarketPlace") },
    { img: "/assets/Images/22.jpg", text: t("Education") },
    { img: "/assets/Images/14.jpg", text: t("Transfer")}
  ].map((item, index) => (
    <Link to='/creators' key={index}>
      <Box sx={{ 
        position: 'relative', 
        display: 'inline-block',
        margin: '10px',
        width: { xs: '150px', sm: '200px', md: '230px' },
        height: { xs: '200px', sm: '280px', md: '300px' },
        "&:hover": {
          transform: "scale(1.04)",
          transition: "ease-out 0.3s" // Reduced for better UX
        }
      }}>
        <img 
          src={item.img} 
          alt={item.text} 
          style={{
            width: "100%", 
            height: "100%", 
            borderRadius: '30px',
            display: 'block',
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            objectFit: 'cover' // Ensures images maintain aspect ratio
          }}
        />
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: { xs: '20px', sm: '26px', md: '32px' },
          fontWeight: "bold",
          textShadow: "3px 3px 5px rgba(0,0,0,0.6)",
          textAlign: 'center',
          width: '100%' // Ensures text stays centered
        }}>
          {item.text}
        </Box>
      </Box>
    </Link>
  ))}
</Box>

</Box>
    
    </>
     
    );
  }
  function ItemsSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
  <>
  
  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <Link to={"/items"}  style={{ textDecoration: "none", outline: "none" }}>  <ButtonwithAnimation> {t("Marketplace")}</ButtonwithAnimation></Link>
    
     </div>
      {allNFT1List.length !=0 && 
          (<SectionCard   
          data={allNFT1List}
          CardpersonalInfo
          
          Marketplace
          
         
            
            /> )
     
      }
  </>
     
    );
  }

  function CreatorsSection() {
    const item = staticSections.find((i) => i?.title === "Users");
    console.log("creator",item)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Link to={"/creators"}  style={{ textDecoration: "none", outline: "none" }}>   <ButtonwithAnimation> {t("Creators")}</ButtonwithAnimation></Link>
          
          </div>

        {userListToDisplay.length !=0 && 
        <SectionCard   
        data={userListToDisplay}
        chat
        Creators
       
          Subscribe
          />
        }  
      
      </>
     
    );
  }


  {/*  */}
  function popularCategory() {
    return(
      <Box sx={{padding:"30px 150px", 
        "@media(max-width:1200px)":{
padding:"30px 200px"
      }, "@media(max-width:800px)":{
        padding:"30px 100px"
      }
      }} display="flex" flexDirection="column" alignItems="center">
        <Typography align="center" variant="h1" color="white">{t("Popular Categories")}</Typography>
        <Box mt={2} sx={{ background:"linear-gradient(to top right,#900098,#4d0051)",
        boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.5)",
        borderRadius:"20px", 
        }}>
        
        <Box mt={1} sx={{ display: "grid",
        gridTemplateRows: "repeat(2, 150px)", // 2 rows, each 100px tall
        gridTemplateColumns: "repeat(10, 1fr)", // 10 columns, equal width
        gap: "10px", // Spacing between items
        padding: "10px",
        "@media(max-width:1200px)":{
          gridTemplateColumns: "repeat(9, 1fr)", 
        },
        "@media(max-width:1100px)":{
          gridTemplateColumns: "repeat(7, 1fr)", 
        },
        "@media(max-width:1000px)":{
          gridTemplateColumns: "repeat(6, 1fr)", 
        },
        "@media(max-width:900px)":{
          gridTemplateColumns: "repeat(5, 1fr)", 
        },
        "@media(max-width:800px)":{
          gridTemplateColumns: "repeat(4, 1fr)", 
        },
        "@media(max-width:700px)":{
          gridTemplateColumns: "repeat(3, 1fr)", 
        },
        "@media(max-width:600px)":{
          gridTemplateColumns: "repeat(2, 1fr)", 
        }
        
        }}>

    {Categories.map((category ,index) => (

<Box alignItems="center" display="flex" flexDirection="column" m={2} key={index} sx={{ "&:hover":{
            transform:"scale(1.1)",
            transition:"ease-out 500ms"
          }}}>
<img src={category.image} width="70px" height="70px" style={{objectFit:"cover" ,borderRadius:"50%",marginBottom:"10px",boxShadow:"2px 5px 10px rgba(0, 0, 0, 0.6)"}} />
  <Typography color="white" sx={{fontWeight:"bold"}}>{category.name}</Typography>
</Box>
    ))}

        </Box>
        </Box>
      </Box>
    )
  }

  async function auctionNftListHandler() {
    setIsLaodingAuctions(true);
    await axios({
      method: "GET",
      url: Apiconfigs.allorder,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result) {
            setAuctionList(res.data.result);
            setIsLaodingAuctions(false);
          }
        }
      })
      .catch((err) => {
        console.log(err.message);
        setIsLaodingAuctions(false);
      });
  }

  async function listAllNftHandler() {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
      params: {
        page: 1,
        limit: 10,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFTList(res.data.result.docs);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function listAllNft1Handler() {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft1,
      params: {
        page: 1,
        limit: 10,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFT1List(res.data.result.docs);
        }
      })
      .catch((err) => {
        //console.log(err.message);
      });
  }

  async function getuser() {
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      params: {
        limit: 10,
        userType: "Creator",
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setUserListToDisplay(res.data.result.docs);
          }
        }
      })
      .catch(() => {});
  }
};

export default AuctionPage;

const useStyles = makeStyles(() => ({
  mas: {
    textAlign: "center",
    fontFamily: "Poppins",
    fontSize: "32px",
    fontWeight: "700",
    fontStretch: "normal",
    fontStyle: "normal",
    lineHeight: "1.51",
    letterSpacing: "normal",
    texAlign: "left",
    color: "#141518",
    marginTop: "0px",
  },
  LoginBox: {},
  sectionHeading: {
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "0px",
  },
  box: {
    flexWrap: "inherit",
  },
  gridbox: {
    "@media(max-width:1280px)": {
      display: "flex",
      justifyContent: "center",
    },
  },
}));
