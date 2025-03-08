import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Table,
  Paper,
  InputAdornment,
  Input,
  Container,
  TextField,
} from '@mui/material';  

import { makeStyles } from '@mui/styles';

import NoDataFound from "src/component/NoDataFound";
import SearchIcon from "@mui/icons-material/Search";  
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import Loader from "src/component/Loader";
import { Pagination } from "@mui/material";  
import ChildTableUser from "../../../component/userRow";
import { UserContext } from "src/context/User";
import { isMobile } from 'react-device-detect';
import theme from "../../../theme";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import './UsersList.css'; 




const useStyles = makeStyles(() => ({
  LoginBox: {
    paddingBottom: "50px",
  },
  websiteButton: {
    border: "solid 0.5px #707070",
    backgroundColor: "#fff",
    textAlign: "center",
    fontSize: "17.5px",
    color: "#141518",
    width: "100%",
    borderRadius: "0",
  },
  masBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    marginTop: "30px",
    "& h6": {
      fontSize: "28px",
      color: "#000",
    },
  },
  paddingContainer: {
    padding: "30px 30px",
    // marginTop: "-30px",
    
  },
  table: {
    minWidth: 320,
  },
  table: {
    border: "none",
    "& th": {
      border: "none",
      padding: "10px!important",
    },
    "& td": {
      border: "none",
      padding: "6px!important",
    },
  },
  createButton: {
    color: "#fff",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    margin: "0px 10px",
    // "@media(max-width:768px)": {
    //   display: "none",
    // },
  },
  whitebox: {
    background: "#FFFFFF",
    filter: "drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25))",
    boxShadow: "rgb(99 99 99 / 20%) 0px 2px 8px 0px",
    borderRadius: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
    marginBottom: "15px",
  },

  idtxt: {
    display: "flex",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    alignItems: "center",
    "@media(max-width:818px)": {
      display: "block",
    },
  },
  ss: {
    width: "700px!important",
  },
  ranking: {
    padding: "1px!important"
  },
  profile: {
    padding: "1px!important",
  },
  input_fild2: {
    "&:before": {
      width: "0!important"
    },
  }
}));

export default function UsersList() {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allUserList, setAllUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [filterData, setFilterData] = useState({
    userType: "",
    searchKey: "",
  });
  const _onInputChange = (e) => {
    setFilterData({ ...filterData, [e.target.name]: e.target.value });
    setPage(1);
  };
  const getAllUserListHandler = async () => {
    setIsLoadingData(true);
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.allUserList,

        params: {
          search: filterData.searchKey != "" ? filterData.searchKey : null,
          type: filterData.userType != "" ? filterData.userType : null,
          limit: 100,
          page: page,

        },
      });
      if (res.data.statusCode === 200) {
        let rankingOrder = res.data.result.docs;
        rankingOrder.sort((a, b) => b.masBalance - a.masBalance || b.followers.length - a.followers.length)
        setAllUserList(rankingOrder);
        setIsLoadingData(false);
        setPages(res.data.result.pages)
      }
    } catch (error) {
      console.log(error);
      setIsLoadingData(false);
    }
  };
  useEffect(() => {
    getAllUserListHandler();
  }, [page, filterData]);

  return (
    <Container maxWidth='xl'
    sx={{background:"linear-gradient(to right,#280026,#4a004f)"}}
    >
     
<Box className={classes.paddingContainer} >

      <Box className={classes.LoginBox} mb={5} >
        {/* Start Title */}
        
        <Box className={classes.masBoxFlex}
        sx={{display:"flex" ,flexDirection:"column" ,justifyContent:"center",alignContent:"center"}}
        >
          <ButtonwithAnimation  >Users</ButtonwithAnimation>
          {/* {isMobile ? "" : <Typography variant="h6">Users</Typography>} */}
          <Box variant="h6" style={{ display: "flex", justifyContent: "end", width: "100%" }}>
                                   
            
            
          <TextField
  placeholder="Find User"
  variant="standard"
  className={classes.input_fild2}
  value={filterData.searchKey}
  sx={{
    width: "180px",
    margin: "20px 0",
    border: "3px solid #581454",
    borderRadius: "10px",
    padding: "2px 5px",
    background: "rgb(220, 220, 220)",
    '& .MuiInputBase-input::placeholder': {
      color: 'black', // Change placeholder color
      opacity: 0.75, // Ensure full opacity
    },
    "& .MuiInputBase-input": {
      textAlign: "center", // Center the text
    },
  }}
  InputProps={{
    sx: {
      '&:before': {
        borderBottom: 'none', // Remove the bottom border
      },
      '&:after': {
        borderBottom: 'none', // Remove the bottom border on focus
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: 'none', // Remove the bottom border on hover
      },
    },
    endAdornment: (
      <InputAdornment position="end" sx={{ color: 'black' , opacity: 0.5}}>
        <SearchIcon />
      </InputAdornment>
    ),
  }}
  type="text"
  name="searchKey"
  onChange={_onInputChange}
/>
          </Box>
        </Box>
        {/* End Title */}

        {/* Start Serach */}
        {/* {!isMobile &&
          <Box className={classes.whitebox}>
            <Container>
              <Box className={classes.idtxt}>
                <Grid container spacing={0}>
                  <Grid item xs={12} md={8} className={classes.dlflex}>
                    {isMobile ? "" : <label style={{ padding: "0px" }}>Search</label>}
                    <Input
                      placeholder="Search by wallet Address or name"
                      className={classes.input_fild2}
                      value={filterData.searchKey}
                      fullWidth
                      type="text"
                      name="searchKey"
                      onChange={_onInputChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      }
                    />
                  </Grid>
                </Grid>


              </Box>
            </Container>
          </Box>} */}
        {/*End Serach */}

        {/* Start Table */}
        <div className="tableWrapper">
            <div className="tableAnimatedBackground"></div>
            <div className="tableInnerBlurEffect"></div>
            <TableContainer className="tableindex"  style={isMobile ? { width: "400px!important" } : { width: "100%"}} sx={{border:"none"}} component={Paper}>
              <Table aria-label="simple table" sx={{border:"2px solid #581454" }}>
                <TableHead sx={{ background: "linear-gradient(to right,rgba(77, 20, 96, 0.96),rgb(44, 0, 47))"  }}>
                  <TableRow>
                    <TableCell className={classes.ranking} align="Center" style={{ color: "white", padding: "1px", width: "10px !important", textAlign: "center" }}>
                      Img
                    </TableCell>
                    <TableCell className={classes.profile} align="Center" style={{ color: "white", textAlign: "center" }}>
                      Name
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      Action
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      Wallet Address
                    </TableCell>
                    <TableCell align="Center" style={{ color: "white", textAlign: "center" }}>
                      Sepeciality
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allUserList && allUserList?.map((row, index) => (
                    <ChildTableUser row={row} index={index} key={index} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

        {/* End Table */}

        <Box mt={3}>{isLoadingData && <Loader />}</Box>
        <Box mt={3}>
          {!isLoadingData && allUserList && allUserList.length === 0 && (
            <NoDataFound />
          )}
        </Box>
        <Box mb={2} mt={2} display="flex" justifyContent="center">
          <Pagination
            count={pages}
            page={page}
            onChange={(e, v) => setPage(v)}
            sx={{
              "& .MuiPaginationItem-root": { color: "white" }, // Change text color
              "& .MuiPaginationItem-page.Mui-selected": {  color: "white" }, // Change selected color
              "& .MuiPaginationItem-ellipsis": { color: "white" }, // Change ellipsis color
            }}
          />
        </Box>
      </Box>
    </Box>

</ Container>
  );
}
