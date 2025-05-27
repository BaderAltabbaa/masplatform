import { FaHeart, FaComment } from "react-icons/fa"; // استيراد أيقونة النقاط الثلاثة
import "./cardComponent.css";
import Card  from "./Card";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import { Badge, Box, Button,   Input,CardActions,InputAdornment, CardMedia, Dialog, DialogContent, DialogContentText, Grid, IconButton, Menu, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { BsChat } from "react-icons/bs";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Apiconfigs, { pageURL } from "src/Apiconfig/Apiconfigs";
import ReactPlayer from "react-player";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { red } from "@mui/material//colors";
import { makeStyles } from '@mui/styles';
import { Link } from "react-router-dom";
import AddBundleDialog from "../../AddBundleDialog";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { FiCopy } from "react-icons/fi";
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';





const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 300,
    maxHeight: 420,
    margin: 10,
    textAlign: "left",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer",
  },
  expand: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    padding: "0 10px",
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    backgroundColor: red[500],
    cursor: "pointer",
  },
}));

function Cardbundle({
  

  data,

}) {


    const navigate = useNavigate();
  
    const auth = useContext(UserContext);
    const classes = useStyles();
    const {t} = useTranslation();

    const [isLike, setisLike] = useState(false);
    const [nbLike, setnbLike] = useState(0);
    const [openSubscribe, setOpenSubscribe] = useState(false);
    const [isSubscribed, setisSubscribed] = useState(false);
    const [activeSubscribe, setActiveSubscribe] = useState(true);
    const [nbSubscribed, setnbSubscribed] = useState(0);
    const [isLoading, setIsloading] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [isVideo, setisVideo] = useState(false);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const openMenu = Boolean(anchorEl);
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };

     if (!data) {
    return null; // or return a placeholder component
  }
  
    let BundleData = data;
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClose1 = () => {
      setOpen1(false);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };
  
    const handleClose3 = () => {
      setOpen3(false);
    };
  
    const handleClickOpen2 = () => {
        setOpenSubscribe(false);
        setOpen2(true);
      };
    let userId =
      typeof BundleData.userId === "object" &&
      !Array.isArray(BundleData.userId) &&
      BundleData.userId !== null
        ? BundleData?.userId?._id
        : BundleData?.userId;
    const isUserBundle = auth?.userData?._id === userId;
  let userName = BundleData?.userId?.userName || BundleData?.userDetail?.userName || 'Unknown User';
      let userSpeciality = BundleData?.userId?.speciality || BundleData?.userDetail?.speciality || '';

    let profilePic =
      BundleData?.userId?.profilePic ||
      BundleData?.userDetail?.profilePic ||
