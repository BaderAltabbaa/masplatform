import React, { useContext, useState, useEffect ,useRef } from "react";
import {
  Box,
  Container,
  Button,
  TextField,
  DialogTitle,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design
import { isValidPhoneNumber } from "react-phone-number-input";
import { MuiTelInput } from 'mui-tel-input'
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import useSWR from 'swr';
import axios from "axios";
import { isValidPassword, isValidEmail } from "src/CommanFunction/Validation";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { isMobile } from "react-device-detect";
import { UserContext } from "src/context/User";
import Apiconfigs from "src/Apiconfig/Apiconfigs.js";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { VerifyOtp } from "src/component/Modals/VerifyOtp";
import './register.css'
import { useTranslation } from 'react-i18next';
import NoDataFound from "src/component/NoDataFound";




const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  loginBox: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e5e5f7",
  },

  splash: {
    width: isMobile ? '100%' : '50vw',
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  labelText: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#000",
  },
  inputText: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      border: "solid 1px #4441",
      borderRadius: "20px",
      backgroundColor: "#fafafa",
    },
    "& .MuiOutlinedInput-input": {
      padding: '10px',
      fontSize: "14px",
      fontWeight: "500",
      color: "#000",
    }
  },
  paper: {
    display: "flex",
    alignItems: "center",
    "& a": {
      fontWeight: "700",
      textDecoration: "underline",
      fontSize: "13px",
      color: "#000",
      marginLeft: "4px"
    },
    "& label": {
      paddingTop: "0 !important",
      color: " #141518",
      fontSize: "13px",
    },
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const user = useContext(UserContext);

            const {t} = useTranslation();


  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [pass, setpass] = useState("");
  const [uservalid, setuservalid] = useState(true);
  const [emailvalid, setemailvalid] = useState(true);
  const [phonevalid, setphonevalid] = useState(true);
  const [passvalid, setpassvalid] = useState(true);

  const [show, setshow] = useState(false);
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  const [loader, setloader] = useState(false);
  const [termsPopUp, setTermsPopUp] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [state, setState] = useState({
    all: false,
    termsCond: false,
    privacyPolicy: true,
    riskStatment: false,
    kycProgram: true,
  });

  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [smsVerificationSent, setSmsVerificationSent] = useState(false);

  const validateAll = () => {
    setuservalid(username.length > 2);
    setemailvalid(isValidEmail(email));
    setphonevalid(phone == "" || isValidPhoneNumber(phone));
    setpassvalid(isValidPassword(pass));
    return (username.length > 2) && isValidEmail(email) && (phone == "" || isValidPhoneNumber(phone)) && isValidPassword(pass);
  }

  const sendOtpRegister = async () => {
    // Check if user is already logged in and verification was sent
    if (user.userLoggedIn && (emailVerificationSent || smsVerificationSent)) {
      setTermsPopUp(false);
      setVerifyOTPOpen(true);
      return;
    }

    // Validate all required fields before sending the request
    if (!validateAll()) {
      setTermsPopUp(false);
      setVerifyOTPOpen(false);
      return;
    }

    // Show loader while the request is being processed
    setloader(true);

    try {
      const res = await axios.post(Apiconfigs.sendOtpRegister, {
        email: email,
      });

      if (res.data.statusCode === 200) {
        setEmailVerificationSent(res.data.result.email_verification_sent);
        setSmsVerificationSent(res.data.result.sms_verification_sent);
        setVerifyOTPOpen(true);
        setTermsPopUp(false);
      } else {
        // Handle different statuses here, if needed
        console.error("Request completed, but status code is not 200", res.data);
      }
    } catch (e) {
      console.error("Error in sendOtpRegister", e);
      // Display error notification to the user, if you have such functionality
    }

    // Hide loader after the request is completed
    setloader(false);
  };


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: !state[event.target.name] });
  };
  const { termsCond, privacyPolicy, riskStatment, kycProgram, all } = state;

    const cacheRef = useRef({});
  

    const wrappedFetcher = async (url) => {
    const cacheKey = `cache-${url}`;
    const sessionData = sessionStorage.getItem(cacheKey);

    // 1. Check in-memory cache
    if (cacheRef.current[cacheKey]) {
      console.log("✅ Using in-memory cache for", cacheKey);
      return cacheRef.current[cacheKey];
    }

    // 2. Check sessionStorage
    if (sessionData) {
      console.log("✅ Using sessionStorage cache for", cacheKey);
      const parsed = JSON.parse(sessionData);
      cacheRef.current[cacheKey] = parsed; // sync to memory
      return parsed;
    }

    // 3. Fetch from API
    console.log("⏬ Fetching fresh data for", cacheKey);
    const res = await axios.get(url, {
      headers: {
        token: sessionStorage.getItem("token"),
      },
    });

    const result = res.data.result;

    // Store in memory and sessionStorage
    cacheRef.current[cacheKey] = result;
    sessionStorage.setItem(cacheKey, JSON.stringify(result));

    return result;
  };

  const { data: staticContent } = useSWR(Apiconfigs.staticContentList, wrappedFetcher, { suspense: true });

  console.log("regggg", staticContent);

  const [selectedItem ,setSelectedItem] = useState(null);
  const [open , setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };


  return (
    <div dir="ltr" className='SignupStyle'>
      
      <section className="section2">
        <form>
          <span className="reg-header">{t("CREATE YOUR ACCOUNT")}</span>
          <div className="mar">

            <TextField
              className="auth-input"
              variant="standard"
              fullWidth
              label={t("Username")}
              required
              autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
              value={username}
              error={!uservalid}
              helperText={!uservalid && t("Please enter username")}
              inputProps={{maxLength: 16}}
              onChange={(e) => {
                setusername(e.target.value);
                setuservalid(e.target.value.length > 2);
              }}
              onBlur={(e) => setuservalid(e.target.value.length > 2)}
            />

          </div>
          <div className="mar">
            <TextField
              className="auth-input"
              variant="standard"
              fullWidth
              label={t("Email")}
              required
              error={!emailvalid}
              helperText={!emailvalid && t("Please enter valid email address")}
              value={email}
              autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
              type="email"
              onChange={(e) => {
                setemail(e.target.value);
                setemailvalid(isValidEmail(e.target.value));
              }}
              onBlur={(e) => setemailvalid(isValidEmail(e.target.value))}
            />

          </div>
          <div className="mar">

            <div style={{ display: 'flex' }}>

              <MuiTelInput
                className="auth-input"
                variant="standard"
                fullWidth
                label={t("Phone Number")}
                defaultCountry="US"
                disableFormatting
                required
                autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
                error={!phonevalid}
                helperText={!phonevalid && t("Please enter valid phone number")}
                value={phone}
                type="tel"
                onChange={(e) => {
                  setphone(e);
                  setphonevalid(phone == "" || isValidPhoneNumber(e));
                }}
                onBlur={() => setphonevalid(phone == "" || isValidPhoneNumber(phone))}
              />

            </div>


          </div>
          <div className="mar" >

            <TextField
              variant="standard"
              className="auth-input"
              fullWidth
              autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
              label={t("Password")}
              type={show ? "text" : "password"}
              error={!passvalid}
              helperText={
                !passvalid && t("Password must contain at least 8 characters, one uppercase, one number and one special case character")
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setshow(!show)}
                      sx={{
                        color: "white", 
                      }}
                    >
                      {show ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                setpass(e.target.value);
                setpassvalid(isValidPassword(e.target.value));
              }}
              onBlur={() => setpassvalid(isValidPassword(pass))}

            />

          </div>
          <div className="mar" >
            <TextField
              variant="standard"
              className="auth-input"
              fullWidth
              autoComplete="off"
              sx={{ '& .MuiFormHelperText-root':{
                color:"red"
              }}}
              label={t("Referral Code")}
              name="Referral"
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
                 <Button
                 className="primaryButton"
                variant="contained"
                fullWidth
                size="large"
                onClick={() => {
                  if (validateAll()) setTermsPopUp(true);
                }}
                disabled={loader || !uservalid || !emailvalid || !phonevalid || !passvalid}
              >
                {t("Sign up")} {loader && <ButtonCircularProgress/>} </Button>
        
          <div className="register">
            <p>{t("Already have an account?")} <Link to="/login">{t("Login")}</Link></p> {/* استخدام Link هنا */}
          </div>


        </form>

            <Dialog
          open={termsPopUp}
          keepMounted
          maxWidth="sm"
          onClose={() => setTermsPopUp(false)}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              <Box>
                <Typography
                  variant="h2"
                  sx={{ color: (theme) => theme.custom.mainButton, marginBottom: "10px", textAlign: 'center' }}
                >
                  Last step to create your account
                </Typography>
                <Typography
                  variant="body"
                  component="p"
                  align="center"
                  style={{ fontSize: "14px" }}
                >
                  Before creating your account, you should agree to our terms
                  and conditions, privacy policy and risk disclosure statements.
                </Typography>
              </Box>
              <Box className={classes.paper} mt={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsCond}
                      onChange={handleChange}
                      name="termsCond"
                      sx={{
                         // Default color
                        '&.Mui-checked': {
                          color: (theme) => theme.custom.mainButton, // Color when checked
                        },
                      }}
                      
                    />
                  }
                />
                <label>
                  I have read and agree to. 
                </label>
                 <Box onClick={() => {setSelectedItem(staticContent[0]),setOpen(true)}} sx={{cursor:"pointer"}}>
                    {staticContent[0].title}
                  </Box>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privacyPolicy}
                      onChange={handleChange}
                      name="privacyPolicy"
                      sx={{
                        // Default color
                       '&.Mui-checked': {
                         color: (theme) => theme.custom.mainButton, // Color when checked
                       },
                     }}
                    />
                  }
                />
                <label>
                  I have read and agree to. 
                </label>
                <Box onClick={() => {setSelectedItem(staticContent[1]),setOpen(true)}} sx={{cursor:"pointer"}}>
                    {staticContent[1].title}
                  </Box>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={riskStatment}
                      onChange={handleChange}
                      name="riskStatment"
                      sx={{
                        // Default color
                       '&.Mui-checked': {
                         color: (theme) => theme.custom.mainButton, // Color when checked
                       },
                     }}
                    />
                  }
                />
                <label>
                  I have read and agree to. 
                </label>
                <Box onClick={() => {setSelectedItem(staticContent[6]),setOpen(true)}} sx={{cursor:"pointer"}}>
                    {staticContent[6].title}
                  </Box>
              </Box>
              <Box className={classes.paper}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={kycProgram}
                      onChange={handleChange}
                      name="kycProgram"
                      sx={{
                        // Default color
                       '&.Mui-checked': {
                         color: (theme) => theme.custom.mainButton, // Color when checked
                       },
                     }}
                    />
                  }
                />
                <label>
                  I have read and agree to. 
                </label>
                 <Box onClick={() => {setSelectedItem(staticContent[7]),setOpen(true)}} sx={{cursor:"pointer"}}>
                    {staticContent[7].title}
                  </Box>
              </Box>
              <Box className={classes.btBox} mt={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                    sx={{
                      // Default color
                     '&.Mui-checked': {
                       color: (theme) => theme.custom.mainButton, // Color when checked
                     },
                   }}
                      checked={all}
                      onChange={() => {
                        if (state.all) {
                          setState({
                            ...state,
                            all: false,
                            termsCond: false,
                            privacyPolicy: false,
                            riskStatment: false,
                            kycProgram: false,
                          });
                        } else {
                          setState({
                            ...state,
                            all: true,
                            termsCond: true,
                            privacyPolicy: true,
                            riskStatment: true,
                            kycProgram: true,
                          });
                        }
                      }}
                      name="all"
                    />
                  }
                />
                <label>I have Read and agree to all.</label>
              </Box>

              <Box mt={2}  pb={3} className={classes.btBox}>
                <Button
                  variant="contained"
                  size="large"
                  color="secondary"
                  sx={{
                  
                    
                     backgroundColor: (theme) => theme.custom.mainButton, 
                     "&:hover":{
                       backgroundColor: 'rgb(80, 1, 104)'
                     }
                   
                 }}
                  disabled={
                    loader ||
                    !state.termsCond ||
                    !state.privacyPolicy ||
                    !state.riskStatment ||
                    !state.kycProgram
                  }
                  onClick={() => {
                    if (
                      state.termsCond &&
                      state.privacyPolicy &&
                      state.riskStatment &&
                      state.kycProgram
                    ) {
                      sendOtpRegister();
                      setVerifyOTPOpen(true);
                      setTermsPopUp(false);
                    }
                  }}
                >
                  Continue
                </Button>
              </Box>
            </DialogContentText>
          </DialogContent>
        </Dialog>


        <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth disableScrollLock={true}
                  >
                    <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: (theme) => theme.custom.mainButton }}>
                      <span style={{
                        fontSize: "24px"
                      }}>{selectedItem?.title}</span>
                      <div style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleClose}><AiOutlineClose /></div>
                    </DialogTitle>
                    <DialogContent>
        
                      {selectedItem?.description ? ( // Check if description exists
                        <DialogContentText>{selectedItem.description}</DialogContentText>
                      ) : (
                        <div style={{ padding: "20px 60px" }}> <NoDataFound /> </div>// Render NoDataFound if no description
                      )}
                    </DialogContent>
                  </Dialog>

          <VerifyOtp
        keepMounted
        open={verifyOTPOpen}
        handleClose={()=> setVerifyOTPOpen(false)}
        channels={['email']}
        context={'register'}
        emailVerificationSent={emailVerificationSent}
        smsVerificationSent={smsVerificationSent}
        successCallback={async ()=> {
          setVerifyOTPOpen(false);
          await user.updateUserData();
          navigate('/profilesettings')
        }}
        signUpData={{username: username, password: pass, email: email, phone: phone, referralCode: referralCode}}
      />

    
      </section>
    </div>
   
  );
}
