import {
  Box,
  Container,
  Dialog,
  IconButton,
  Grid,
  Typography,
 
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "src/context/User";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import Loader from "src/component/Loader";
import { toast } from "react-toastify";
import ReactPlayer from "react-player";
import CloseIcon from '@mui/icons-material/Close';
import { color } from 'framer-motion';
import { transform } from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: { background:"linear-gradient(to right, #280026,rgb(142, 82, 146))"
  },


}));

const currencies = [
  {
    value: "PUBLIC",
    label: "PUBLIC",
  },
  {
    value: "PRIVATE",
    label: "PRIVATE",
  },
];
export default function itemDetails() {
  const navigate = useNavigate();
  const auth = useContext(UserContext);
  const location = useLocation();
  const classes = useStyles();
  const isLogin = !!sessionStorage.getItem("token");
  const [selectedFilter, setSelectedFilter] = useState({
    startDate: "",
    endDate: "",
    searchKey: "",
    type: "",
  });

  const [itemDetails, setitemDetails] = useState({});
  const [isVideo, setIsVideo] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [isLoadingBunldeView, setIsLoadingItemView] = useState(false);
  const [isLoadingConetent, setIsLoadingContent] = useState(false);
  const [isFilterTrue, setIsFilterTrue] = useState(false);
  const [bunfleId, setItemId] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const _onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const temp = { ...selectedFilter, [name]: value };
    setSelectedFilter(temp);
  };
  const clearFilterHandler = () => {
    setSelectedFilter({
      startDate: "",
      endDate: "",
      searchKey: "",
      type: "",
    });
    getItemContentListHandler(itemDetails?._id);
    setIsFilterTrue(false);
  };
  const getitemDetailsHandler = async (id) => {
    try {
      setIsLoadingItemView(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.mynft1 + id,
      });
      if (res.data.statusCode === 200) {
        console.log("responseItemDeatils-----", res.data.result);
        setitemDetails(res.data.result);
        getItemContentListHandler(res.data.result._id);
        setIsLoadingItemView(false);
        const filterFunForCurrentSubscriber =
          res.data.result.subscribers?.filter((value) => {
            return value === auth?.userData?._id;
          });
        console.log("responseFilter---->>>", filterFunForCurrentSubscriber);
        if (filterFunForCurrentSubscriber[0]) {
          setIsSubscribed(true);
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoadingItemView(false);
    }
  };
  const getItemContentListHandler = async (ItemId) => {
    try {
      setContentList([]);
      setIsLoadingContent(true);
      const res = await axios({
        method: "GET",
        url: Apiconfigs.ItemContentList,
        params: {
          nftId: ItemId,
          search: selectedFilter.searchKey ? selectedFilter.searchKey : null,
          fromDate: selectedFilter.startDate ? selectedFilter.startDate : null,
          toDate: selectedFilter.endDate ? selectedFilter.endDate : null,
        },
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
      if (res.data.statusCode === 200) {
        console.log("response--list---", res.data.result.docs);
        setContentList(res.data.result.docs);
        setIsLoadingContent(false);
        setIsFilterTrue(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingContent(false);
    }
  };
  useEffect(() => {
    const ItemId = location.search.split("?");
    if (ItemId[1]) {
      getitemDetailsHandler(ItemId[1]);
      setItemId(ItemId[1]);
    }
  }, [location]);
  useEffect(() => {
    if (
      selectedFilter.startDate !== "" ||
      selectedFilter.endDate !== "" ||
      selectedFilter.searchKey !== "" ||
      selectedFilter.type !== ""
    ) {
      if (isFilterTrue) {
        getItemContentListHandler(itemDetails?._id);
      }
    }
  }, [selectedFilter, isFilterTrue]);

  useEffect(() => {
    if (itemDetails.mediaUrl) {
      setIsVideo(handleVideo(itemDetails.mediaUrl));
    }
  }, [itemDetails]);
  const subscribeNowHandler = async (isCheck) => {
    // if (parseFloat(auth?.userData?.masBalance) > 0) {
    setIsloading(true);
    await axios({
      method: "GET",
      url: Apiconfigs.subscribeNow + bunfleId,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          auth.updateUserData();
          toast.success("You have subscribed successfully");
          getitemDetailsHandler(bunfleId);
          // if (callbackFn) {
          //   callbackFn()
          // }
        }
      })
      .catch((err) => {
        setIsloading(false);
        console.log(err.message);
        toast.error(err?.response?.data?.responseMessage);
      });
    // } else {
    //   toast.error('Your wallet balance is insufficient')
    // }

    // } else {
    //   toast.error("Balance is low");
    //   setIsloading(false);
    // }
  };
  const unSubscribeNowHandler = async () => {
    // const coinDetails = getCoinkDetails(data.coinName)
    setIsloading(true);
    await axios({
      method: "DELETE",
      url: Apiconfigs.unSubscription + bunfleId,
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsloading(false);
        if (res.data.statusCode === 200) {
          setIsloading(false);
          auth.updateUserData();
          setIsSubscribed(false);
          toast.success("You have unsubscribed successfully.");
          getitemDetailsHandler(bunfleId);
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };
  const handleClickOpen = (imgUrl) => {
    setCurrentImg(imgUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <Box className={classes.root}>
    <Box>
      {isLoadingBunldeView ? (
        <Loader />
      ) : (
        <Container maxWidth="lg">
          <Box
            style={{ background: "url(/images/banner1.png)" }}
          ></Box>

          
          <Box sx={{display:"flex", alignItems:"center",padding:"20px", justifyContent:"space-between" , 
          "@media(max-width:750px)":{flexDirection:"column"
          }}}>

            <Box sx={{display:"flex" ,padding:"20px" ,alignItems:"center"}}>
              {isVideo ? (
                
                  <Box  sx={{width:"100%" ,height:"200px" ,border:"2px solid white", borderRadius:"20px"}}>
                    <ReactPlayer
                      url={itemDetails?.mediaUrl1}
                      playing
                      controls
                      width={"100%"}
                      height={"100%"}
                    />
                  </Box>
            
              ) : (
                <Box sx={{width:"200px" ,height:"200px" ,border:"2px solid white", borderRadius:"20px",}}
                  //style={{ background: `url(${itemDetails?.mediaUrl})` }}
                 
                >
                  <img
                    src={itemDetails?.mediaUrl1}
                    style={{ width: "100%", height: "100%", borderRadius:"20px"}}
                  />
                </Box>
              )}
              
        <Box sx={{display:"flex" ,flexDirection:"column" ,alignContent:"center",padding:"20px"}}>
               
                <Typography variant="h2" sx={{color:"white" ,fontSize:"2rem",
                   "@media(max-width:750px)":{
                    fontSize:"1.4rem"
                   }
                }}>
                  {itemDetails?.itemName ? itemDetails?.itemName : ""}
                </Typography>
                
                <Box display="flex"
                    alignItems="center">
                <Typography variant="h5" sx={{color:"grey" ,fontSize:"1.2rem",
                   "@media(max-width:750px)":{
                    fontSize:"0.8rem"
                   }
                }}>Details:</Typography>&nbsp;
              
                 <Typography variant="h5" sx={{color:"grey",fontSize:"1.2rem",
                   "@media(max-width:750px)":{
                    fontSize:"0.8rem"
                   }
                 }}>
                  {itemDetails?.details ? itemDetails?.details : ''}
                </Typography> 
                </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                  >
                    <Typography variant="h5" sx={{color:"grey"}}>Price:</Typography>&nbsp;
                    <Typography variant="h5" sx={{color:"grey"}}>
                      {itemDetails?.donationAmount
                        ? itemDetails?.donationAmount
                        : "0"}
                      {itemDetails.coinName}
                    </Typography>
                  </Box>
               
              </Box>
              </Box>
            
            <Box >
              <Box
                onClick={() => setOpenBuy(true)}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                sx={{padding:"15px", background: "rgba(255, 255, 255, 0.3)", borderRadius:"20px",    backdropFilter: "blur(24px)",
                    "@media(max-width:750px)":{
                      padding:"10px 100px",
                      marginTop:"20px"
                    }
                }}
              >
                <Typography variant="h2" sx={{color:"white"}}>
                  {itemDetails?.subscribers
                    ? itemDetails?.subscribers?.length
                    : "0"}
                </Typography>
                <Typography variant="h5" sx={{color:"white"}}>buyers</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      )}
    </Box>

    <Box 
     sx={{
      display: "grid",
      gridTemplateColumns: {
        xs: "repeat(1, 1fr)", // 1 column on small screens
        sm: "repeat(2, 1fr)", // 2 columns on medium screens
        md: "repeat(3, 1fr)", // 3 columns on large screens
      },
      gap: "20px", // Spacing between grid items
      padding: "40px",
    }}>
    {Array.from({ length: 9 }).map((_, index) => {
  const mediaUrl = itemDetails?.[`mediaUrl${index + 1}`];

  // Skip rendering if mediaUrl is not available
  if (!mediaUrl) {
    return null; // Or render a placeholder
  }

  return (
    <Box
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden", // Ensure images don't overflow
        borderRadius: "30px",
        
      }}
    >
      <img
        src={mediaUrl}
        alt={`Item Image ${index + 1}`}
        style={{
          width: "100%",
                height: "300px",
                objectFit: "cover", // Ensure images scale properly
                borderRadius: "30px",
                cursor: "pointer",
                objectFit:"fill",
                border:"2px solid white",
               
        }}
        onClick={() => handleClickOpen(mediaUrl)}
        onError={(e) => (e.target.src = "defaultImage.png")} // Fallback for broken images
      />
    </Box>
  );
})}
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="image-dialog-title"
    aria-describedby="image-dialog-description"
  >
    <IconButton onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px' }}>
      <CloseIcon />
    </IconButton>
    <img src={currentImg} alt="Enlarged view" style={{ width: '100%', height: 'auto' }} />
  </Dialog>
</Box>
</Box>  </>
  );

  function handleVideo(url) {
    const videoFormats = [
      "mp4",
      "avi",
      "wmv",
      "mov",
      "mkv",
      "flv",
      "webm",
      "mpeg",
      "3gp",
      "ogv",
    ];
    const format = url.split(".").slice(-1)[0];
    return videoFormats.includes(format);
  }
}
