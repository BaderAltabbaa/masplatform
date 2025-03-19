import React from "react";
import {
  Grid,
  Box,
  
  Typography,
} from "@mui/material";
import { sortAddress } from "src/utils";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  borderBotm: {
    borderBottom: "1px solid #ccc",
    display: "flex",
    background: "#fff",
    width: "275px",
  },

  main: {
    color: "#999",
    background: "rgb(244, 244, 244)",
    borderRadius:"20px",
    cursor: "pointer",
    padding: "10px",
  },
}));

export default function UsersCard({
  users,
  navigate,
  setsearch,
  setIsLoading1,
}) {
  const classes = useStyles();
  const handleCloseFunction = () => {
    navigate("/user-profile/" + users.userName)
    setIsLoading1(false);
    setsearch("");
  };

  return (
    <Box className={classes.main} onClick={handleCloseFunction}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid item  sx={{width:"160px"}}>
          <Box sx={{display:"flex" ,flexDirection:"column" ,alignItems:"start" }}>
            <figure
              style={{ cursor: "pointer", marginBottom: "5px" }}
            >
              <img
                src={users.profilePic || `/assets/Images/profile.jpg`}
                style={{ height: "50px", width: "50px" ,borderRadius:"50%" }}
              />
            </figure>
            <Typography
              variant="h5"
              component="h4"
              style={{ color: "black" }}
            >
              {users.name
                ? users.name
                : users.userType === "User"
                  ? sortAddress(users.walletAddress)
                  : sortAddress(users.ethAccount.address)}
            </Typography>
          </Box>
        </Grid>

        <Grid item >
          <Box>
            <Box>
              <Typography variant="h6" component="h6">
                {users.followers.length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="span" component="span">
                subscribers
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
