
import { useTranslation } from 'react-i18next';

import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
// import ItemCard from "src/component/NewItemCard";
import UserDetailsCard from "src/component/UserCard";
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import { Pagination } from "@mui/material";  
import CardCreators from '../../../../../component/ui/Card/CardCreators';
import CardMarketplace from '../../../../../component/ui/Card/CardMarketplace';
import MainCard from "../../ui-component/cards/MainCard";

const useStyles = makeStyles(() => ({
  subscriptionBox: {
    overflowX: "auto",
    whiteSpace: "nowrap",
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

export default function purchases() {
        const {t} = useTranslation();
  
  const classes = useStyles();
  const [state, setState] = useState({
    purchases: [],
    subsPage: 1,
    subsPages: 1,
    userList: [],
    userPage: 1,
    userPages: 1,
  });
  const { purchases, subsPage, subsPages, userList, userPage, userPages } =
    state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  useEffect(() => {
    getBundleSubscriptionListHandler().catch(console.error);
  }, [state.subsPage]);

  useEffect(() => {
    myFollowingHandler().catch(console.error);
  }, [state.userPage]);

  return (<>
    <MainCard title={t("Purchased Items")} >
      </MainCard>
 <div className={classes.subscriptionBox}>
      <Box className={classes.LoginBox} >
       
        <Box>
          <Grid container spacing={2} className={classes.bunbox}  justifyContent="center">
            {purchases.map((data, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}   style={{ display: "flex", justifyContent: "center" }}>
                     <CardCreators
                                data={data}
                                chat

                                subscriptionBox

                                // CardpersonalInfo={CardpersonalInfo}
                                Subscribe
                            />
                  {/* <ItemCard data={data.nft1Id} key={i} index={i} /> */}
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
      </Box>
      <Box className={classes.LoginBox} >
        <Box className={classes.masBoxFlex}>
                        <Typography variant="h6" style={{fontSize:"1.8rem" ,color:"#43005e"}}>{t("Users")}</Typography>
        </Box>
        <Box>
          <Grid container spacing={2} className={classes.bunbox}  justifyContent="center">
            {userList.map((data, i) => {
              return (
                <Grid item key={i} lg={3} md={4} sm={6} xm={12}  style={{ display: "flex", justifyContent: "center" }}>
                      <CardCreators
                                data={data}
                                chat

                                subscriptionBox

                                // CardpersonalInfo={CardpersonalInfo}
                                Subscribe
                            />
                 
                </Grid>
              );
            })}
          </Grid>
          {userPages > 1 && (
            <Box
              mb={2}
              mt={2}
              display="flex"
              justifyContent="center"
              style={{ marginTop: 40 }}
            >
              <Pagination
                count={userPages}
                page={userPage}
                onChange={(e, v) => updateState({ userPage: v })}
              />
            </Box>
          )}
        </Box>
      </Box>
    </div>
    </>
   
  );

  async function getBundleSubscriptionListHandler() {
    await axios({
      method: "GET",
      url: Apiconfigs.mypurchases,
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
            purchases: res.data.result.docs,
            subsPages: res.data.result.pages,
          });
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
            userPages: res.data.result.pages,
          });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

