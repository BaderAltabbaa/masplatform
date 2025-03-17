import React ,{Suspense,useState} from "react";
import useSWR from 'swr';
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Dialog, DialogTitle, DialogContent, DialogContentText ,TextField,Button,Container,Typography,Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { CgFacebook } from "react-icons/cg";
import { FaTelegram, FaTwitterSquare, FaDiscord, FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design
import { SiAppstore, SiGoogleplay } from "react-icons/si";
import './footer.css';
import { Link } from "react-router-dom";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";

const Footer = () => {
const fetcher = url => axios.get(url).then(res => res.data.result);
const { data: staticContent } = useSWR(Apiconfigs.staticContentList, fetcher, { suspense: true })
const { data: socialLinks } = useSWR(Apiconfigs.listSocial, fetcher, { suspense: true })
const [open, setOpen] = useState(false);
const [openForm, setOpenForm] = useState(false);

console.log("soc",socialLinks);
const [selectedItem, setSelectedItem] = useState(null);

const handleClickOpen = (item) => {
  setSelectedItem(item);
  setOpen(true);

};

const handleClose = () => {
  setOpen(false);
  setSelectedItem(null);
};

const handleFormOpen = (item) => {
  setSelectedItem(item);
  setOpenForm(true);
}

const handleCloseForm = () => {
  setOpenForm(false);
  setSelectedItem(null);
};

const scrollToTop = () => {
  window.scrollTo({top: 0 , behavior: "smooth"})
}


const ContactForm = () => {
  const [email , setEmail] = useState('');
  const [subject , setSubject ] = useState('');
  const [message , setMessage ] = useState('');
  const [openSnackBar ,setOpenSnackBar ] = useState(false);
  const [snackbarMessage, setSnackbarMessage ] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');


  const handleSubmit = async (e) => {
    e.preventDefault();
 

  const formspreeEndpoint = 'https://formspree.io/f/xeoajvaq';

  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('subject', subject);
  formData.append('message', message);

try {
  const response = await axios.post(formspreeEndpoint, formData ,{
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
    },
  });
  
  if(response.status === 200){
    setSnackbarMessage('Message sent successfully!');
    setSnackbarSeverity('success');
    setEmail('');
    setSubject('');
    setMessage('');
    console.log(response.data,"heeeeey");
  }
  else {
    setSnackbarMessage('Failed to send message. Please try again.');
    setSnackbarSeverity('error');
  }
}

catch(error){
  setSnackbarMessage('An error occurred. Please try again.');
  setSnackbarSeverity('error');
} 

finally {
  setOpenSnackBar(true);
}

  };


const handleCloseSnackbar = () => {
  setOpenSnackBar(false);
};

return (
  <Container maxWidth="sm">
    
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Subject"
        fullWidth
        margin="normal"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        required
      />
      <TextField
        label="Message"
        fullWidth
        margin="normal"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit" variant="contained"  fullWidth sx={{backgroundColor:"#43005e",marginTop:"10px" ,"&:hover":{backgroundColor:"rgb(99, 0, 139)"}}}>
        Submit
      </Button>
    </form>

    <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
       
      
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

    
  </Container>)

 }


  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(to right,rgb(40, 0, 38),rgb(74, 0, 79))",
        padding: "0px 20px 20px",
        color: "white",
        textAlign: "center",
        fontFamily: "'Arial', sans-serif",
        
      }}
      className="footer"
    >
        <Container maxWidth='xl'>

      <div
        style={{
          
        //   alignItems: "flex-start",

        }}
        className="footer-content"
      >
        {/* Logo Section */}
        <div style={{ textAlign: "center", marginBottom: "20px" ,display:"flex" ,flexDirection:"column",alignItems:"center"}}>
        <Link to="/" onClick={scrollToTop}>
          <img
            src="\assets\Images\masfooter-logo.svg"
            alt="Logo"
            style={{
              width: "150px",
              height: "150px",
              
            }}
          />
          </Link> 
          <h3 style={{ fontSize: "28px", fontWeight: "bold" }}>MAS Platform</h3>
        </div>



        {/* Marketplace Section */}
        <div>
        <ul style={styles.list}>
          <h3 style={styles.sectionHeader}></h3>
          {staticContent.slice(0, 3).map((row) => (
            <>     
            <li key={row.title} style={styles.listItem}  onClick={() => handleClickOpen(row)}>
                <span style={{cursor:"pointer"}}>{row.title}</span>
                <div style={styles.divider} />
                <div style={styles.dot} />
              </li>
             
            
            </> 
            ))}

