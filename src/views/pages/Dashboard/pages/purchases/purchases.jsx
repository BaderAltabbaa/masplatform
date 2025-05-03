
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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip
} from '@mui/material';
import { Link } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'

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
           <TableContainer component={Paper} >
            <Table>
              <TableHead sx={{background:"linear-gradient(to top right, #900098, #4d0051)"}}>
                <TableRow>
                         <TableCell sx={{color:"white"}}>{t("Title")}</TableCell>
                         <TableCell sx={{color:"white"}}>{t("Name")}</TableCell>
                         <TableCell sx={{color:"white"}}>{t("Price")}</TableCell>
                         <TableCell sx={{color:"white"}}>{t("Status")}</TableCell>
                         <TableCell sx={{color:"white"}}>{t("Action")}</TableCell>

                </TableRow>
                </TableHead>
                <TableBody>
                {purchases.map((items, i) => {
                  return (
                   <TableRow key={i}>
                    <TableCell>
                     {items.title}
                    </TableCell>
                    <TableCell>
                     {items.name}
                    </TableCell>
                    <TableCell>
                     {items.masPrice} MAS
                    </TableCell>
                    <TableCell>
                     {items.status}
                    </TableCell>
                    <TableCell>
                    <Tooltip title="View" placement="right"><Link to={"/items-details?"+ items.nft1Id}><FaEye size={20} color='#4d0051'/></Link></Tooltip>
                    </TableCell>
                   </TableRow>)
                })}
                </TableBody>
                </Table>
                </TableContainer>
         
          
            
       
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
        limit: 6,
        page: subsPage,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          updateState({
            purchases: res.data.result.docs,
            subsPages: res.data.result.totalPages,
          });
          console.log("pur",res.data)
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

