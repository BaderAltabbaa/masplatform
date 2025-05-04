import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from '@mui/material'; // Correct imports directly from @mui/material

// For making styles using @mui/styles (still supported)
import { makeStyles } from '@mui/styles'; 

// Correct components
import BundleCard from "src/component/NewBundleCard"; 
import UserDetailsCard from "src/component/UserCard"; 

import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";

// Correct location for Pagination in MUI v5 (moved to @mui/material)
import { Pagination } from '@mui/material';
import Cardbundle from "../../../../../component/ui/Card/Cardbundle";
import CardCreators from '../../../../../component/ui/Card/CardCreators';
import MainCard from "../../ui-component/cards/MainCard";
import { ButtonwithAnimation } from "../../../../../component/ui/Button/button";
import { useTranslation } from 'react-i18next';






const useStyles = makeStyles(() => ({
  subscriptionBox: {
    overflowX: "auto",
    whiteSpace: "nowrap",
    backgroundColor:"white"
  },
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
    paddingTop: "20px",
    marginLeft: "25px",
    marginRight: "15px",
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

export default function Subscriptions() {
        const {t} = useTranslation();
  
  const classes = useStyles();
  const [state, setState] = useState({
    subscriptions: [],
    subsPage: 1,
    subsPages: 1,
    userList: [],
    userPage: 1,
    userPages: 1,
  });
  const { subscriptions, subsPage, subsPages, userList, userPage, userPages } =
    state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  useEffect(() => {
    getBundleSubscriptionListHandler().catch(console.error);
  }, [state.subsPage]);

  useEffect(() => {
    myFollowingHandler().catch(console.error);
  }, [state.userPage]);

  return (
    <div className={classes.subscriptionBox}>
     <Box sx={{display:"flex" ,justifyContent:"center",alignItems:"center",marginTop:"5rem",marginBottom:"1rem"}}><ButtonwithAnimation>Bundles</ButtonwithAnimation></Box>
 
      
        <Box>
          <Grid container spacing={2} className={classes.bunbox}  justifyContent="center">
            {subscriptions.map((data, i) => {
              return (
                <Grid item key={i} lg={3} md={4} sm={6} xm={12} style={{ display: "flex", justifyContent: "center" }}>
                  <Cardbundle data={data.nftId}  />
                </Grid>
              );
            })}
          </Grid>
        </Box>
        {subsPages > 1 && (
          <Box
            mb={2}
            mt={2}
            display="flex"
            justifyContent="center"
            style={{ marginTop: 40 }}
          >
            <Pagination
              count={subsPages}
              page={subsPage}
              onChange={(e, v) => updateState({ subsPage: v })}
            />
          </Box>
        )}
     
     
       
      
      
    </div>
  );

  async function getBundleSubscriptionListHandler() {
    await axios({
      method: "GET",
      url: Apiconfigs.mysubscription,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        limit: 4,
        page: subsPage,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          updateState({
            subscriptions: res.data.result.docs,
            subsPages: res.data.result.totalPages,
          });
          console.log("bund",res.data)
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  async function myFollowingHandler() {
    await axios({
      method: "GET",
      url: Apiconfigs.profileFollowingList,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        limit: 4,
        page: userPage,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          updateState({
            userList: res.data.result.docs,
            userPages: res.data.result.totalPages,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
