
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Box,
  Container,
  Grid,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material'; 
import { makeStyles } from '@mui/styles'; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import { FiCopy, FiEdit } from "react-icons/fi"; 
import { toast } from "react-toastify"; 
import { CopyToClipboard } from "react-copy-to-clipboard"; 
import { CheckCircleOutline, ErrorOutline, Edit, Save, Cancel, Grid3x3 } from '@mui/icons-material'; // MUI v5 Icons (Updated)
import SocialAccounts from "./SocialAccounts"; 
import { VerifyOtp } from "src/component/Modals/VerifyOtp";
import { isMobile } from 'react-device-detect';
import { Alert, AlertTitle } from '@mui/material';
import { green, red } from '@mui/material/colors'; 
import "./style.css"; 
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from '@mui/icons-material/Cancel';
import ButtonCircularProgress from "src/component/ButtonCircularProgress";



import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const useStyles = makeStyles((theme) => ({
  LoginBox: {
    paddingBottom: "50px",
    overflow : "hidden",
    backgroundColor:"#cdc8c8"
 
  },
  basic: {
    textAlign: "center",
    // fontFamily: "Poppins",
    fontFamily: "Roboto",
    fontSize: "30px",
    paddingTop: "20px",
    color: "#141518",
  
  },
  input_fild2: {
    width: "100%",
    borderRadius: "120px",

    "& input": {
      boxShadow: "0 0 5px #7b6c81",
      border: "1px soild white !important",
      
      borderRadius: "120px",
      paddingLeft: "15px",
      fontSize: "18px",
      "@media(max-width:960px)": {
        height: "15px",
        marginTop: "-15px",
      },
    },
  },
  Button: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: "25px",
    "@media(max-width:660px)": {
      display: "grid",
      
    }
  },
  ButtonBtn: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "fit-content",
    "& a": {
      height: "41px!important",
      width: "115px",
      // fontSize:"16px",

      padding: "5px 16px",
    },
  },
  ButtonBtn1: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "fit-content",
    "& button": {
      height: "41px!important",
      // fontSize:"16px",
      width: "120px",
      padding: "5px 16px",
    },
  },
  ButtonBtn2: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "fit-content",
    "& button": {
      height: "41px!important",
      // fontSize:"16px",
      width: "120px",
      padding: "5px 16px",
    },
  },
  ButtonBtn3: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "fit-content",
    "& button": {
      height: "41px!important",
      // fontSize:"16px",
      width: "120px",
      padding: "5px 16px",
    },
  },
  ButtonBtn4: {
    paddingTop: "30px",
    paddingRight: "10px",
    width: "fit-content",
    "& button": {
      height: "41px!important",
      // fontSize:"16px",
      width: "120px",
      padding: "5px 16px",
    },
  },
  name: {
    display: "flex",
    alignItems: "center",
    fontSize: "15px",
    color: "#141518",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
    "& p": {
      fontSize: "15px",
      color: "#707070",
      paddingLeft: "5px",
    },
  },
  inputbox: {
    width: "100%",
    height: "120px",
    borderRadius: "120px",
  },
  profile: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    // marginTop: "-75px",
    width: "fit-content",
    padding: "5px 20px",
    marginBottom: "10px",
  },
  coverpic: {
    width: "100%",
  },

  coverback: {
    height: "127.7px",
    width: "100%",
  },

  CoverBox: {
    background: "#5d0164",
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
  },
  coverEdit: {
    color: "#fff",
    fontSize: "16px",
    marginTop: "-40px",
    padding: "10px",
    position: "relative",
    // backgroundColor: "red",
    "& input": {
      position: "absolute",
      left: "10px",
      top: "-10px",
      width: "100%",
      height: "100%",
      opacity: "0",
      cursor: "pointer!important",
    },
    "& svg": {
      marginLeft: "7px",
    },
  },
  profilePic: {
    width: "320px",
    position: "relative",
    margin: "auto",
    display: "block",
    justifyContent: "space-between",
    alignItems: "center",
    // height: "120px",
    borderRadius: "50%",
    // padding: "10px",
    borderColor: "#fff",
    "& img": {
      width: "200px!important",
      height: "200px",
      marginRight: "10px",
      borderRadius: "50%",
    },
    "& input": {
      position: "absolute",
      left: "27%",
      top: "43%",
      width: "75%",
      height: "15%",
      opacity: "0",
    },
  },
  Box: {
    width: "100%",
    height: isMobile ? "80px" : "200px",
    background: "linear-gradient(to right , #280026,#5d0164)",
  },
  newsec: {
    display: "flex",
    "@media(max-width:560px)": {
      display: "block",
    },
  },
  mainadd: {
    paddingTop: "8px",
    "@media(max-width:560px)": {},
  },
  title: {
    textAlign: "center",
    display: "block",
    background: "linear-gradient(to bottom right, #640D5F, rgb(27, 1, 98))",
    width: "20% ",
    padding: "10px 20px",
    borderRadius: "10px",
    color: "#fff",
    "@media(max-width:680px)": {
      width: "40% !important",
    },
  },
  parentOfInput: {
    width: "97%",
    marginLeft: "20px",
    marginTop: "25px",
    "& div:before": {
      width: "0px",
    },
    "& div:after": {
      width: "91%",
      left: "18px",
      borderRadius: "20px",
    },
  },
  parentOfInput1: {
    marginLeft: "0px",
    marginTop: "0px",
    "& div:before": {
      width: "0px",
    },
    "& div:after": {
      width: "91%",
      left: "18px",
      borderRadius: "20px",
    },
  },
  phoneEmail: {
    background: " #c695da61",
    boxShadow: "0 0 10px #7b6c81",
    width: "97%",
    marginLeft: "10px",
    marginTop: "0px",
    "& div": {
      borderRadius: "5px",
      padding: "10px",
    },
  },
  linkBox: {
    width: "100%",
    marginLeft: "14px",
    marginTop: "20px",
    fontSize: "16px",
    color: " #777",
    border: "1px solid #ddd",
    padding: "12px",
    borderRadius: "15px",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    paddingRight: "15px",
    "& span": {
      color: "#777",
      fontSize: "13px",
    },
  },
  btnPro: {
    background: "linear-gradient(to bottom right, #640D5F, #1b0162)  !important",
    transition: "background  .6s",
    "&:hover": {
        background: "linear-gradient(to bottom right, #640D5F,rgb(76, 55, 131))!important", 
    },
  },
  btnOutPro: {
    background : "#fff !important",
    border: "#6345ED 1px solid !important",
    color: "#6345ED  !important",
    "&:hover": {
        background: "linear-gradient(to bottom right, #640D5F, rgb(76, 55, 131))!important", 
      color: "white !important",
      border: "none !important",
    },
  },
  homeSetting: {
    // background: "linear-gradient(0deg, #c53bf92b, #7d43f012)",
    background: "linear-gradient(to bottom left, #640D5F, black)" ,
    borderRadius: "20px",
    padding: "1rem",
    margin: "1rem auto",
    width: "100%",
    boxShadow: "0 0 10px #a2a2a2",
  },
  boxSitting: {
    borderRadius: "20px",
    padding: "2rem 1rem",
    boxShadow: "0 0 15px #7b6c8157",
    // background: " #c695da61",
     background: " #fff",

    margin: "2rem 0",
  },

  inputField: {
    width: "100%",
    borderRadius: "8px",
    "& input": {
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
      padding: "10px 15px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      transition: "all 0.3s ease",
      "&:focus": {
        borderColor: theme.palette.primary.main,
        outline: "none",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #ddd",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "2px solid #6345ED",
    },
  },
}));

