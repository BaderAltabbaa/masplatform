import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Pagination,  // Corrected import
} from '@mui/material';  // Make sure all material components are imported from MUI v5

import { makeStyles } from '@mui/styles';

import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import DataLoading from "src/component/DataLoading";
import UserDetailsCard from "src/component/UserCard";
import NoDataFound from "src/component/NoDataFound";  // Custom component
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import CardCreators from "../../../component/ui/Card/CardCreators";
import { useTranslation } from 'react-i18next';


const useStyles = makeStyles(() => ({

  container: {
    padding: "20px 0px",


  },
 
  divider: {
    // padding: "20px 10px",
  },
  TokenBox: {
    border: "solid 0.5px #e5e3dd",
    padding: "5px",
  },
  heading: {
    textAlign: "center",
    // padding: '33px'
  },
  userGridContainer:{
      justifyContent: 'center',
   

  },
  gridbox: {
    justifyContent: 'center',
    paddingleft: "0",

    
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },

  },
}));

export default function Login(chat,subscrib,Subscribe,CardpersonalInfo
) {
  const classes = useStyles();
  const [search, setsearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [noOfPages, setNoOfPages] = useState(1);
  const [userListToDisplay, setUserListToDisplay] = useState([]);
      const {t} = useTranslation();
  

  const getuser = async (cancelTokenSource) => {
    setIsLoading(true);
    console.log("Starting API request...");
  console.log("Page:", page);
  console.log("Search:", search);
  console.log("Cancel Token:", cancelTokenSource && cancelTokenSource.token);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      data: {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      },
      params: {
        limit: 12,
        page: page,
        search: search,
        userType: "Creator",
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        console.log("API Response:", res);
        console.log("Status Code:", res.data.statusCode);
        console.log("Result Docs:", res.data.result.docs);
        console.log("Total Pages:", res.data.result.pages);
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setNoOfPages(res.data.result.pages);
            setUserListToDisplay(res.data.result.docs);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    getuser(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel();
    };
  }, [search, page]);

  return (
    <Box className={classes.container}
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
       

    
      {isLoading ? (
        <DataLoading />
      ) : (
        <Container maxWidth="xl">
            <div style={{ display: "flex", justifyContent: "center",marginBottom  : "20px"}}>
                        <ButtonwithAnimation  > {t("Creators")}</ButtonwithAnimation>
                      
                      </div>
          {userListToDisplay.length === 0 ? (
            <Box align="center" mt={4} mb={5}>
              <NoDataFound />
            </Box>
          ) : (
            ""
          )}
          <Grid 
           container
           
          
          className={classes.userGridContainer}>
        
            {userListToDisplay.map((data, i) => {
              return (
                
                <Grid  
                container
                item
                key={i}
                xs={12}
                sm={4}
                md={3}
              lg={2.2}
                className={classes.gridbox}
                mb={2}
                


               >
<CardCreators  data={data}
                                chat={chat}
                                subscrib={subscrib}
                                CardpersonalInfo={CardpersonalInfo}
                                Subscribe={Subscribe}
/>
                </Grid>
                
                
              );
            })}
          </Grid>
        </Container>
      )}
      <Box display="flex" justifyContent="center" dir="ltr">
        {noOfPages > 1 && (
          <Pagination
            count={noOfPages}
            page={page}
            onChange={(e, v) => setPage(v)}
            sx={{
              "& .MuiPaginationItem-root": { color: "white" }, // Change text color
              "& .MuiPaginationItem-page.Mui-selected": {  color: "grey" }, // Change selected color
              "& .MuiPaginationItem-ellipsis": { color: "white" }, // Change ellipsis color
            }}
          />
        )}
      </Box>
    </Box>
  );
}
