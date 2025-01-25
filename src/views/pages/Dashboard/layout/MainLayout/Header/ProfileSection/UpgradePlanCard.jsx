// material-ui
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { makeStyles } from "@mui/styles"; 
import { UserContext } from "src/context/User";
import { useNavigate } from "react-router-dom";
import { tokensDetails, websiteName } from "src/constants";
import { sortAddress } from "src/utils";
// import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import DataLoading from "src/component/DataLoading";
import { FiCopy } from "react-icons/fi";
import { FaTelegramPlane, FaUserFriends, FaFacebookF, FaTwitter } from "react-icons/fa"; // Merged icons imports for better organization
import { isMobile } from "react-device-detect";
import {
  FacebookShareButton,
  TelegramShareButton,
  EmailShareButton,
  TwitterShareButton,
} from "react-share";
import { RiMessengerFill } from "react-icons/ri"; 
// project imports
import AnimateButton from '../../../../ui-component/extended/AnimateButton';
import { 
   Box,
  Paper,
  Avatar,
  Container,
  TextField ,


  
  Typography,
  InputAdornment,
  DialogTitle,
  Input,
  Dialog,
  DialogContent,
  DialogContentText,

  

 } from '@mui/material';
import React, { useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import zIndex from '@mui/material/styles/zIndex';


// ==============================|| PROFILE MENU - UPGRADE PLAN CARD ||============================== //
const useStyles = makeStyles((theme) => ({
  profilebg: {
    boxShadow: " 0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
    backgroundImage: " linear-gradient(to bottom, #c04848, #480048)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    backgroundPosition: "center center",
    height: " 95px",
    width: "100%",
    position: "relative",
  },
  profileText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "cou",
    
    "& h3": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "25px",
      fontWeight: "500",
      color: "#000",
      [theme.breakpoints.down("xs")]: {
        fontSize: "18px",
      },
    },
    "& a": {
      fontSize: "16px",
      fontWeight: "700",
      color: "#707070",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "flex-start",
      },
      "& svg": {
        paddingRight: "5px",
      },
    },
    "& p": {
      fontSize: "12px",
      fontWeight: "500",
      color: "#444",
      marginTop: "6px",
    },
  },
  masBox: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #c6cacf",
    backgroundColor: "#fff",
    padding: "10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
  masBox1: {
    backdropFilter: " blur(15px)",
    border: "solid 0.5px #c6cacf",
    backgroundColor: "#fff",
    padding: "10px",
    marginLeft: "-10px",
    "& ul": {
      display: "flex",
      padding: "0",
      justifyContent: "center",
      "& li": {
        display: "flex",
        justifyContent: "center",
        position: "relative",
        "&::after": {
          content: " ''",
          position: "absolute",
          height: "70%",
          width: "1px",
          backgroundColor: "#e5e3dd",
          right: "0",
          top: "50%",
          transform: "translateY(-50%)",
        },
        "&:last-child::after": {
          display: "none",
        },
      },
    },
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "32px",
    "& button": {
      height: "30px",
      fontSize: "12px",
    },
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },
  dialogTitle: {
    textAlign: "Center",
    "& h2": {
      color: "#141518",
      fontSize: "23px",
    },
  },
  tokenList: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px",
    border: "solid 0.5px #e5e3dd;",
    "&:hover": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "&.active": {
      backgroundColor: "rgba(209, 91, 91, 0.39)",
    },
    "& h3": {
      color: "#141518",
      fontSize: "14px",
    },
  },
  input_fild2: {
    width: "100%",
    "& input": {
      height: "45px",
    },
  },
  dilogBody: {
    paddingBottom: "30px",
    position: "relative",
    "& small": {
      position: "absolute",
      bottom: "13px",
      left: "50%",
      transform: "translateX(-50%)",
      fontSize: "13px",
      width: "100%",
      textAlign: "center",
    },
  },
  dilogBody2: {
    boxShadow: "0 1.5px 3px 0 rgb(0 0 0 / 16%)",
    backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
    borderRadius: "50px",
    overflow: "hidden",
  },
  dilogBody3: {
    backgroundColor: "#101010",
  },
  table: {
    "& th": {
      color: "#fff",
    },
    "& td": {
      color: "#fff",
    },
  },
  input_fild: {
    backgroundColor: "#ffffff6e",

    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "20px",
    "&:hover": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
    },
    "& .MuiInputBase-input": {
      color: "#141518",
      height: "34px",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  userno: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& svg": {
      paddingRight: "5px",
    },
  },

  walletActions: {
    display: "flex",
    marginBottom: "20px",
    "& button": {
      margin: '10px'
    },
    "@media(max-width:600px)": {
      order: "0",
      width: " 100%",
      justifyContent: "space-between",
    },
  },
  textbox: {
    "@media(max-width:600px)": {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: 'center'
    },
    "& h3": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign: "center",
      },
    },
    "& h5": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign: "center",
      },
    },
    "& button": {
      "@media(max-width:600px)": {
        width: "100%",
        textAlign: "center",
      },
    },
  },
  title: {
    border: "1px solid #DDD",
    borderRadius: "15px",
    padding: "4px 10px"
  },
}));
const UpgradePlanCard = () => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWihdraw, setOpenWithdraw] = useState(false);
  const [openSelectToken, setOpenSelectToken] = useState(false);
  const [openUserPlan, setOpenUserPlan] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawFees, setWithdrawFees] = useState();
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [loader, setloader] = useState(false);
  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawTx, setWithdrawTx] = useState("");
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);

  const [availableBalance, setAvailableBalance] = useState({});
  const [totalEarning, setTotalEarning] = useState({});


  if (user.isLogin && !user.userData) {
    user.updateUserData();
  }

  useEffect(() => {
    let timer1;
    function checkechecko() {
      if (user.isLogin && user.userData._id) {
        return () => {
          clearTimeout(timer1);
        };
      } else {
        timer1 = setTimeout(() => {
          checkechecko()
        }, 200);
      }
    }
    checkechecko()
  }, []);

  useEffect(() => {
    setAvailableBalance({
      masBalance: parseFloat(user.userData?.masBalance),
      fdusdBalance: parseFloat(user.userData?.fdusdBalance),
      usdtBalance: parseFloat(user.userData?.usdtBalance),
    });

  }, [user.userData])

  useEffect(() => {
    setTotalEarning({
      masBalance: parseFloat(user.userEarnings?.masBalance) + parseFloat(user.userEarnings?.referralBalance),
      fdusdBalance: parseFloat(user.userEarnings?.fdusdBalance),
      usdtBalance: parseFloat(user.userEarnings?.usdtBalance),
    });

  }, [user.userEarnings])

  React.useMemo(() => {
    setWithdrawFees(((parseFloat(user.userData?.withdrawFees) * parseFloat(withdrawAmount) / 100)).toFixed(2));
  }, [withdrawAmount]);

  const MAxWithdrawAmount = () => {
    setWithdrawAmount((availableBalance[selectedToken.databaseKey] - availableBalance[selectedToken.databaseKey] * parseFloat(user.userData?.withdrawFees) / 100).toFixed(2));
  }

  const withdraw = async () => {

    if (withdrawAmount === "") {
      setWithdrawError("Please enter Amount");
    } else if (withdrawAmount < 1) {
      setWithdrawError("Please enter valid amount (equal or greater than 1)");
    } else if (
      parseFloat(withdrawAmount) + parseFloat(withdrawFees) >= parseFloat(user.userData[selectedToken.databaseKey])
    ) {
      setWithdrawError(`${selectedToken.name} balance is low`);
    } else if (withdrawAddress === "") {
      setWithdrawError("Please enter Wallet Address");
    } else {
      setloader(true);
      axios({
        method: "POST",
        url: Apiconfigs.withdraw,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        data: {
          recipientAddress: withdrawAddress,
          withdrawAmount: withdrawAmount,
          coin: selectedToken?.name,
        },
      })
        .then(async (res) => {
          await user.updateUserData();
          if (res.data.statusCode === 201) {
            setloader(false);
            setWithdrawTx(res.data.result.txid);
            setOpenWithdraw(false);
            setVerifyOTPOpen(true);
          } else {
            setWithdrawError("Something went wrong!");
            setloader(false);
          }
        })
        .catch((err) => {
          setWithdrawError("Something went wrong!");
          setloader(false);
        });
    }
  };

  const handleCloseDepositModal = () => {
    setOpenDeposit(false);
  };
  const handleCloseWithdrawModal = () => {
    setOpenWithdraw(false);
  };
  const handleCloseUserPlanModal = () => {
    setOpenUserPlan(false);
  };
  const handleCloseShareModal = () => {
    setOpenShare(false);
  };

  const profilePageURL = websiteName + "/user-profile/" + user?.userData?.userName;
  const cardSX = {
    content: '""',
    position: 'absolute',
    width: 200,
    height: 200,
    borderColor: 'warning.main'
  };

  return (
    <>
    
    <Card
      sx={{
        bgcolor: 'warning.light',
        my: 2,
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          border: '19px solid ',
          borderRadius: '50%',
          top: '65px',
          right: '-150px',
          ...cardSX
        },
        '&:before': {
          border: '3px solid ',
          borderRadius: '50%',
          top: '145px',
          right: '-70px',
          ...cardSX
        }
      }}
    >
      <CardContent>

      

      <Box
      //  className={classes.profileText}
       sx={{ display  :"flex"}}
      >
        <Container maxWidth="xl">
          
            <Box 
            style={{
              display  :"flex",
              flexDirection:"column",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
            }}
            >
              {/* START Avatar */}
              <Avatar
                src={
                  user.userData && user.userData?.profilePic
                    ? user.userData?.profilePic
                    : `https://avatars.dicebear.com/api/miniavs/${user?.userData?._id}.svg`
                }
                style={{
                  width: "120px",
                  height: "120px",
                  // margin: '-10px auto 0'
                }}
              />
              {/* End Avatar */}

              <Box 
               style={{
                display  :"flex",
                flexDirection:"column",
                // alignItems: "center",
                // justifyContent: "center",
                gap: "10px",
              }}
              >
                {/* Start User Type */}
                <Typography align='center' variant="h3"
                  style={{ textTransform: "capitalize" }}
                >
                  {user.userData?.name
                    ? user.userData?.name
                    : user.userData?.userName}
                  {user?.userData?.planType === "Gold" && (
                    <img onClick={() => setOpenUserPlan(true)}
                      src="/images/gold-check.svg"
                      style={{ width: "30px", marginLeft: "5px" }}
                    />
                  )}
                  {user?.userData?.planType === "Diamond" && (
                    <img onClick={() => setOpenUserPlan(true)}
                      src="/images/blue-check.svg"
                      style={{ width: "30px", marginLeft: "5px" }}
                    />
                  )}
                  {user?.userData?.planType === "Silver" && (
                    <img onClick={() => setOpenUserPlan(true)}
                      src="/images/white_check.svg"
                      style={{ width: "30px", marginLeft: "5px" }}
                    />
                  )}
                  {user?.userData?.planType === "Mas Plus" && (
                    <img onClick={() => setOpenUserPlan(true)}
                      src="/images/icon.png"
                      style={{ width: "30px", marginLeft: "5px" }}
                    />
                  )}
                </Typography>
                {/* End User Type */}
                {/* Start Wallet Address */}
                <Typography align='center' variant="body2"
                  component="p" className={classes.title}>
                  {sortAddress(user?.userData?.ethAccount?.address)} &nbsp;
                  {user?.userData?.ethAccount?.address && (
                    <CopyToClipboard
                      style={{ curser: "pointer" }}
                      text={user?.userData?.ethAccount?.address}
                    >
                      <FiCopy onClick={() => toast.info("Copied")} />
                    </CopyToClipboard>
                  )}
                </Typography>
                {/* End Wallet Address */}

                {/* Start Subscribe */}
                <Typography align='center' variant="body2" component="p" className={classes.title}>
                  {user &&
                    user.userData &&
                    user.userData?.followers?.length
                    ? user.userData?.followers?.length
                    : "0"} Subscriber{user.userData?.followers?.length > 1 ? "s" : ""}
                </Typography>
                {/* End Subscribe */}
                {/* Start refferall */}
                <Typography align='center' variant="body2"
                  component="p" className={classes.title}>
                  Referral code : {user?.userData?.referralCode} &nbsp;
                  <CopyToClipboard
  text={user?.userData?.referralCode}
  onCopy={() => toast.success("Referral code Copied")}
  style={{ cursor: "pointer",zIndex : "100" }}