// const useStyles = makeStyles((theme) => ({
//   LoginBox: {
//     paddingBottom: "50px",
//   },
//   basic: {
//     textAlign: "center",
//     fontFamily: "Poppins",
//     fontSize: "30px",
//     paddingTop: "20px",
//     color: "#141518",
//   },
//   input_fild2: {
//     width: "100%",
//     "& input": {
//       height: "33px",
//       border: "1px solid #DDD",
//       borderRadius: "20px",
//       paddingLeft: "15px",
//       fontSize: "18px",
//       "@media(max-width:960px)": {
//         height: "15px",
//         marginTop: "-15px",
//       },
//     },
//   },
//   Button: {
//     display: "flex",
//     justifyContent: "center",
//     paddingBottom: "25px",
//   },
//   ButtonBtn: {
//     paddingTop: "30px",
//     paddingRight: "10px",
//     width: "fit-content",
//     "& a": {
//       height: "41px!important",
//       width: "115px",
//       // fontSize:"16px",

//       padding: "5px 16px",
//     },
//   },
//   ButtonBtn1: {
//     paddingTop: "30px",
//     paddingRight: "10px",
//     width: "fit-content",
//     "& button": {
//       height: "41px!important",
//       // fontSize:"16px",
//       width: "120px",
//       padding: "5px 16px",


//     },
//   },
//   ButtonBtn2: {
//     paddingTop: "30px",
//     paddingRight: "10px",
//     width: "fit-content",
//     "& button": {
//       height: "41px!important",
//       // fontSize:"16px",
//       width: "120px",
//       padding: "5px 16px",


