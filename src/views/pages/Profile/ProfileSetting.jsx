import React, { useState, useContext, useEffect } from "react";
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
  DialogTitle,
  Avatar,
  Card,
  CardContent,
  Typography,
  Divider,
  Paper,
  Alert,
  AlertTitle,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import axios from "axios";
import { FiCopy, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { CheckCircleOutline, ErrorOutline, Edit, Save, Cancel } from '@mui/icons-material';

// Project imports
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import SocialAccounts from "./SocialAccounts";
import { VerifyOtp } from "src/component/Modals/VerifyOtp";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";

// Styled Components


const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 180,
  height: 180,
  border: `4px solid ${theme.palette.common.white}`,
  margin: '-120px 0 0 0',
  boxShadow: theme.shadows[6],
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "black",
  display: 'flex',
  alignItems: 'center',
  '&:after': {
    content: '""',
    flex: 1,
    height: 1,
    backgroundColor: theme.palette.divider,
    marginLeft: theme.spacing(2),
  },
}));

const VerificationAlert = ({ verify }) => {
  const user = useContext(UserContext);
  const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
  
  return (
    <Box sx={{ mb: 1 ,width:"fit-content"}}>
      <Alert severity="error" variant="filled">
        <AlertTitle>Security Verification</AlertTitle>
        To secure your account and enjoy full MAS Platform features please verify
        {' '}
        {verify.includes('email') && 'your email address '}
        {verify.length > 1 && ' and '}
        {verify.includes('sms') && 'your phone number '}
        <Button
          variant="text"
          onClick={() => setVerifyOTPOpen(true)}
          sx={{ color: "white",textDecoration:"underline" }}
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
  );
};

const ProfileSettings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.userProfileData?.name || '',
    speciality: user.userProfileData?.speciality || '',
    bio: user.userProfileData?.userbio || '',
    profilePic: user.userProfileData?.userprofilepic || '',
    cover: user.userProfileData?.usercover || ''
  });
  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editedPhone, setEditedPhone] = useState(user.userData?.phone || '');
  const [editedEmail, setEditedEmail] = useState(user.userData?.email || '');
  const [needVerification, setNeedVerification] = useState([]);
  const [dialogOpen, setDialogOpen] = useState({
    delete: false,
    deactivate: false
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (field) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, [field]: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // API calls
  const updateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: Apiconfigs.updateprofile,
        headers: { token: sessionStorage.getItem("token") },
        data: {
          ...formData,
          facebook: user.link.userfacebook,
          twitter: user.link.usertwitter,
          youtube: user.link.useryoutube,
          telegram: user.link.usertelegram,
        }
      });
      
      if (response.data.statusCode === 200) {
        toast.success("Profile updated successfully");
        user.updateUserData();
        window.location.reload()

      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.responseMessage || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEmailClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: Apiconfigs.updateprofile,
        headers: { token: sessionStorage.getItem("token") },
        data: { email: editedEmail }
      });
      
      if (response.data.statusCode === 200) {
        toast.success("Email updated successfully");
        user.updateUserData();
        setEditingEmail(false);
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.responseMessage || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePhoneClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: Apiconfigs.updateprofile,
        headers: { token: sessionStorage.getItem("token") },
        data: { phone: editedPhone }
      });
      
      if (response.data.statusCode === 200) {
        toast.success("Phone number updated successfully");
        user.updateUserData();
        setEditingPhone(false);
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.responseMessage || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "DELETE",
        url: Apiconfigs.deleteProfile,
        headers: { token: sessionStorage.getItem("token") }
      });
      
      if (response.data.statusCode === 200) {
        toast.success("Profile deleted successfully");
        user.logOut();
        navigate('/create-account');
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.responseMessage || error.message);
    } finally {
      setIsLoading(false);
      handleDialog('delete', false)();
    }
  };

  const deactivateProfile = async () => {
    setIsLoading(true);
    try {
      const response = await axios({
        method: "PUT",
        url: Apiconfigs.deactivateProfile,
        headers: { token: sessionStorage.getItem("token") }
      });
      
      if (response.data.statusCode === 200) {
        toast.success("Profile deactivated successfully");
        user.logOut();
        navigate('/login');
      } else {
        toast.error(response.data.responseMessage);
      }
    } catch (error) {
      toast.error(error.response?.data?.responseMessage || error.message);
    } finally {
      setIsLoading(false);
      handleDialog('deactivate', false)();
    }
  };

  const handleDialog = (type, open) => () => {
    setDialogOpen(prev => ({ ...prev, [type]: open }));
  };

  // Verification check
  useEffect(() => {
    if (user.isLogin && user.userData._id) {
      const verify = [];
      if (!user.userData.emailVerification) verify.push('email');
      if (!user.userData.phoneVerification) verify.push('sms');
      setNeedVerification(verify);
    }
  }, [user]);

  // Initialize form data
  useEffect(() => {
    if (user.userProfileData) {
      setFormData({
        name: user.userProfileData.name || '',
        speciality: user.userProfileData.speciality || '',
        bio: user.userProfileData.userbio || '',
        profilePic: user.userProfileData.userprofilepic || '',
        cover: user.userProfileData.usercover || ''
      });
      setEditedPhone(user.userData?.phone || '');
      setEditedEmail(user.userData?.email || '');
    }
  }, [user.userProfileData, user.userData]);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Cover Photo Section */}
      <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
        <Box
          component="img"
          src={formData.cover || "/images/default-cover.jpg"}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'brightness(0.8)'
          }}
          alt="Cover"
        />
        <Box sx={{ 
          position: 'absolute', 
          bottom: 16, 
          right: 16,
          display: 'flex',
          gap: 1
        }}>
          <Button
            component="label"
            variant="contained"
            size="small"
            startIcon={<FiEdit />}
            sx={{
              bgcolor: 'rgba(0,0,0,0.7)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' }
            }}
          >
            {t("Edit Cover")}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange('cover')}
            />
          </Button>
        </Box>
      </Box>

      <Box p={4} >
        <Box sx={{ 
          display: 'flex', 
  alignItems: 'center',
  gap: 1, // Adds spacing between avatar and button
  justifyContent: 'center',
  flexWrap: 'wrap' // Allows wrapping on small screens
        }}>
                <ProfileAvatar
                  src={formData.profilePic || "/images/users/profilepic1.svg"}
                  alt="Profile"
                />
               <IconButton 
   component="label"
    color="primary"
    sx={{
      bgcolor: 'rgba(0,0,0,0.7)',
      '&:hover': { 
        bgcolor: 'rgba(0,0,0,0.9)',
      },
      width: 40,
      height: 40,
    }}
  >
    <FiEdit fontSize="large" color="white" />
    <input
      type="file"
      hidden
      accept="image/*"
      onChange={handleFileChange('profilePic')}
    />
