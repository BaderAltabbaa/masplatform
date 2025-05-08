import React, { useState, useContext, useEffect } from "react";
import {
  Typography,
  Grid,
  Box,
  Container,
  Pagination,  // Corrected import
  TextField, // Add TextField import
  InputAdornment, // For search icon
  IconButton
} from '@mui/material'; 

import { makeStyles } from '@mui/styles';  
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { UserContext } from "src/context/User";
import DataLoading from "src/component/DataLoading"; 
import NoDataFound from "src/component/NoDataFound";  
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import CardMarketplace from "../../../component/ui/Card/CardMarketplace";
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css"
import SearchIcon from '@mui/icons-material/Search'; // Import search icon
import { FaSearch } from "react-icons/fa";


const useStyles = makeStyles(() => ({
 
  container: {
    padding: "20px 0px",
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


      justifyContent: "center",
   
  
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
   const [openSeachBar , SetOpenSearchBar] = useState(false)
    const [search, setsearch] = useState("");
      const {t} = useTranslation();

       const { ref: ref2,inView: inView2 } = useInView({
                  threshold: 0.2, 
                  triggerOnce: true,
                });
              
                const { ref: ref3,inView: inView3 } = useInView({
                  threshold: 0.2, 
                  triggerOnce: true, 
                }); 
  

  const listAllNft1Handler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft1,
      params: {
        page: page,
        limit: 10,
        
      }
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFTList1(res.data.result.docs);
          setPages(res.data.result.totalPages)
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
        <Box padding='250px' display='flex' justifyContent='center' alignItems='center'>
        <DataLoading />
        </Box>
      ) : (
        <section>
          {auth.userLoggedIn && auth.userData?._id && (
            <>

<div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"0px"
          }}
          className="bunner-animaton">
            <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'block' ,transform:" scale(0.7)" }}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white"
       
      }}>
       Mas Marketplace
      </div>
    </div>
    </div>


<div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-text1">Buy And Sell Whatever Comes To Your Mind</span>
      <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img style={{
            display:"inline",
            width:"100%",
            borderRadius:"20px"
          }} 
          src="/assets/Images/item.webp" alt="" />
        </div>
      </div>


             
                          
              <Container maxWidth="xl">
                {allNFTList1.length === 0 ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  ""
                )}
                <Grid 
                container
                
                className={classes.gridbox}
                 >
                  {allNFTList1.map((data, i) => (
                    <Grid
                    container
                    item
                    key={i}
                    xs={12}
                      sm={4}
                      md={3}
                    lg={2.2}
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
              <Box mb={2} mt={2} display="flex" justifyContent="center" dir="ltr">
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
