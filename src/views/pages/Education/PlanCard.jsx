import React ,{useState ,useContext} from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design
import { UserContext } from "src/context/User";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { FiDownload } from "react-icons/fi";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";





const useStyles = makeStyles((theme) => ({

   
      
    
      heading: {
        background:"linear-gradient(to right, #280026, #4a004f)",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px",
        alignItems: "center",
        color: "#fff",
        borderRadius:"10px",
        [theme.breakpoints.down("xs")]: {
          padding: "10px",
        },
        "& img": {
          width: "60px",
          [theme.breakpoints.down("xs")]: {
            width: "20px",
          },
        },
        "& h6": {
          fontSize: "15px",
          fontWeight: "400",
          padding: "0 20px",
          [theme.breakpoints.down("xs")]: {
            padding: "0 5px",
            fontSize: "10px",
          },
        },
      },
      body: {
        position: "relative",
        zIndex: 2,
        padding: "20px",
        backgroundColor:"rgb(223, 223, 223)",
        marginBottom:"20px",
        borderRadius:"20px",
        boxShadow:" 0 4px 8px rgba(0, 0, 0,0.5)",
    
        [theme.breakpoints.down("xs")]: {
          padding: "50px 20px 60px 20px",
        },
        "& h5": {
          fontSize: "15px",
          fontWeight: "400",
          lineHeight: "1.53",
          color: "#141518",
        },
        "& h2": {
          fontSize: "23px",
          fontWeight: "600",
          lineHeight: "1.51",
          paddingLeft: "5px",
          color: "#141518",
          [theme.breakpoints.down("xs")]: {
            fontSize: "18px",
          },
        },
        "& img": {
          width: "30px",
          margin: "0 5px",
        },
      },
      
      certificateBox: {
        position: "relative",
      },
     
      certificate: {
        [theme.breakpoints.down("xs")]: {
          padding: "10px",
        },
      },
    
      downloadButton: {
        maxWidth: "100px",
        backgroundColor: "#a33748",
        borderRadius: "33px",
        color: "white",
        "&:hover": {
          backgroundColor: "red",
        },
      },
      nftImg: {
        width: "100%",
        overflow: "hidden",
        backgroundPosition: "center !important",
        backgroundSize: "cover !important",
        backgroundRepeat: " no-repeat !important",
        backgroundColor: "#ccc !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: " solid 0.5px #e5e3dd",}
}))



const PlanCard = ({ plan }) => {

    const [open, setOpen] = useState(false);
    const [openReceipt, setOpenReceipt] = useState(false);
    const auth = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const classes = useStyles();
    const [download, setDownload] = useState(false);
    const currentDate = new Date();
    let cHour = currentDate.getHours().toString().padStart(1, 0);
    cHour = cHour % 12 || 12;
    const ampm = cHour >= 12 ? "AM" : "PM";
    const cMin = currentDate.getMinutes().toString().padStart(2, 0);
    const cSec = currentDate.getSeconds().toString().padStart(2, 0);
    const cDay = currentDate.getDate();
    const cMonth = currentDate.getMonth() + 1;
    const cYear = currentDate.getFullYear();

  const cDate = `${cDay}/${cMonth}/${cYear}  ${cHour}:${cMin}:${cSec}${ampm}  `

console.log("auth",auth)

const handleOpen = () => {
    setOpen(true);
} 

const handleClose = () => {
    setOpen(false);
} 

const handleOpenReceipt = () => {
    setOpenReceipt(true);
} 

const handleCloseReceipt = () => {
    setOpenReceipt(false);
} 

const donloadBadge = () => {
    setDownload(true);
    const certificate = document.getElementById(`certificate_UI`);

    html2canvas(certificate, { useCORS: true, allowTaint: true }).then(
      (canvas) => {
        canvas.toBlob(
          function (blob) {
            const imgData = URL.createObjectURL(blob);

            var pdf = new jsPDF({
              orientation: "landscape",
            });
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(
              imgData,
              "JPEG",
              0,
              0,
              pdfWidth,
              pdfHeight,
              "",
              "FAST"
            );
            pdf.save(`1.pdf`);
            setDownload(false);
          },
          "image/jpeg",
          1.0
        );
      }
    );
  };
    
  return (

    <>
    <Card sx={{ maxWidth: 345, borderRadius:10,border:"2px solid rgb(255, 255, 255)"}}>
      {/* Top Section - Plan Name and Subtext */}
      <Box 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          background: (theme) => theme.custom.CarBackGround,
          color: "white"
        }}
      >
        <Typography variant="h2" component="div" gutterBottom color='white'>
          {plan.name}
        </Typography>
        <Typography variant="body2" color='white'>
          {plan.subtext}
        </Typography>
      </Box>

      {/* Middle Section - Price and Benefits */}
      <CardContent sx={{ textAlign: 'center' }}>
        <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', my: 1 ,color:"#2f0032" }}>
          {plan.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {plan.billingCycle}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List>
          {plan.features.map((feature, index) => (
            <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                <CheckIcon color="primary" fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">
                {feature}
              </Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Bottom Section - Buy Now Button */}
      <Box sx={{ p: 2, textAlign: 'center' ,background: (theme) => theme.custom.CarBackGround}}>
        <Button 
          variant="contained" 
          
          size="large"
          sx={{ py: 1.5, borderRadius: 10 ,backgroundColor:"#2f0032" ,fontWeight:"bold",
            "&:hover":{
                backgroundColor:"#3e0142"
            }
           }}
          onClick={handleOpen}
        >
          Buy Now
        </Button>
      </Box>
    </Card>


<Dialog open={open} onClose={handleClose}  disableScrollLock  fullWidth maxWidth="sm" PaperProps={{
  sx: {
    backgroundImage: 'url(/assets/Images/doodle2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }
}}>
    <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color=" #43005e"> 
        <span style={{
                      fontSize:"24px" ,fontWeight:"bold"
                    }}>{plan.name}</span>
                    <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleClose}><AiOutlineClose/></div>
    </DialogTitle>
    <DialogContent>
         <Box sx={{
                               background:"rgba(255, 255, 255, 0.68)",
                               padding:"10px",
                               borderRadius:"20px"
                             }}>
    <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', my: 1,color:"#2f0032" }}>
          {plan.price}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {plan.billingCycle}
        </Typography>
        <Divider sx={{ my: 2 }} />

<List>
  {plan.features.map((feature, index) => (
    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
      <ListItemIcon sx={{ minWidth: 30 }}>
        <CheckIcon color="primary" fontSize="small" />
      </ListItemIcon>
      <Typography variant="body2">
        {feature}
      </Typography>
    </ListItem>
  ))}
</List>
        </Box>
    </DialogContent>
    <DialogActions   sx={{display:"flex" ,justifyContent:"center" ,alignItems:"center"}}>
        {!auth.userLoggedIn ? (
                    <Box textAlign="center">
                      <Button 
                       
                      onClick={handleClose}
                      style={{background:"#2f0032",color:"white" }}
        
                      >
                        Cancel
                      </Button>
                      &nbsp;&nbsp;
                      <Button
                        onClick={() => {
                            navigate("/login");
                          }}
                        style={{background:"#2f0032",color:"white" }}
        
                      >
                        Login
                      </Button>
                    </Box>
                  ) :
                  
                  (<>
                  <Box  textAlign="center">
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    style={{ background:"#2f0032",color:'white'}}
                  
                                    onClick={() => {
                                      handleClose();
                                    }}
                                  >
                                  Cancel
                  
                                  </Button>
                                  &nbsp;&nbsp;

                                  <Button
                                        variant="contained"
                                        color="secondary"
                                        size="large"
                                        style={{ background:"#2f0032",color:'white'}}
                  
                                        onClick={handleOpenReceipt}
                                      
                                      >
                                       Buy Plan
                                      </Button>
                                      </Box></>)
                  }


                

    </DialogActions>
</Dialog>


<Dialog open={openReceipt} onClose={handleCloseReceipt}  disableScrollLock  fullWidth maxWidth="md" PaperProps={{
  sx: {
    backgroundImage: 'url(/assets/Images/doodle2.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }
}}>

    <Box id="certificate_UI">
    <DialogContent className={classes.certificate}>
                 <Box className={classes.certificateBox}>
                   
                   <Box className={classes.body} align="start">
        <Box className={classes.heading} mb={2}>
                          <img src="\assets\Images\masfooter-logo.svg"  style={{width:"50px"}}/>
                          <Typography align="center" sx={{color:"white" ,fontSize:"24px" ,fontWeight:"bold" ,
                            "@media(max-width:700px)":{
                              fontSize:"16px"
                            }
                          }}>
                          {t("Transaction Receipt")}
                          </Typography>
                          <img src="\assets\Images\masfooter-logo.svg"  style={{width:"50px"}}/>
                        </Box>
                        <Box overflow='hidden'>
                           <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Name")}:   {auth.userData.name}

                          </Typography>
                          </Box> 

                          <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Email")}:  <Typography sx={{
                                fontSize:"20px",
                                "@media(max-width: 800px)":{
                      fontSize:"14px"
                    }
                              }}> {auth.userData.email} </Typography>

                          </Typography>
                          </Box>

                          <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Wallet")}: <Typography sx={{
                                fontSize:"20px",
                                "@media(max-width: 800px)":{
                      fontSize:"14px"
                    }
                              }}>{auth.userData.walletAddress}</Typography>  

                          </Typography>
                          </Box>

                          <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Plan")}:  {plan.name}

                          </Typography>
                          </Box>

                         <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Amount")}:  {plan.price}

                          </Typography>
                          </Box>

                          <Box my={2}>
                          <Typography variant="h3" sx={{ marginRight: "5px" }}>
                              {t("Date")}:  {cDate}

                          </Typography>
                          </Box>
                          </Box>
                        </Box>
                        </Box>
    </DialogContent>
    </Box>
     <Box
                mt={2}
                pb={4}
                sx={{ width: "100%", maxWidth: "200px", margin: "auto",display:"flex",alignItems:"center",justifyContent:"center" }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={donloadBadge}
                  disabled={download}
                  sx={{
                    backgroundColor:"#4a004f",
                    "&:hover":{
                      backgroundColor:"rgb(112, 2, 120)"
                    }
                  }}
                >
                  {t("Download")} <FiDownload /> {download && <ButtonCircularProgress />}
                </Button>
              </Box>
</Dialog>



    </>
  );
};

export default PlanCard