{staticContent.slice(3, 4).map((row) => (
  <>  
            <li style={styles.listItem} onClick={() => handleFormOpen(row)}>
            <span style={{cursor:"pointer"}}>{row.title}</span>
                <div style={styles.divider} />
                <div style={styles.dot} />
            </li>
            </> 
            ))}
            </ul>
      

      <Dialog open={open} onClose={handleClose}  maxWidth="lg" fullWidth>
        <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color="#43005e">
          <h1>{selectedItem?.title}</h1>
          <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleClose}><AiOutlineClose/></div>
          </DialogTitle>
         <DialogContent>
    {selectedItem?.description ? ( // Check if description exists
      <DialogContentText>{selectedItem.description}</DialogContentText>
    ) : (
     <div style={{padding:"20px 60px"}}> <NoDataFound /> </div>// Render NoDataFound if no description
    )}
  </DialogContent>
      </Dialog>

        </div> 
           

        {/* My Account Section */}
        <div>
          <h3 style={styles.sectionHeader}></h3>
          <ul style={styles.list}>
          {staticContent.slice(4,6).map((row) => (
            <>
            <Link
                        style={{ color: 'white', textDecoration: 'none', }}
                        to={"/corporate/" + row.type}
                        state={{
                          data: {
                            title: row.title,
                            html: row.description
                          }
                        }}
                      >
                       
                     
            <li key={row.title} style={styles.listItem}>
                <span>{row.title}</span>
                <div style={styles.divider} />
                <div style={styles.dot} />
              </li>
              </Link>
            
            </>
              
            ))}

            
{staticContent.slice(6, 8).map((row) => (
            <>     
            <li key={row.title} style={styles.listItem}  onClick={() => handleClickOpen(row)}>
                <span style={{cursor:"pointer"}}>{row.title}</span>
                <div style={styles.divider} />
                <div style={styles.dot} />
              </li>
             
            
            </>
            
              
            ))}

          </ul>
          
        </div>
        

        {/* Community Section */}
        <div >
          <h3 style={{ ...styles.sectionHeader, marginBottom: "20px" }}>Join The Community</h3>
          <div style={styles.iconsContainer} className="iconContainer">
         
          <div  style={styles.iconContainer} >
          <Link to={socialLinks[0]?.link} target="_blank" rel="noreferrer">
              <FaFacebook  style={styles.icon}/>
            </Link>

            </div>



            <div  style={styles.iconContainer} >
          <Link to={socialLinks[3]?.link} target="_blank" rel="noreferrer">
              <FaTelegram  style={styles.icon}/>
            </Link>

            </div>


            

            <div  style={styles.iconContainer} >
          <Link to={socialLinks[2]?.link} target="_blank" rel="noreferrer">
              <AiOutlineClose  style={styles.icon}/>
            </Link>

            </div>
        
            <div  style={styles.iconContainer} >
          <Link to={socialLinks[1]?.link} target="_blank" rel="noreferrer">
              <FaDiscord  style={styles.icon}/>
            </Link>

            </div>

            
           
          </div>
        </div>
      </div>
      </Container>


      <Dialog open={openForm} onClose={handleCloseForm}  maxWidth="sm" fullWidth>
        <DialogTitle sx={{display:"flex" ,justifyContent:"space-between" ,alignItems:"center"}} color="#43005e">
          <h1>{selectedItem?.title}</h1>
          <div style={{fontSize:"20px",cursor:"pointer"}} onClick={handleCloseForm}><AiOutlineClose/></div>
          </DialogTitle>
         <DialogContent>
          <ContactForm/>
  </DialogContent>
      </Dialog>

    </footer>
  );
};

const styles = {
  sectionHeader: {
    marginBottom: "40px",
    fontSize: "22px",
    fontWeight: "bold",
    textShadow: "0px 0px 2px rgb(147, 128, 255), 0px 0px 5px rgb(12, 0, 81)",
  },
  list: {
    listStyle: "none",
    padding: 0,
    textAlign: "left",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    fontSize: "18px",
  },
  divider: {
    flexGrow: 1,
    height: "1px",
    backgroundColor: "white",
    margin: "0 10px",
  },
  dot: {
    width: "12px",
    height: "12px",
    background: "linear-gradient(to top right,rgb(111, 14, 98),rgb(79, 20, 116))",
    borderRadius: "50%",
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  icon: {
    color: "white",
    fontSize: "28px",
    transition: "transform 0.3s ease-in-out",
  },
  iconContainer: {
    background: "linear-gradient(to top,#180226, rgba(156, 51, 158, 0.7))",
    borderRadius: "50%",
    padding: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60px",
    height: "60px",
    cursor: "pointer",
    transition: "transform 0.3s",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export default Footer;
