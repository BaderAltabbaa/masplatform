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
import { Category } from "@mui/icons-material";


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

 const Categories = [
  {name:"Art",
   image:"/assets/Images/15.jpg"
  },
  {name:"Sports",
    image:"/assets/Images/14.jpg"
   },
   {name:"Collectors",
    image:"/assets/Images/5.jpg"
   },
   {name:"Fashion",
    image:"/assets/Images/17.jpg"
   },
   {name:"Video",
    image:"/assets/Images/22.jpg"
   },
   {name:"Music",
    image:"/assets/Images/1.jpg"
   },
   {name:"Cars",
    image:"/assets/Images/4.jpg"
   },
   {name:"Coding",
    image:"/assets/Images/6.jpg"
   },
   {name:"Crypto",
    image:"/assets/Images/7.jpg"
   },
 ]

  return (
    <>
       

      {CreatorsSection()}
      {BundlesSection()}
      {ItemsSection()}
      {NFTsection()}
      {popularCategory()}
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
    console.log("creator",item)
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

  function popularCategory() {
    return(
      <Box sx={{padding:"30px 150px", 
        "@media(max-width:1200px)":{
padding:"30px 200px"
      }, "@media(max-width:800px)":{
        padding:"30px 100px"
      }
      }} display="flex" flexDirection="column" alignItems="center">
        <Typography align="center" variant="h1" color="white">Popular Categories</Typography>
        <Box sx={{padding:"20px", background:"linear-gradient(to top right,#900098,#4d0051)"
        ,margin:"20px",borderRadius:"20px",width:"100%"
        ,display:"flex",alignItems:"center",
        justifyContent:"center",boxShadow:"0px 4px 8px rgba(0, 0, 0, 0.5)",
          "@media(max-width:1200px)":{
            display:"grid",
            gridTemplateColumns:"1fr 1fr 1fr"
          }, "@media(max-width:800px)":{
            gridTemplateColumns:"1fr 1fr"
          },
         
        }}>

    {Categories.map((category ,index) => (

<Box alignItems="center" display="flex" flexDirection="column" m={2} key={index} sx={{ "&:hover":{
            transform:"scale(1.1)"
          }}}>
<img src={category.image} width="70px" height="70px" style={{objectFit:"cover" ,borderRadius:"50%",marginBottom:"10px",boxShadow:"2px 5px 10px rgba(0, 0, 0, 0.6)"}} />
  <Typography color="white" sx={{fontWeight:"bold"}}>{category.name}</Typography>
</Box>
    ))}

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