//     },
//   },
//   ButtonBtn3: {
//     paddingTop: "30px",
//     paddingRight: "10px",
//     width: "fit-content",
//     "& button": {
//       height: "41px!important",
//       // fontSize:"16px",
//       width: "120px",
//       padding: "5px 16px",


//     },
//   },
//   ButtonBtn4: {
//     paddingTop: "30px",
//     paddingRight: "10px",
//     width: "fit-content",
//     "& button": {
//       height: "41px!important",
//       // fontSize:"16px",
//       width: "120px",
//       padding: "5px 16px",


//     },
//   },
//   name: {
//     display: "flex",
//     alignItems: "center",
//     fontSize: "15px",
//     color: "#141518",
//     [theme.breakpoints.down("sm")]: {
//       display: "block",
//     },
//     "& p": {
//       fontSize: "15px",
//       color: "#707070",
//       paddingLeft: "5px",
//     },
//   },
//   inputbox: {
//     width: "10s0%",
//     height: "120px",
//     borderRadius: "120px",


//   },
//   profile: {
//     display: "flex",
//     flexDirection: "column",
//     // marginTop: "-75px",
//     width: "fit-content",
//     padding: "5px 20px",
//     marginBottom: "10px"
//   },
//   coverpic: {
//     width: "100%",
//   },

//   coverback: {
//     height: "127.7px",
//     width: "100%",
//   },

//   CoverBox: {
//     display: "flex",
//     alignItems: "flex-end",
//     flexDirection: "column",
//   },
//   coverEdit: {
//     color: "#fff",
//     fontSize: "16px",
//     marginTop: "-40px",
//     padding: "10px",
//     position: "relative",
//     // backgroundColor: "red",
//     "& input": {
//       position: "absolute",
//       left: "10px",
//       top: "-10px",
//       width: "100%",
//       height: "100%",
//       opacity: "0",
//       cursor: "pointer!important",
//     },
//     "& svg": {
//       marginLeft: "7px"
//     },
//   },
//   profilePic: {
//     width: "320px",
//     position: "relative",
//     margin: "auto",
//     display: "block",
//     justifyContent: "space-between",
//     alignItems: "center",
//     // height: "120px",
//     borderRadius: "50%",
//     // padding: "10px",
//     "& img": {
//       width: "200px!important",
//       height: "200px",
//       marginRight: "10px",
//       borderRadius: "50%",
//     },
//     "& input": {
//       position: "absolute",
//       left: "27%",
//       top: "43%",
//       width: "75%",
//       height: "15%",
//       opacity: "0",
//     },
//   },
//   Box: {
//     width: "100%",
//     height: isMobile ? "80px" : "200px",
//     backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
//     backgroundRepeat: "no-repeat",
//     backgroundSize: "100%",
//     backgroundPosition: "center center",
//   },
//   newsec: {
//     display: "flex",
//     "@media(max-width:560px)": {
//       display: "block",
//     },
//   },
//   mainadd: {
//     paddingTop: "8px",
//     "@media(max-width:560px)": {},
//   },
//   title: {
//     width: "fit-content",
//     padding: "10px",
//     borderBottom: "1px solid #ddd",
//     borderRadius: "10px",
//     color: "#878484"
//   },
//   parentOfInput: {
//     // width: "80%",
//     marginLeft: "20px",
//     marginTop: "25px",
//     "& div:before": {
//       width: "0px"
//     },
//     "& div:after": {
//       width: "91%",
//       left: "18px",
//       borderRadius: "20px",
//     }
//   },
//   parentOfInput1: {
//     marginLeft: "0px",
//     marginTop: "0px",
//     "& div:before": {
//       width: "0px"
//     },
//     "& div:after": {
//       width: "91%",
//       left: "18px",
//       borderRadius: "20px",
//     }
//   },
//   phoneEmail: {
//     width: "97%",
//     marginLeft: "10px",
//     marginTop: "0px",
//     "& div": {
//       borderRadius: "15px",
//       padding: "10px",
//     }
//   },
//   linkBox: {
//     width: "95%",
//     marginLeft: "14px",
//     marginTop: "20px",
//     fontSize: "16px",
//     color: "#777",
//     border: "1px solid #ddd",
//     padding: "12px",
//     borderRadius: "15px",
//     justifyContent: "space-between",
//     display: "flex",
//     flexWrap: "wrap",
//     alignItems: "center",
//     paddingRight: "15px",
//     "& span": {
//       color: "#777",
//       fontSize: "13px"
//     }
    
