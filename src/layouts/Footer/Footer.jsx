import React ,{Suspense,useState} from "react";
import useSWR from 'swr';
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";

import { CgFacebook } from "react-icons/cg";
import { FaTelegram, FaTwitterSquare, FaDiscord, FaFacebook } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai"; // Close icon from Ant Design

import { SiAppstore, SiGoogleplay } from "react-icons/si";
import './footer.css';
import Container from '@mui/material/Container'
import { Link } from "react-router-dom";
import axios from "axios";
import NoDataFound from "src/component/NoDataFound";


const Footer = () => {
const fetcher = url => axios.get(url).then(res => res.data.result);
const { data: staticContent } = useSWR(Apiconfigs.staticContentList, fetcher, { suspense: true })
const { data: socialLinks } = useSWR(Apiconfigs.listSocial, fetcher, { suspense: true })
const [open, setOpen] = useState(false);
const [selectedItem, setSelectedItem] = useState(null);

const handleClickOpen = (item) => {
  setSelectedItem(item);
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setSelectedItem(null);
};

console.log("heeeee",staticContent)
  return (
    <footer
      style={{
        width: "100%",
        background: "linear-gradient(to right,rgb(40, 0, 38),rgb(74, 0, 79))",
        padding: "40px 20px",
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Link to="/">
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
          <h3 style={styles.sectionHeader}>Marketplace Section</h3>
          {staticContent.slice(0, 4).map((row) => (
            <>     
            <li key={row.title} style={styles.listItem}  onClick={() => handleClickOpen(row)}>
                <span style={{cursor:"pointer"}}>{row.title}</span>
                <div style={styles.divider} />
                <div style={styles.dot} />
              </li>
             
            
            </>
            
              
            ))}
      

      <Dialog open={open} onClose={handleClose} >
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
          <h3 style={styles.sectionHeader}>My Account</h3>
          <ul style={styles.list}>
          {staticContent.slice(4,8).map((row) => (
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
          </ul>
        </div>

        {/* Community Section */}
        <div >
          <h3 style={{ ...styles.sectionHeader, marginBottom: "20px" }}>Join The Community</h3>
          <div style={styles.iconsContainer} className="iconContainer">
         
          <div  style={styles.iconContainer} >
          <Link to={socialLinks[3]?.link} target="_blank" rel="noreferrer">
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

    </footer>
  );
};

const styles = {
  sectionHeader: {
    marginBottom: "15px",
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
