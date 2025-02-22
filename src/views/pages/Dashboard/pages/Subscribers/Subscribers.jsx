





import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Pagination } from '@mui/material';  // Correct imports for MUI v5
import { makeStyles } from '@mui/styles';  // Still valid, although consider using `sx` or `styled` for newer approaches
import UserDetailsCard from "src/component/UserCard";
import axios from "axios";
import Apiconfigs from "../../../../../Apiconfig/Apiconfigs";
import CardCreators from '../../../../../component/ui/Card/CardCreators';
import MainCard from "../../ui-component/cards/MainCard";



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
    paddingTop: "20px",
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
}));

export default function Subscribers({ type }) {
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

  return (
  <MainCard title="My Subscribers" >
      <Box className={classes.LoginBox} mb={5}>
       
        <Box>
          <Grid container>
            {userList.map((data, i) => {
              return (
                <Grid item xs={12} sm={6} md={4} lg={3.5} key={i}>
                    <CardCreators 
                    chat
                    Subscribe

                    data={data}/>
                   
                </Grid>
              );
            })}
          </Grid>
          {pages > 1 && (
            <Box
              mb={2}
              mt={2}
              display="flex"
              justifyContent="center"
              style={{ marginTop: 40 }}
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
    </ MainCard>
  );

  async function myFollowersHandler() {
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
        if (res.data.statusCode === 200) {
          updateState({ userList: res.data.result.docs });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}