"/assets/Images/profile.jpg"    
      useEffect(() => {
        const videoExtensions = ["mp4", "avi", "wmv", "mov", "mkv", "flv", "webm", "mpeg", "3gp", "ogv"];
      
        const mediaUrl = BundleData?.mediaUrl;
        if (mediaUrl) {
          const extension = mediaUrl.split('.').pop().toLowerCase();
          if (videoExtensions.includes(extension)) {
            setisVideo(true); // It's a video
          } 
        }
      }, [BundleData]);

      

  
    const subscribeToBundleHandler = async () => {
      setIsloading(true);
      await axios({
        method: "GET",
        url: Apiconfigs.subscribeNow + BundleData._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          setIsloading(false);
          if (res.data.statusCode === 200) {
            setisSubscribed(res.data.result.subscribed === "yes");
            setnbSubscribed(res.data.result.nb);
            setActiveSubscribe(true);
            setOpen2(false);
            toast.success("Subscribe Successfully");
            navigate("/bundles-details?" + BundleData?._id);
          } else {
            toast.error(res.data.responseMessage);
          }
        })
        .catch((err) => {
          setIsloading(false);
          console.log(err.message);
          toast.error(err?.response?.data?.responseMessage);
        });
    };
    const unSubscribeToBundleHandler = async () => {
      setIsloading(true);
      await axios({
        method: "DELETE",
        url: Apiconfigs.unSubscription + BundleData?._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          setIsloading(false);
          if (res.data.statusCode === 200) {
            setIsloading(false);
            toast.success("You have unsubscribed successfully.");
            setisSubscribed(false);
            setnbSubscribed((nb) => nb - 1);
          } else {
            toast.error("Something went wrong");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
        });
    };
    const likeDislikeNfthandler = async (id) => {
      if (auth.userData?._id) {
        try {
          const res = await axios.get(Apiconfigs.likeDislikeNft + id, {
            headers: {
              token: sessionStorage.getItem("token"),
            },
          });
          if (res.data.statusCode === 200) {
            setisLike((liked) => !liked);
            setnbLike((nb) => (isLike ? nb - 1 : nb + 1));
          } else {
            setisLike(false);
            toast.error(res.data.responseMessage);
          }
        } catch (error) {
          console.log("ERROR", error);
        }
      } else {
        toast.error("Please login");
      }
    };
  
    const downLoadFile = () => {
      saveAs(BundleData?.mediaUrl);
    };
  
    useEffect(() => {
      setnbLike(BundleData.likesUsers.length);
      setnbSubscribed(BundleData.subscribers.length);
      if (auth.userData?._id) {
        setisLike(BundleData.likesUsers?.includes(auth.userData._id));
        setisSubscribed(BundleData.subscribers?.includes(auth.userData._id));
      }
      if (auth.userData?._id && BundleData?._id) {
        //getSubscription().catch(console.error);
      }
    }, []);
  
  return (
    <Box dir="ltr"
  className="card-3"
  sx={{
     
    background: (theme) => theme.custom.CarBackGround,
   
  }}
>
<div className="media-cont">
{isVideo ? (
        <div
          style={{ cursor: "pointer", background: '#000' ,borderRadius:"20px"}}
          onClick={() =>
            isSubscribed || isUserBundle
              ? navigate("/bundles-details?" + BundleData?._id)
              : handleClickOpen2()
          }
        >
          <ReactPlayer
            url={BundleData.mediaUrl}
            muted
            playing
            width="100%"
            height="150px"
          />
        </div>
      ) : (
         <img src={BundleData?.mediaUrl}  onClick={() =>
            (isSubscribed && activeSubscribe) || isUserBundle
              ? navigate("/bundles-details?" + BundleData?._id)
              : handleClickOpen2()
          }
          /> 
      
      )}
      </div>
        <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleCloseMenu}
        open={openMenu}
      >
        {isUserBundle && (
          <MenuItem
            key={"Edit"}
            onClick={() => {
              setAnchorEl(false);
              setOpenEdit(true);
            }}
            style={{ fontSize: 14 }}
          >
            {"Edit"}
          </MenuItem>
        )}
        <MenuItem
          key={"Copy"}
          onClick={() => {
            navigator.clipboard.writeText(
              `${pageURL}/bundles-details?${BundleData?._id}`
            );
            setAnchorEl(false);
          }}
          style={{ fontSize: 12 }}
        >
          {"Copy"}
          
        </MenuItem>
      </Menu>


 
   <div className="contentContainer">

<Box display="flex" alignItems="center">
   <Typography
          className="contentTypo"
          component="h6"
          sx={{ color: "white", fontWeight: "bold" ,margin:"0 5px",fontSize:"18px" }}
        >
          {BundleData.bundleName}
        </Typography>
       {/* <FiCopy color="white" cursor="pointer" onClick={() => {
                    navigator.clipboard.writeText(
                      `${pageURL}/bundles-details?${BundleData?._id}`
                    );
                    toast.info("Copied")}} />*/} 

        
        </Box>
  <Typography
          component="h6"
                    className="contentTypo"

          style={{ color: "white", fontWeight: "bold", marginTop: 5 ,fontSize:"12px"}}
        >
          {"( "}
          {BundleData?.donationAmount
            ? BundleData?.donationAmount
            : "Any amount"}{" "}
          {" )"}{" "}
          {BundleData && BundleData.coinName ? BundleData.coinName : "MAS"}{" "}
          {" for "}
          {BundleData?.duration ? BundleData?.duration : "Ever"}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
                    className="contentTypo"

          component="p"
          style={{ marginTop: 5 }}
        >
          {BundleData?.details}
        </Typography>

  {/* info Card */}
      <Card
        titel={userName}
        text={userSpeciality}
        imgsrc={profilePic}
        AvatarClick={() => {
            navigate("/user-profile/" + userName);
          }}
      />
      {/* button */}

         <div
            className="buttons"
            
              style={{
                display: "flex",
                flexDirection:"row",
                alignItems: "center",
                justifyContent:"space-between",
                marginTop: "10px",
            }}
          >
            

              
       
     <div>
        {auth.userData &&
          auth.userLoggedIn &&
          auth.userData._id !== userId &&
          isSubscribed && (
            <Button
             className="primary" 
             style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px 3px",
            }}
              disabled={isSubscribed && activeSubscribe}
              onClick={() => (activeSubscribe ? {} : handleClickOpen2())}
            >
              {activeSubscribe ? t("Subscribed") : t("Renew")}
            </Button>
          )}
        {auth?.userData?._id !== userId && !isSubscribed && (
        
          <Button 
         className="primary"
         style={{
          color: "white",
          fontWeight: "600",
          fontSize: "12px",
          padding: "2px",
        }}
          onClick={handleClickOpen2}>
            {t("Details")}
          </Button>
        )}
    
        {auth.userData && auth.userLoggedIn && auth.userData._id === userId && (


            
          <Button
            className="primary"
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px",
            }}
            onClick={() => navigate("/bundles-details?" + BundleData?._id)}
          >
            {t("View")}
          </Button>
        )}</div>   

