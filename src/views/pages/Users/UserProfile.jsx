import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

import Profile from "./Profile";
import BundlesCard from "src/component/NewBundleCard";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import axios from "axios";
import DataLoading from "src/component/DataLoading";
import { ButtonwithAnimation } from '../../../component/ui/Button/button';


const useStyles = makeStyles(() => ({}));

const fetcher = (url) => axios.get(url).then((res) => res.data.result);

function UserProfile() {
  const classes = useStyles();

  const { username } = useParams();
  const { data: userData } = useSWR(Apiconfigs.getUser + username, fetcher, {
    suspense: true,
  });
  const [userListToDisplay, setUserListToDisplay] = useState([]);

  if (!userData) return <DataLoading />;
  const userDetails = userData[0];
  return (
    <Box>
      <Profile
        data={userDetails}
        isabout={true}
        userListToDisplay={userListToDisplay}
      />
      <Container maxWidth="xl">
        <Box align="center" mt={3}>
        <ButtonwithAnimation>Bundles</ButtonwithAnimation>  
        </Box>
        <Grid container style={{ margin: "30px auto" }}>
          {userDetails?.bundleDetails?.map((data, i) => {
            return (
              <Grid
                item
                key={i}
                lg={3}
                xl={2}
                md={4}
                sm={6}
                xs={12}
                style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
              >
                <BundlesCard data={data} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default UserProfile;
