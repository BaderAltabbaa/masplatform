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


const AuctionPage = ({ staticSections }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [auctionList, setAuctionList] = useState([]);
  const [allNFTList, setAllNFTList] = useState([]);
  const [allNFT1List, setAllNFT1List] = useState([]);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
  const [isLoadingAuctions, setIsLaodingAuctions] = useState(false);


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

 

  return (
    <>
       

      {CreatorsSection()}
      {BundlesSection()}
      {ItemsSection()}
      {NFTsection()}
    </>
  );

  function NFTsection() {
    const item = staticSections.find((i) => i?.title === "NFT");

    return (
      <Box>
     <NFTSection /> 
      
     </Box>

      // <Container
      //   maxWidth="100%"
      //   style={{
      //     backgroundSize: "cover",
      //     backgroundImage: item?.background
      //       ? `url(${item?.background})`
      //       : "linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%)",
      //     height: "100%",
      //     display: item?.status === "ACTIVE" ? "block" : "none",
      //   }}
      // >
      //   <div id="auctions_section" className={classes.sectionHeading}>
      //     <Typography
      //       variant="h2"
      //       component="h2"
      //       onClick={() => navigate("/auctions")}
      //       style={{
      //         cursor: "pointer",
      //         margin: "20px auto",
      //         fontSize: "66px",
      //         color: "#fff",
      //       }}
      //     >
      //       NFT Auction
      //     </Typography>
      //   </div>
      //   {!isLoadingAuctions && auctionList.length === 0 ? (
      //     <Box
      //       align="center"
      //       style={{
      //         margin: "0px",
      //         display: "flex",
      //         justifyContent: "center",
      //         alignContent: "center",
      //         alignItems: "center",
      //         minHeight: "300px",
      //         mixBlendMode: "darken",
      //         backgroundImage: "url(/images/home/nft-comingsoon-bg.png)",
      //         backgroundSize: "cover",
      //         backgroundPosition: "50% 50%",
      //       }}
      //       mt={4}
      //       mb={5}
      //     >
      //       <Typography
      //         variant="h1"
      //         style={{
      //           color: "#fffa",
      //           textAlign: "center",
      //           fontSize: "10vw",
      //           textShadow: "rgb(81 13 29) 1px 1px 4px",
      //         }}
      //       >
      //         COMING SOON
      //       </Typography>
      //     </Box>
      //   ) : (
      //     ""
      //   )}
      // </Container>

      
     
    );
  }

  function BundlesSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <Link to={"/bundles"}  style={{ textDecoration: "none", outline: "none" }}> <ButtonwithAnimation  > Bundles</ButtonwithAnimation></Link>
    
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
  function ItemsSection() {
    const item = staticSections.find((i) => i?.title === "Bundles");
    return (
  <>
  
  <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
    <Link to={"/items"}  style={{ textDecoration: "none", outline: "none" }}>  <ButtonwithAnimation> Marketplace</ButtonwithAnimation></Link>
    
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
    console.log(item)
    return (
      <>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <Link to={"/creators"}  style={{ textDecoration: "none", outline: "none" }}>   <ButtonwithAnimation> Creator</ButtonwithAnimation></Link>
          
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