>
  <FiCopy />
</CopyToClipboard>
                </Typography>
                {/* End refferall */}

                {/* Start Share */}
                <Button style={{ marginTop: "8px", width: "225px", borderRadius: "15px", background: "linear-gradient(180deg, #c04848 0%, #480048 100%)", color: "#FFF" }} onClick={() => setOpenShare(true)}>
                  Share
                </Button>
                {/* End Share */}
              </Box>
            </Box>



         

          
        </Container>
      </Box>
        
      </CardContent>
      
    </Card>

    <Dialog
        open={openShare}
        onClose={handleCloseShareModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={isMobile ? { height: "70%" } : { height: "100%" }}

      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="h5"
              align="center"
              style={{ color: "#000", margiBottom: "10px" }}
            >
              Hooray!
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: "#000" }}
            >

              You can share your link now anywhere!
            </Typography>

            <Box mt={3}>
              <TextField
                defaultValue={profilePageURL}
                disabled
                variant="outlined"
                className={classes.input_fild}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end" style={{ fontSize: "12px" }}>
                      <CopyToClipboard text={profilePageURL}>
                        <Button onClick={() => toast.info("Copied")}>
                          COPY
                        </Button>
                      </CopyToClipboard>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box mt={2} mb={4}>
              <Box mt={2} align="center">
                <FacebookShareButton
                  url={profilePageURL}
                  quote={"mas"}
                  hashtag="#mas"
                >
                  <FaFacebookF style={{ color: "#000" }} />
                </FacebookShareButton>
                <EmailShareButton
                  url={profilePageURL}
                  subject="mas"
                  body="mas"
                >
                  <RiMessengerFill style={{ color: "#000" }} />
                </EmailShareButton>
                <TwitterShareButton
                  url={profilePageURL}
                  quote={"CampersTribe - World is yours to explore"}
                  hashtag="#camperstribe"
                >
                  <FaTwitter style={{ color: "#000" }} />
                </TwitterShareButton>
                <TelegramShareButton
                  url={profilePageURL}
                  title={"mas"}
                >
                  <FaTelegramPlane style={{ color: "#000" }} />
                </TelegramShareButton>
              </Box>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                onClick={handleCloseShareModal}
              >
                Close
              </Button>
            </Box>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
    
  );
};

export default UpgradePlanCard;
