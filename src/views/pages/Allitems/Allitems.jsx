import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Pagination,  
} from "@mui/material";  

import { makeStyles } from '@mui/styles';  
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading"; 
import NoDataFound from "src/component/NoDataFound";  
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import CardMarketplace from "../../../component/ui/Card/CardMarketplace";


const useStyles = makeStyles(() => ({
 
  container: {
    padding: "50px 0px",
  },
  heading: {
    padding: "1.5px 0 0",
    backgroundColor: "var(--white)",
    display: "flex",
    justifyContent: "center",
  },
  search: {
    border: "0.5px solid #e5e3dd",
    display: "flex",
    alignItems: "center",
    borderRadius: "6.5px",
  },
  box: {
    paddingleft: "0",
    flexWrap: "inherit",
  },
  gridbox: {
    marginBottom : '50px',

    justifyContent: 'center',
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },
  },
  gridboxHover: {
    border: '10px solid red', // Red border on hover
  },
}));

const AllItemsPage = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allNFTList1, setAllNFTList1] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const listAllNft1Handler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft1,
      params: {
        page: page,
        limit: 10
      }
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFTList1(res.data.result.docs);
          setPages(res.data.result.pages)
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err.message);
      });
  };

  useEffect(() => {
    if (auth.userData?._id && auth.userLoggedIn) {
      listAllNft1Handler();
    }
  }, [auth.userLoggedIn, auth.userData, page]);

  return (
    <Box className={classes.container}
    sx={{
     
      background: (theme) => theme.custom.PageBackGround,
     
    }}
    >
      {isLoading ? (
        <DataLoading />
      ) : (
        <section>
          {auth.userLoggedIn && auth.userData?._id && (
            <>
              <div style={{ display: "flex", justifyContent: "center",marginBottom  : "50px"}}>
                               <ButtonwithAnimation  > ALL BUNDLES</ButtonwithAnimation>
                             
                             </div>
                          
              <Container maxWidth="xl">
                {allNFTList1.length === 0 ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  ""
                )}
                <Grid container spacing={2}>
                  {allNFTList1.map((data, i) => (
                    <Grid
                    container
                    item
                    key={i}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    mb={{xs: 0,lg:1}}
                      className={classes.gridbox}
                      //onMouseEnter={() => setHoveredIndex(i)}
                      //onMouseLeave={() => setHoveredIndex(null)}
                      //style={hoveredIndex === i ? { border: '10px solid red' } : null}
                    >
                     
                      <CardMarketplace
                       data={data}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Container>
              <Box mb={2} mt={2} display="flex" justifyContent="center">
                <Pagination
                  count={pages}
                  page={page}
                  onChange={(e, v) => setPage(v)}
                  sx={{
                    "& .MuiPaginationItem-root": { color: "white" }, // Change text color
                    "& .MuiPaginationItem-page.Mui-selected": {  color: "grey" }, // Change selected color
                    "& .MuiPaginationItem-ellipsis": { color: "white" }, // Change ellipsis color
                  }}
                />
              </Box>
            </>
          )}
        </section>
      )}
    </Box>
  );
};


export default AllItemsPage;