</IconButton>
              </Box>

               <Grid container spacing={3} sx={{ mt: 2 }}>
              {/* Basic Information */}
             
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("Username")}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("Speciality")}
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label={t("About me")}
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12}>
                <SectionTitle variant="h6">{t("Contact Information")}</SectionTitle>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("Email")}
                  value={editingEmail ? editedEmail : user.userData?.email}
                  onChange={(e) => setEditedEmail(e.target.value)}
                  variant="outlined"
                  disabled={!editingEmail}
                   InputLabelProps={{
    shrink: true, // This forces the label to always appear above the field
  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {user.userData?.emailVerification ? (
                          <CheckCircleOutline color="success" fontSize="small" />
                        ) : (
                          <Tooltip title="Email not verified">
                            <ErrorOutline color="error" fontSize="small" />
                          </Tooltip>
                        )}
                        {editingEmail ? (
                          <>
                            <IconButton onClick={() => {
                              setEditingEmail(false);
                              setEditedEmail(user.userData?.email);
                            }}>
                              <Cancel color="error" fontSize="small" />
                            </IconButton>
                            <IconButton onClick={handleSaveEmailClick}>
                              <Save color="primary" fontSize="small" />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton onClick={() => setEditingEmail(true)}>
                            <Edit color="primary" fontSize="small" />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("Phone Number")}
                  value={editingPhone ? editedPhone : user.userData?.phone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                  variant="outlined"
                  disabled={!editingPhone}
                   InputLabelProps={{
    shrink: true, // This forces the label to always appear above the field
  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {user.userData?.phoneVerification ? (
                          <CheckCircleOutline color="success" fontSize="small" />
                        ) : (
                          <Tooltip title="Phone not verified">
                            <ErrorOutline color="error" fontSize="small" />
                          </Tooltip>
                        )}
                        {editingPhone ? (
                          <>
                            <IconButton onClick={() => {
                              setEditingPhone(false);
                              setEditedPhone(user.userData?.phone);
                            }}>
                              <Cancel color="error" fontSize="small" />
                            </IconButton>
                            <IconButton onClick={handleSavePhoneClick}>
                              <Save color="primary" fontSize="small" />
                            </IconButton>
                          </>
                        ) : (
                          <IconButton onClick={() => setEditingPhone(true)}>
                            <Edit color="primary" fontSize="small" />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {needVerification.length > 0 && (
                <Grid item xs={12}>
                  <VerificationAlert verify={needVerification} />
                </Grid>
              )}

              {/* Account Information */}
              <Grid item xs={12}>
                <SectionTitle variant="h6">{t("Account Information")}</SectionTitle>
              </Grid>

              <Grid item xs={12}>
                <Box display={"flex"} flexDirection={"column"} gap={1} justifyContent={"center"}>
                  <Typography variant="body1" ml={1}>Profile Link</Typography>
                
                <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">
                    https://masplatform.net/user-profile/{user?.userData?.userName}
                  </Typography>
                  <CopyToClipboard
                    text={`https://masplatform.net/user-profile/${user.userData?.userName}`}
                    onCopy={() => toast.info("Profile URL copied")}
                  >
                    <IconButton size="small">
                      <FiCopy />
                    </IconButton>
                  </CopyToClipboard>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
              <Box display={"flex"} flexDirection={"column"} gap={1} justifyContent={"center"}>
                  <Typography variant="body1" ml={1}>Wallet Address</Typography>
                <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2" noWrap sx={{ maxWidth: '80%', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.userData?.ethAccount?.address}
                  </Typography>
                  <CopyToClipboard
                    text={user.userData?.ethAccount?.address}
                    onCopy={() => toast.info("Wallet address copied")}
                  >
                    <IconButton size="small">
                      <FiCopy />
                    </IconButton>
                  </CopyToClipboard>
                </Paper>
                </Box>
              </Grid>

              <Grid item xs={12}>
                 <Box display={"flex"} flexDirection={"column"} gap={1} justifyContent={"center"}>
                  <Typography variant="body1" ml={1}>Referral Code</Typography>
                <Paper variant="outlined" sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">
                    {user.userData?.referralCode}
                  </Typography>
                  <CopyToClipboard
                    text={user.userData?.referralCode}
                    onCopy={() => toast.info("Referral code copied")}
                  >
                    <IconButton size="small">
                      <FiCopy />
                    </IconButton>
                  </CopyToClipboard>
                </Paper>
                </Box>
              </Grid>

              {/* Social Accounts */}
              <Grid item xs={12}>
                <SocialAccounts />
              </Grid>
            </Grid>
        {/* Profile Card */}
       
         

          {/* Action Buttons */}
          <Box sx={{ 
            p: 2, 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            justifyContent: 'center',
            borderTop: `1px solid ${theme.palette.divider}`
          }}>
            <Button
              variant="outlined"
              
              component={Link}
              to="/"
              disabled={isLoading}
              sx={{ minWidth: 120 ,
                color:(theme) => theme.custom?.mainButton,
                borderColor: (theme) => theme.custom?.mainButton,
              }}
            >
              {t("Cancel")}
            </Button>

              <Button
              variant="outlined"
              color="error"
              disabled={isLoading}
              onClick={handleDialog('deactivate', true)}
              sx={{ minWidth: 120 }}
            >
              {t("Deactivate")}
            </Button>

             <Button
              variant="contained"
              color="error"
              disabled={isLoading}
              onClick={handleDialog('delete', true)}
              sx={{ minWidth: 120 }}
            >
              {t("Delete")}
            </Button>

            <Button
              variant="contained"
              color="primary"
              disabled={isLoading}
              onClick={() => navigate('/kyc')}
              sx={{ minWidth: 120 ,background:(theme) => theme.custom?.mainButton}}
            >
              KYC
            </Button>

             <Button
              variant="contained"
              color="secondary"
              disabled={isLoading}
              onClick={updateProfile}
              sx={{ minWidth: 120,background:(theme) => theme.custom?.mainButton }}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? t("Updating...") : t("Update")}
            </Button>
          </Box>
       
      </Box>

      {/* Confirmation Dialogs */}
      <Dialog
        open={dialogOpen.delete}
        onClose={handleDialog('delete', false)}
      >
        <DialogTitle>{t("Delete Account")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to permanently delete your account? This action cannot be undone.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog('delete', false)} color="primary">
            {t("Cancel")}
          </Button>
          <Button 
            onClick={deleteProfile} 
            color="error"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? t("Deleting...") : t("Delete")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={dialogOpen.deactivate}
        onClose={handleDialog('deactivate', false)}
      >
        <DialogTitle>{t("Deactivate Account")}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("Are you sure you want to deactivate your account? You can reactivate it later by logging in.")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialog('deactivate', false)} color="primary">
            {t("Cancel")}
          </Button>
          <Button 
            onClick={deactivateProfile} 
            color="secondary"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
          >
            {isLoading ? t("Deactivating...") : t("Deactivate")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfileSettings;