
import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Pagination, 
} from "@mui/material";  

import { makeStyles } from '@mui/styles';
import Bundlecard from "src/component/NewBundleCard";  
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs"; 
import { UserContext } from "src/context/User"; 
import DataLoading from "src/component/DataLoading"; 
import NoDataFound from "src/component/NoDataFound"; 
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import Cardbundle from "../../../component/ui/Card/Cardbundle";
import { useTranslation } from 'react-i18next';
import 'src/layouts/TopBar/TopBar.css'
import { useInView } from 'react-intersection-observer';
import "src/views/pages/About/AboutUs.css"


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
    justifyContent: 'center',
    paddingleft: "0",

    
    // "@media(max-width:1280px)": {
    //   display: "flex",
    //   justifyContent: "center",
    //   transition: 'border 0.3s ease',
    // },

  },
  gridContainer: {


    justifyContent: 'center',

  }
  
}));

const Education = () => {
  const classes = useStyles();
  const auth = useContext(UserContext);
  const [allNFTList, setAllNFTList] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);
    const {t} = useTranslation();

      const { ref: ref2,inView: inView2 } = useInView({
                      threshold: 0.2, 
                      triggerOnce: true,
                    });
                  
                    const { ref: ref3,inView: inView3 } = useInView({
                      threshold: 0.2, 
                      triggerOnce: true, 
                    }); 
  

  const listAllNftHandler = async () => {
    await axios({
      method: "GET",
      url: Apiconfigs.listAllNft,
      params: {
        page: page,
        limit: 10
      }
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          setAllNFTList(res.data.result.docs);
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
      listAllNftHandler();
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
        // <section>
        <Container maxWidth='xl'>

<div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-title">MAS Education</span>
      <span className="who-text1">Choose The Courses That Match Your Mind</span>
      <span className="who-text2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl,</span>
     <a href=""> <button className="learn-btn">Learn More</button></a> 
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img style={{
            display:"inline",
            width:"100%",
            borderRadius:"20px"
          }} 
          src="/assets/Images/edu.avif" alt="" />
        </div>
      </div>


          <div style={{ display: "flex", justifyContent: "center",marginBottom  : "20px"}}>
                  <ButtonwithAnimation>{t("All Courses")}</ButtonwithAnimation>
                
                </div>
             

          {auth.userLoggedIn && auth.userData?._id && (
            <>
             
              {/* <Container maxWidth="xl"> */}
                {allNFTList.length === 0 ? (
                  <Box align="center" mt={4} mb={5}>
                    <NoDataFound />
                  </Box>
                ) : (
                  ""
                )}
                <Grid 
                container 
                
                
                className={classes.gridContainer}>
                  {allNFTList.map((data, i) => {
                    return (
                      <Grid
                      container
                      item
                      key={i}
                      xs={12}
                      sm={4}
                      md={3}
                      lg={2.2}
                mb={2}

                      className={classes.gridbox}
                    >
                      <Cardbundle data={data} />
                    </Grid>

                     
                    //   <Grid
                    //     item
                    //     key={i}
                    //     xs={12}
                    //     sm={6}
                    //     md={4}
                    //     lg={3}
                    //     className={classes.gridbox}
                    //     //onMouseEnter={() => setHoveredIndex(i)}
                    //   //onMouseLeave={() => setHoveredIndex(null)}
                    //  // style={hoveredIndex === i ? { border: '10px solid red' } : null}
                    //   >
                    //     <Bundlecard
                    //       data={data}
                    //       index={i}
                    //       callbackFn={listAllNftHandler}
                    //     />
                    //   </Grid>
                    );
                  })}
                </Grid>
              {/* </Container> */}
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
        </Container>

        // </section>
      )}
    </Box>
  );
};

export default Education;