//   }
  
// }));
export function copyTextById(id) {
  var copyText = document.getElementById(id);
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */
  navigator.clipboard.writeText(copyText.value);
  alert(`Copied ${copyText.value}`);
}

const VerificationAlert = ({ verify }) => {
  const user = useContext(UserContext);

  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  return (
    <Box style={{ width: "340px", marginLeft: "17px", marginBottom: "10px" }} >
      <Alert severity="warning" variant="outlined">
        <AlertTitle>Security Verification</AlertTitle>
        To secure your account and enjoy full MAS Platform features please verify
        {' '}
        {verify.includes('email') && 'your email address '}
        {verify.length > 1 && ' and '}
        {verify.includes('sms') && 'your phone number '}
        <Button
          variant="text"
          onClick={() => setVerifyOTPOpen(true)}
          style={{ color: "red" }}
        >
          Click here!
        </Button>
      </Alert>
      <VerifyOtp
        open={verifyOTPOpen}
        handleClose={() => setVerifyOTPOpen(false)}
        channels={verify}
        context={'verifyLater'}
        emailVerificationSent={false}
        smsVerificationSent={false}
        successCallback={() => {
          setVerifyOTPOpen(false);
          user.updateUserData();
          toast.success("Security Verification complete!");
        }}
      />
    </Box>
  )
}