<div 

          aria-label="add to favorites"
          onClick={() => likeDislikeNfthandler(BundleData._id)}
          style={{display : 'flex' }}
        >
          <FavoriteIcon
             style={isLike ? {color: ' #FD1D1D' ,fontSize:"20px" } : { color:' #ffffff6e',fontSize:"20px"  }}/>
             
      <span style={{color: 'white',marginLeft:'5px',fontSize: "12px"} }>{nbLike}</span>
      </div>
      </div> 
            
          {/* edit */}
          <Dialog
        open={open}
        disableScrollLock={true}

        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "rgb(60, 0, 75)", margiBottom: "10px" }}
            >
              {BundleData.bundleTitle}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                <label>{t("Donation Amount")}</label>
                </Grid>
                <Grid item xs={12} md={8}>
                  <TextField
                    id="standard-basic"
                    placeholder="30"
                    className={classes.input_fild2}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              style={{
                paddingBotton: "10px",
                borderBottom: "solid 0.5px #e5e3dd",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={4}>
                <label>{t("Duration")}</label>
                </Grid>
                <Grid item xs={12} md={8} className={classes.donation}>
                <span>7 {t("Days")}</span>
                  <span>14 {t("Days")}</span>
                  <span>30 {t("Days")}</span>
                  <span>60 {t("Days")}</span>
                  <span>1 {t("Year")}</span>
                  <span>{t("Forever")}</span>
                </Grid>
              </Grid>
            </Box>

            <Box align="center">
            <label> {t("Services")}:</label>
            <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
                {/*I will send you a special video every <br />
                month specially for you! (edit)*/}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <small>
              {t("Change/upload a photo or video")}
              <input type="file" />
              </small>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
            <Box mt={4}>
              <Grid container alignItems="center" spacing={2}>
                <Grid item md={4}>
                  <Link style={{ color: "#000" }} onClick={handleClose}>
                    {t("Delete this bundle")}
                  </Link>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{background:(theme) => theme.custom.mainButton,color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Cancel")}
                  </Button>
                </Grid>
                <Grid item md={4}>
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    sx={{background:(theme) => theme.custom.mainButton,color:"white" }}
                    onClick={handleClose}
                  >
                    {t("Save Changes")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* view */}
      <Dialog
        open={open1}
        disableScrollLock={true}

        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h4"
              align="center"
              style={{ color: "rgb(71, 0, 89)", margiBottom: "10px" }}
            >
              {t("Bundle")} 
            </Typography>
            <Typography
              variant="h6"
              align="center"
              style={{ color: "#000", borderBottom: "solid 0.5px #e5e3dd" }}
            >
              {t("My basic supporter")}
            </Typography>

            <Box align="center" mt={3}>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Donation amount")}: </span>10
                MAS
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Duration")}: </span>{t("One month")}
                </Typography>
              <Typography
                variant="h6"
                component="h6"
                style={{ color: "#000", fontWeight: "400" }}
              >
                <span style={{ color: "#707070" }}>{t("Number of subscribers")}:</span>
                100
              </Typography>
            </Box>

            <Box align="center">
            <label> {t("Services")}:</label>
            <Typography
                variant="body2"
                componant="p"
                style={{ color: "#000", fontSize: "20px" }}
              >
               {t("I will send you a special video every")} <br />
               {t("month specially for you!")}
              </Typography>
            </Box>
            <Box mt={2} className={classes.changepic}>
              <img src="/images/Rectangle.png" alt="" />
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      {/* Subscribe now */}
     <Dialog
  fullWidth
  maxWidth="md"
  open={open2}
  disableScrollLock
  onClose={handleClose2}
  aria-labelledby="responsive-dialog-title"
  disableBackdropClick={isLoading}
  disableEscapeKeyDown={isLoading}
  sx={{
    '& .MuiDialog-paper': {
      backgroundImage: 'url(/assets/Images/doodle2.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      borderRadius: '16px',
      overflow: 'hidden',
      maxHeight: '90vh'
    }
  }}
>
  <DialogContent sx={{ p: 0 }}>
    <Box sx={{
      background: "rgba(255, 255, 255, 0.85)",
      backdropFilter: "blur(8px)",
      p:2,
      display: 'flex',
      flexDirection: 'column',
      gap:2,
      borderRadius:2
    }}>
      {/* Media Section - Smaller on desktop */}
      <Box sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '16/9',
        width: '100%',
        maxHeight: { xs: 'auto', md: '320px' } // Fixed height on desktop
      }}>
        {isVideo ? (
          <ReactPlayer
            url={BundleData.mediaUrl}
            muted
            controls
            playing
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        ) : (
          <img
            src={BundleData.mediaUrl}
            alt=""
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        )}
      </Box>

      {/* Download Button */}
      {isVideo && auth.userData && auth.userLoggedIn && auth.userData._id !== userId && isSubscribed && (
        <Button
          variant="contained"
          fullWidth
          onClick={downLoadFile}
          sx={{
            bgcolor: (theme) => theme.custom.mainButton,
            color: 'white',
            '&:hover': { bgcolor: (theme) => theme.custom.hoverMainButton },
            maxWidth: { md: '300px' }, // Narrower button on desktop
            alignSelf: 'center' // Center on desktop
          }}
        >
          {t("Download")}
        </Button>
      )}

      {/* Title */}
      <Typography variant="h4" sx={{ 
        fontWeight: 600,
        textAlign: 'center',
        color: (theme) => theme.custom.mainButton,
        fontSize: { xs: '1.5rem', md: '1.75rem' }
      }}>
        {BundleData.bundleTitle}
      </Typography>

      {/* Details Section - Compact layout */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        '& > div': {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }
      }}>
        <div>
          <Typography variant="body1" color="text.secondary">
            {t("Donation amount")}:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {BundleData.donationAmount} {BundleData.coinName}
          </Typography>
        </div>

        <div>
          <Typography variant="body1" color="text.secondary">
            {t("Duration")}:
          </Typography>
          <Typography variant="body1" fontWeight={500}>
            {BundleData.duration}
          </Typography>
        </div>

        <Box>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {t("Details")}:
          </Typography>
          <Typography variant="body2" sx={{ 
            bgcolor: 'rgba(47, 0, 50, 0.05)',
            p: 2,
            borderRadius: '8px',
            lineHeight: 1.6,
            maxHeight: { md: '120px' }, // Shorter on desktop
            overflowY: 'auto' // Scrollable if content is long
          }}>
            {BundleData?.details}
          </Typography>
        </Box>
      </Box>

      {/* Action Buttons - Optimized spacing */}
      <Box sx={{ 
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        justifyContent: 'center',
        pt: 2
      }}>
        {!auth.userLoggedIn ? (
          <>
            <Button
              variant="outlined"
              sx={{
                color: (theme) => theme.custom.mainButton,
                borderColor: (theme) => theme.custom.mainButton,
                '&:hover': { borderColor: (theme) => theme.custom.hoverMainButton },
                flex: { xs: 1, md: 0.5 } // Half width on desktop
              }}
              onClick={handleClose2}
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.custom.mainButton,
                color: 'white',
                '&:hover': { bgcolor: (theme) => theme.custom.hoverMainButton},
                flex: { xs: 1, md: 0.5 } // Half width on desktop
              }}
              onClick={() => navigate("/login")}
            >
              {t("Login")}
            </Button>
          </>
        ) : auth.userData._id !== data.userId && (
          <>
            <Button
              variant="outlined"
              sx={{
                color: (theme) => theme.custom.mainButton,
                borderColor: (theme) => theme.custom.mainButton,
                '&:hover': { borderColor: (theme) => theme.custom.hoverMainButton },
                flex: { xs: 1, md: 0.5 }
              }}
              onClick={handleClose2}
              disabled={isLoading}
            >
              {t("Cancel")}
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.custom.mainButton,
                color: 'white',
                '&:hover': { bgcolor: (theme) => theme.custom.hoverMainButton },
                flex: { xs: 1, md: 0.5 }
              }}
              onClick={subscribeToBundleHandler}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  {t("pending...")}
                  <ButtonCircularProgress />
                </>
              ) : t("Subscribe now")}
            </Button>
          </>
        )}
      </Box>
    </Box>
  </DialogContent>
</Dialog>

      <Dialog
        open={open3}
        disableScrollLock={true}

        fullWidth="sm"
        maxWidth="sm"
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className={classes.dilogBody}>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="h4" align="center" style={{ color: "#000" }}>
            {t("Enter an amount")}
            </Typography>
            <Box mt={4}>
              <Input
                placeholder="300"
                className={classes.input_fild2}
                endAdornment={
                  <InputAdornment position="end">{t("Select a token")}</InputAdornment>
                }
              />
            </Box>

            <Box mt={4}>
              <Typography variant="h4" align="center" style={{ color: "#000" }}>
              {t("Send a message")}
              </Typography>
              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                className={classes.input_fild}
                defaultValue="Default Value"
                variant="outlined"
              />
            </Box>
            <Box mt={2} mb={4}>
              <Button variant="contained" size="large" color="secondary" sx={{background:(theme) => theme.custom.mainButton,color:"white" }} >
              {t("Donate now")}
              </Button>
            </Box>
            <small>{t("ETH fees and ETH fees and apply. apply.")}</small>
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <AddBundleDialog
        handleClose={() => setOpenEdit(false)}
        show={openEdit}
        bundleData={data}
      />
        
          </div>
    

 
</Box>


    
  );
}

export default Cardbundle;
