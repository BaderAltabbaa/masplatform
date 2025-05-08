





import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Pagination } from '@mui/material';  // Correct imports for MUI v5
import { makeStyles } from '@mui/styles';  // Still valid, although consider using `sx` or `styled` for newer approaches
import UserDetailsCard from "src/component/UserCard";
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import CardCreators from '../../../../../component/ui/Card/CardCreators';
import MainCard from "../../ui-component/cards/MainCard";
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip
} from '@mui/material';
import { AccountCircle, Chat, PersonAdd } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";



const useStyles = makeStyles(() => ({
  input_fild: {
    backgroundColor: "#ffffff6e",
    border: " solid 0.5px #e5e3dd",
    color: "#141518",
    height: "48px",
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
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
      borderWidth: 0,
    },
  },
  LoginBox: {
  
    "& h6": {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "20px",
      color: "#000",
      "& span": {
        fontWeight: "300",
      },
    },
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },
  bunbox: {
   
    display: "flex",
    justifyContent: "center",
  
},
}));

export default function Subscribers({ type }) {
        const {t} = useTranslation();
  
  const classes = useStyles();
  const [state, setState] = useState({
    userList: [],
    page: 1,
    pages: 1,
  });
  const { userList, page, pages } = state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  useEffect(() => {
    myFollowersHandler().catch(console.error);
  }, [state.page]);

  return (<>
    <Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",marginTop:"5rem"}}><ButtonwithAnimation>My Subscribers</ButtonwithAnimation></Box>

      <Box className={classes.LoginBox} mb={5}>

        <Box display='flex' alignItems='center' justifyContent='flex-end'>

       <Box sx={{
        padding:"10px",
        background:"linear-gradient(to top right,#900098,#4d0051)" ,
        width:"fit-content",
        margin:"10px",
        borderRadius:"10px",
        color:"white",
        fontWeight:"bold",
        fontSize:"1rem",
       }}> 

       <span>{userList.length} Subscribers</span>
       </Box>

       </Box>

        <Box>
        <TableContainer component={Paper} >
  <Table  aria-label="subscribers table">
    <TableHead sx={{background:"linear-gradient(to top right,#900098,#4d0051)"}}>
      <TableRow>
        <TableCell sx={{color:"white"}}>{t("Icon")}</TableCell>
        <TableCell sx={{color:"white"}} >{t("Username")}</TableCell>
        <TableCell sx={{color:"white"}} >{t("Speciality")}</TableCell>
        <TableCell sx={{color:"white"}} >{t("Type")}</TableCell>
        <TableCell sx={{color:"white"}} align="center">{t("Actions")}</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {userList.map((subscriber, index) => (
        <TableRow key={index}>
          <TableCell component="th" scope="row" sx={{width:"10px"}}>
            <Box display="flex" alignItems="center">
              <Avatar
                src={subscriber.profilePic}
                sx={{ width: 40, height: 40 }}
              >
                {!subscriber.profileImage && <AccountCircle />}
              </Avatar>
             
            </Box>
          </TableCell>
          <TableCell > {subscriber.name}</TableCell>
          <TableCell > {subscriber.speciality}</TableCell>
          <TableCell > {subscriber.userType}</TableCell>

          
          <TableCell align="center">
            <Box display="flex" alignItems='center' justifyContent='center'>
           <Tooltip title="Chat"> <IconButton aria-label="chat" color="primary">
              <Chat  sx={{
                color:"rgb(60, 0, 60)"
              }}/>
            </IconButton>
            </Tooltip>
            <Tooltip title="View"><Link to={"/user-profile/"+ subscriber.userName}><FaEye size={25} color="rgb(60, 0, 60)"></FaEye></Link></Tooltip>
            </Box>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
          {pages > 1 && (
            <Box
              mb={2}
              mt={2}
              display="flex"
              justifyContent="center"
              style={{ marginTop: 10 }}
            >
              <Pagination
                count={pages}
                page={page}
                onChange={(e, v) => updateState({ page: v })}
              />
            </Box>
          )}
        </Box>
      </Box>
      </>
  );

  async function myFollowersHandler() {
    console.log("Making API request to:", Apiconfigs.profileFollowersList); // Log the endpoint
    console.log("Request params:", { limit: 4, page: page }); // Log request parameters
    
    await axios({
      method: "GET",
      url: Apiconfigs.profileFollowersList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        limit: 4,
        page: page,
      },
    })
      .then(async (res) => {
        console.log("API Response:", res); // Log full response
        console.log("Response data:", res.data); // Log response data
        
        if (res.data.statusCode === 200) {
          console.log("Successful response - followers data:", res.data.result.docs); // Log the followers data
          updateState({ userList: res.data.result.docs });
        } else {
          console.log("Unexpected status code:", res.data.statusCode); // Log unexpected status
        }
      })
      .catch((err) => {
        console.error("API Error:", err); // Log full error
        console.log("Error message:", err.message); // Log error message
        if (err.response) {
          console.log("Error response data:", err.response.data); // Log response data if available
          console.log("Error status:", err.response.status); // Log status code
        }
      });
  }
}