export default function ProfileSettings() {
  const user = useContext(UserContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState(false);
  const [name, setname] = useState(user.userProfileData?.name);
  const [speciality, setspeciality] = useState(user.userProfileData?.speciality);
  const [bio, setbio] = useState(user.userProfileData?.userbio);
  const [phone, setphone] = useState(user.userData?.phone);
  const [email, setemail] = useState(user.userData?.email);
  const [profilePic, setProfilePic] = useState(user.userProfileData?.userprofilepic);
  const [cover, setcover] = useState(user.userProfileData?.usercover);
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [needVerification, setNeedVerification] = useState([]);
  const [editedPhone, setEditedPhone] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [phonevalid, setphonevalid] = useState(true);
  const [isLogOutOpen, setIsLogoutOpen] = useState(false);
  const auth = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [OpenKYCDialog, setOpenKYDialog] = useState(false);
  const [openDeactivateDialog, setOpenDeactivateDialog] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    document: null,
  });
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [file, setFile] = useState(null);

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (err) {
      console.log("Error: ", err);
    };
  };
  const updateProfile = async () => {
     // if (!name || !bio || !speciality || !profilePic ) {
      // toast.error("Check field Errors !");
    // } else {

    setIsloading(true);
    axios({
      method: "PUT",
      url: Apiconfigs.updateprofile,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        name: name,
        speciality: speciality,
        profilePic: profilePic,
        coverPic: cover,
        bio: bio,
        facebook: user.link.userfacebook,
        twitter: user.link.usertwitter,
        youtube: user.link.useryoutube,
        telegram: user.link.usertelegram,
      },
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        toast.success("Your profile has been updated successfully");
        user.updateUserData();
        navigate("/profile");
      } else {
        toast.error(res.data.responseMessage);
      }
      setIsloading(false);
    })
      .catch((error) => {
        setIsloading(false);

        if (error.response) {
          toast.error(error.response.data.responseMessage);
        } else {
          toast.error(error.message);
        }
      });
   // }
  };
  const handleSaveEmailClick = () => {
    // Add logic to save edited email
    if (!email) {
      toast.error("Check field Errors !");
     } else {
    setEditingEmail(true);
    axios({
      method: "PUT",
      url: Apiconfigs.updateprofile,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        email : editedEmail
      },
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        toast.success("Your profile has been updated successfully");
        setemail(email);
        user.updateUserData();
        //navigate("/profile");
      } else {
        toast.error(res.data.responseMessage);
      }
      setEditingEmail(false);
    })
    .catch((error) => {
      setIsloading(false);

      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    });
  }
  };
  const handleCancelEmailClick = () => {
    // Add logic to cancel email edit
    setEditingEmail(false);
  };
  const handleSavePhoneClick = () => {
    // Add logic to save edited phone number
    if (!phone) {
      toast.error("Check field Errors !");
     } else {
    setEditingPhone(true);
    axios({
      method: "PUT",
      url: Apiconfigs.updateprofile,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      data: {
        phone : editedPhone
      },
    }).then(async (res) => {
      if (res.data.statusCode === 200) {
        toast.success("Your profile has been updated successfully");
        setphone(phone);
        user.updateUserData();
        //navigate("/profile");
      } else {
        toast.error(res.data.responseMessage);
      }
      setEditingPhone(false);
    })
    .catch((error) => {
      setIsloading(false);

      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
    });
  }
  };
  const handleCancelPhoneClick = () => {
    // Add logic to cancel phone number edit
    setEditingPhone(false);
  };
  const deleteProfile = async () => {
    try {
      const response = await axios({
        method: "delete",
        url: Apiconfigs.deleteProfile,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
  
      if (response.data.statusCode === 200) {
        toast.success("Your profile has been deleted successfully");
        // You might want to navigate to a different page or perform other actions after deletion
        auth.logOut();
        navigate("/create-account");
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.responseMessage);
      } else {
        toast.error(error.message);
      }
      setIsloading(true);

    // Simulate asynchronous operation (replace with your actual logic)
    setTimeout(() => {
      setIsloading(false);
      handleClose();
    }, 2000);
    }
  };
  const handleOpenDelete = () => {
    setOpenDeleteDialog(true);
  };
  const handleOpenDeactivate = () => {
    setOpenDeactivateDialog(true);
  };
  const handleOpenKYC = () => {
    setOpenKYDialog(true);
  };
  const handleClose = () => {
    setOpenDeleteDialog(false);
    setOpenDeactivateDialog(false);
    setOpenKYDialog(false);
  };
  const deactivateProfile = () => {
    // Perform your deactivation logic here
    try {
      const response =  axios({
        method: "PUT",
        url: Apiconfigs.deactivateProfile, // Update the URL to your new endpoint
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });
  
      if (response.data.statusCode === 200) {
        toast.success("Your profile has been deactivated successfully");
        // You might want to navigate to a different page or perform other actions after deactivation
        auth.logOut();
        navigate('/login');
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      console.error("Error deactivating profile:", error);
      // Handle error, show an error message, etc.
    }
    setIsloading(true);

    // Simulate asynchronous operation (replace with your actual logic)
    setTimeout(() => {
      setIsloading(false);
      handleClose(); // Close the modal after deactivation is complete
      history.push('/create-account');
    }, 2000);
  };
  const KYCForm = () => {
    
    const handleChange = (e) => {
      const { name, value, files } = e.target;
  
      setFormData((prevData) => ({
        ...prevData,
        [name]: name === 'document' ? files[0] : value,
      }));
    };
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Perform KYC verification here using formData
  
      console.log('KYC Form submitted:', formData);
      // You can send the form data to a server for further processing and verification.
    };
  
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'document' ? files[0] : value,
    }));
  };
  const handleNameChange = (e) => {
    setname(e.target.value);
  };

  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('document', file);
     // Log the FormData object
     console.log('FormData:', formData);
    try {
      const response = await fetch('http://localhost:1865/upload', {
        method: 'POST',
        body: formData,
      });
        
      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Failed to upload file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  const SelfieCapture = () => {
    const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
  
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };
  
    const stopCamera = () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setStream(null);
      }
    };
  
    const takePicture = () => {
      if (videoRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas content to a data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        console.log('Captured image:', imageDataUrl);
  
        // Stop the camera
        stopCamera();
      }
    }
  }
  const [stream, setStream] = useState(null);
    const videoRef = useRef(null);
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  const stopCamera = () => {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setStream(null);
    }
  };

  const takePicture = () => {
    if (videoRef.current) {
      // Wait for the loadedmetadata event before capturing the image
      videoRef.current.addEventListener('loadedmetadata', () => {
        console.log('Video metadata loaded');
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
        // Convert the canvas content to a data URL
        const imageDataUrl = canvas.toDataURL('image/png');
        console.log('Captured image:', imageDataUrl);
  
        // Stop the camera
        stopCamera();
      }, { once: true }); // Ensure the event listener runs only once
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        // Now it's safe to call takePicture or startCamera
      });
    }
  }, [videoRef]);
  useEffect(() => {
    let timer1;
    function checkechecko() {
      if (user.isLogin && user.userData._id) {
        let verify = new Set(needVerification);
        if (user.userData.emailVerification === false) {
          verify.add('email')
        } else {
          verify.delete('email')
        }
        if (user.userData.phoneVerification === false) {
          verify.add('sms');
        } else {
          verify.delete('sms')
        }
        setNeedVerification([...verify]);

        return () => {
          clearTimeout(timer1);
        };
      } else {
        timer1 = setTimeout(() => {
          checkechecko()
        }, 500);
      }
    }
    checkechecko()
  }, []);
  useEffect(() => {
    setname(user.userProfileData?.name);
    //setphone(user.userProfileData?.phone);
    //setemail(user.userProfileData?.email);
    setspeciality(user.userProfileData?.speciality);
    setbio(user.userProfileData?.userbio);
    setProfilePic(user.userProfileData?.userprofilepic);
    setcover(user.userProfileData?.usercover);
  }, [user.userProfileData])

  return (
    <Box className={classes.LoginBox}>
      {/* Start Cover */}
      <Grid className={classes.CoverBox}>
        <Box
          className={classes.Box}
          // style={cover
          //   ? { backgroundImage: `url(${cover})`, }
          //   : null}
        >
        </Box>
        <Box className={classes.coverEdit} style={{ cursor: "pointer!important" }}>
          Edit Cover
          <FiEdit />
          <input
            style={{ cursor: "pointer" }}
            type="file"
            accept="image/*"
            onChange={(e) => {
              getBase64(e.target.files[0], (result) => {
                setcover(result);
              });
            }}
          />
        </Box>
      </Grid>
      {/* End Cover */}

      <Container maxWidth="md" className={classes.homeSetting}>

        {/* Start Profile Img */}
        <Box className={classes.profile}>
          <Box className={classes.profilePic}
            style={!profilePic ? {
              border: ""
            } : null}
          >
            <img
              src={profilePic || "/images/users/profilepic1.svg"}
              alt="Edit profile picture"
              style={
                profilePic
                  ? {
                      padding: "4px",
                      border: "dotted 2px #fff",
                      display: "block",
                      width: "fit-content",
                      margin: "auto",
                    }
                  : {
                      border: "dotted 2px #fff !important",
                      marginTop: "3px",
                      display: "block",
                      width: "fit-content",
                      margin: "auto",
                    }
              }
            />
               <Box
              style={{
                width: "fit-content",
                margin: "15px auto",
                textAlign: "center",
                padding: ".7rem 1rem",
                borderRadius: "20px",
                color: "white",
                fontWeight: "700",
                cursor: "pointer",
              }}
              className={classes.btnPro}
            >
              <label
                htmlFor="upload-photo"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FiEdit style={{ marginRight: "8px" }} /> Edit Picture
              </label>
              <input
                type="file"
                id="upload-photo"
                accept="image/*"
                style={{ display: "none" }} // إخفاء زر التحميل
                onChange={(e) => {
                  getBase64(e.target.files[0], (result) => {
                    setProfilePic(result);
                  });
                }}
              />
            </Box>
          </Box>
        </Box>
        {/* End Profile Img */}
        {/* Start Name */}
        <Box mt={0} style={{ marginTop: "-15px" }}>
          <Grid  container spacing={1} alignItems="center" >
            <Grid item xs={12} >
              <label className={classes.title}>NickName</label>
            </Grid>
            <Grid item xs={12} className={classes.parentOfInput}>
              <TextField
                value={name}
                // error={!name}
                // helperText={!name && "Please enter valid name"}
                required="true"
                onChange={(e) => setname(e.target.value)}
                // className={classes.input_fild2}
                className={classes.inputField}
              />
            </Grid>
          </Grid>
        </Box>
        {/* End Name */}
        {/* Start Specilaity */}
        <Box mt={2} >
          <Grid container spacing={1} alignItems="center" >
            <Grid item xs={12}>
              <label className={classes.title}>Speciality</label>
            </Grid>
            <Grid item xs={12} className={classes.parentOfInput}>
              <TextField
                value={speciality}
                // error={!speciality}
                // helperText={!speciality && "Please enter valid speciality"}
                required="true"
                onChange={(e) => setspeciality(e.target.value)}
                // className={classes.input_fild2}
                className={classes.inputField}
              />

            </Grid>
          </Grid>
        </Box>
        {/* End Speciality */}

        {/* Start About Me */}
        <Box mt={2}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} >
              <label className={classes.title}>About me</label>
            </Grid>

            <Grid item xs={12} className={classes.parentOfInput}>

              <TextField
                // id="outlined-multiline-static"
                value={bio}
                // focused="true"
                // multiline
                // error={!bio}
                // helperText={!bio && "Please Fill in something about you"}
                required="false"
                onChange={(e) => setbio(e.target.value)}
                // className={classes.input_fild2}
                className={classes.inputField}
                
               
              />
            </Grid>
          </Grid>
        </Box>
        {/* End About Me */}

        {/* Start Email */}
        <Box mt={2}>
  <Grid container spacing={1} alignItems="center">
    <Grid item xs={12}>
      <label className={classes.title}>Email</label>
    </Grid>
    <Grid item xs={12} className={classes.parentOfInput}>
      {editingEmail ? (
        <TextField
          fullWidth
          variant="outlined"
          required={false}
          margin="normal"
          className={classes.inputField}

          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
      ) : (
        <TextField
          disabled={true}
          fullWidth
          variant="outlined"
          required={false}
          margin="normal"
          className={classes.inputField}

          value={user.userData?.email}
          style={{color :"white !important"}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {user.userData?.emailVerification ? (
                  <CheckCircleOutlineIcon fontSize="16" style={{ color: green[500] }} />
                ) : (
                  <Tooltip title="Email not verified" placement="right">
                    <ErrorOutlineIcon fontSize="16" style={{ color: red[500] }} />
                  </Tooltip>
                )}
                <IconButton color="primary" onClick={() => setEditingEmail(true)}>
                  <EditIcon fontSize="16" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
      {editingEmail ? (
  <>
    <IconButton onClick={handleSaveEmailClick} color="primary">
      <SaveIcon fontSize="16" style={{ color: 'green' }} />
    </IconButton>
    <IconButton onClick={handleCancelEmailClick} color="secondary">
      <CancelIcon fontSize="16" style={{ color: 'red' }} />
    </IconButton>
  </>
) : (
  <>
  </>
)}
    </Grid>
  </Grid>
        </Box>
        {/* End Email */}

        {/*Start  Phone Number */}
        <Box mt={2}>
         <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} md={0}>
          <label  className={classes.title}>Phone Number</label>
         </Grid>
         <Grid   item xs={12} className={classes.parentOfInput}>
      {editingPhone ? (
        <TextField
          defaultCountry="US"
          // fullWidth
          // variant="outlined"
          margin="normal"
          value={editedPhone}
          onChange={(e) => setEditedPhone(e.target.value)}
          className={classes.inputField}

        />
      ) : (
        <TextField
          defaultCountry="US"
          disabled={true}
          fullWidth
          variant="outlined"
          margin="normal"
          value={user.userData?.phone}
          className={classes.inputField}

          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {user.userData?.phoneVerification ? (
                  <CheckCircleOutlineIcon fontSize="16" style={{ color: green[500] }} />
                ) : (
                  <Tooltip title="Phone number not verified" placement="right">
                    <ErrorOutlineIcon fontSize="16" style={{ color: red[500] }} />
                  </Tooltip>
                )}
                <IconButton color="primary" onClick={() => setEditingPhone(true)}>
                  <EditIcon fontSize="16" />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      )}
          {editingPhone ? (
          <>
    <IconButton onClick={handleSavePhoneClick} color="primary">
      <SaveIcon fontSize="16" style={{ color: 'green' }} />
    </IconButton>
    <IconButton onClick={handleCancelPhoneClick} color="secondary">
      <CancelIcon fontSize="16" style={{ color: 'red' }} />
    </IconButton>
  </>
) : (
  <>
  </>
)}
    </Grid>
         </Grid>
        </Box>
        {/* End Phone Number */}

        {needVerification.length == 1 && <VerificationAlert verify={needVerification} />}

        {/* Start profile URL */}
        <Box mt={2}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12}>
              <label  className={classes.title} mb={1}>Profile URL</label>
            </Grid>
            <Grid item xs={12} className={classes.linkBox} mt={1} >
              <span >
                https://masplatform.net/user-profile/{user?.userData?.userName}
              </span>  &nbsp;
              <CopyToClipboard
                style={{ cursor: "pointer", }}
                text={`https://masplatform.net/user-profile/${user.userData?.userName}`}
              >
                <FiCopy onClick={() => toast.info("Profile url Copied")} />
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Box>
        {/* End Profile URL */}

        {/* Start Wllet Addrss */}
        <Box mt={2}>
          <Grid container spacing={1} alignItems="center"
          >
            <Grid  item xs={12} >
              <label  className={classes.title}>Wallet Address</label>
            </Grid>
            <Grid item xs={12} className={classes.linkBox} mt={1}>
              <span >
                {user.userData?.ethAccount?.address}
              </span> &nbsp;
              <CopyToClipboard
                style={{ cursor: "pointer" }}
                text={user.userData?.ethAccount?.address}
              >
                <FiCopy onClick={() => toast.info("Wallet Copied")} />
              </CopyToClipboard>
            </Grid>
          </Grid>
        </Box>
        {/* End Wallet Address */}

        {/* Start Referral  */}
        <Box mt={2}>
          <Grid container style={{ display: "block" }} alignItems="center">
            <Grid item xs={12}>
              <label  className={classes.title}>Referral</label>
            </Grid>
            <Grid item xs={12} className={classes.linkBox} mt={1}>
              <span >{user.userData?.referralCode}</span>
              &nbsp;
              <CopyToClipboard text={user.userData?.referralCode}>
                <FiCopy onClick={() => toast.info("Referral Code Copied")} />
              </CopyToClipboard>
            </Grid>

          </Grid>
        </Box>
        {/* End Referral */}

        {/* Start Social Medya */}
        <Box mt={4}>
          <SocialAccounts />
        </Box>
        {/* End Social Medya */}
        {/* Start buttons */}
        <Box>
          <Box className={classes.Button}>
            <Box className={classes.ButtonBtn}>
              <Button
                variant="contained"
                size="large"
                // color="primary"
                component={Link}
                to="/"
                disabled={isLoading}
                className={classes.btnOutPro}
              >
                Cancel
              </Button>
            </Box>
             {/* start Deletion Button */}
             <Box  className={classes.ButtonBtn2}>
               <Button
        variant="contained"
        size="large"
        color="secondary"
        disabled={isLoading}
        onClick={handleOpenDelete}
        className={classes.btnPro}
        style={{
          padding: "10px 20px!important",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        {isLoading ? "Delete..." : "Delete"}
               </Button>
               <Dialog
        open={openDeleteDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick ={deleteProfile}
            color="secondary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Confirm"}
          </Button>
        </DialogActions>
               </Dialog>
                </Box>
               {/* end Deletion Button */}

                {/* start deactivaite Button */}
            <Box className={classes.ButtonBtn3}>
             <Button
        variant="contained"
        size="large"
        color="secondary"
        disabled={isLoading}
        onClick={handleOpenDeactivate}
        className={classes.btnPro}
        style={{
          padding: "10px 20px!important",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        {isLoading ? 'deactivate...' : 'deactivate'}
             </Button>
             <Dialog
        open={openDeactivateDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Confirmation'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to deactivate your profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            buttonText="Deactivate"
            onClick={() => {deactivateProfile;auth.logOut();
              navigate('/login');}} 
            color="secondary"
            variant="contained"
            disabled={isLoading}
          >
            {isLoading ? 'deactivat...' : 'Confirm'}
            
          </Button>
        </DialogActions>
            </Dialog>
               </Box>
                 {/* end deactivaite Button */}
                 {/* start  kyc Button */}
                 <Box className={classes.ButtonBtn4}>
             <Button
        variant="contained"
        size="large"
        color="secondary"
        disabled={isLoading}
        onClick={() => navigate('/kyc')}
        className={classes.btnPro}
        style={{
          padding: "10px 20px!important",
          backgroundColor: "blue",
          color: "white",
        }}
      >
        {isLoading ? 'KYC...' : 'KYC'}
             </Button>
             <Dialog
        open={OpenKYCDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogContent style={{ width: '1000px', height: '800px' }}>
      <h2><div className={classes.kycFormContainer}>
      <h2>KYC Form</h2>
      <form className={classes.kycForm} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label>
            <span className={classes.span}>Name:</span>
            <input type="text" value={name} onChange={handleNameChange} className={classes.input} />
          </label>
        </div>
        <div className={classes.formGroup}>
          <label>
            <span className={classes.span}>Date of Birth:</span>
            <input type="text" value={dateOfBirth} onChange={handleDateOfBirthChange} className={classes.input} />
          </label>
        </div>
        <div className={classes.formGroup}>
          <label>
            <span className={classes.span}>Document:</span>
            <input type="file" name="document" onChange={handleFileChange} className={classes.input} />
          </label>
        </div>
      </form>
    </div></h2>
    <div>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <button onClick={takePicture}>Take Picture</button>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: 'auto' }} />
    </div>
    </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            buttonText="KYC"
            type="submit"
            onClick={handleSubmit}
            color="secondary"
            variant="contained"
            disabled={isLoading}
            
          >
            {isLoading ? 'KYC...' : 'Confirm'}
            
          </Button>
        </DialogActions>
            </Dialog>
               </Box>
                 {/* end kyc Button */}
            <Box className={classes.ButtonBtn1}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disabled={isLoading}
                onClick={updateProfile}
                className={classes.btnPro}
                style={{
                  padding: "10px 20px!important",
                  backgroundColor: "blue",
                  color: "white",
                }}
              >
                {isLoading ? "Updating..." : "Update"}
                {isLoading && <ButtonCircularProgress />}
              </Button>
            </Box>
          </Box>

        </Box>
        {/* End buttons */}
         
      </Container>
    </Box>
    
  );  
}

 
