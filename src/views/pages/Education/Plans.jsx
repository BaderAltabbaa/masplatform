import React, { useState, useEffect } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,Dialog,DialogTitle,DialogContent,Divider
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import PlanCard from "./PlanCard";
import axios from "axios";
import Apiconfigs from "../../../Apiconfig/Apiconfigs";
import NoDataFound from "../../../component/NoDataFound";

const Plans = () => {
  const { ref: ref2, inView: inView2 } = useInView({ threshold: 0.2, triggerOnce: true });
  const { ref: ref3, inView: inView3 } = useInView({ threshold: 0.2, triggerOnce: true });

  const [currencyType, setCurrencyType] = useState("MAS");
  const [billingType, setBillingType] = useState("monthly");
  const [plans, setPlans] = useState([]);
    const [openCustom , setOpenCustom] = useState(false);
  

  useEffect(() => {
  const fetchPlans = async () => {
    try {
      const res = await axios.get(Apiconfigs.getpublicPlans); // لا توكن

      console.log("📥 Full API Response:", res.data);

      if (res.data.statusCode === 200) {
        const data = res.data.data;
        setPlans(data);
      }
    } catch (err) {
      console.error("❌ Error fetching plans:", err);
    }
  };

  fetchPlans();
}, []);


  return (
    <Box sx={{ background: (theme) => theme.custom.PageBackGround, padding: "20px 0" }}>
      <Container maxWidth="xl">

        {/* Banner */}
        <Box display="flex" justifyContent="center" alignItems="center" padding="10px" className="bunner-animaton">
          <Box position="relative" display="inline-block">
            <img src="/assets/Images/wave20.png" alt="Banner" style={{ display: 'block', maxHeight:"120px" }} />
            <Typography
              sx={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', color: 'white',
                fontSize: '2.5rem', fontWeight: "bold",
                textShadow: "0px 0px 10px white"
              }}
            >
              Education Plans
            </Typography>
          </Box>
        </Box>

        {/* Switchers */}
        <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          <Button
          variant="contained"
          sx={{background:(theme) => theme.custom.gradientButton,
            borderRadius:"20px",
            "&:hover":{
              background:(theme) => theme.custom.hoverGradientButton
            }
          }}
          onClick={() => {setOpenCustom(true)}}
          >customize payments</Button>
         
    
        </Box>

        {/* Plans Grid */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "100vh",
            flexDirection: "column",
            padding: "40px 0",
          }}
        >
          <Grid container spacing={3} justifyContent="center" alignItems="center" maxWidth="lg">
            {plans.length === 0 ? (
             <NoDataFound/>
            ) : (
              plans
                .filter((plan) => plan?.price?.[currencyType]?.[billingType] !== undefined)
                .map((plan) => (
                  <Grid item key={plan._id} xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                    <PlanCard
                      plan={plan}
                      currencyType={currencyType}
                      billingType={billingType}
                    />
                  </Grid>
                ))
            )}
          </Grid>
        </Box>

      </Container>

      <Dialog
       open={openCustom}
       onClose={() => {setOpenCustom(false)}} 
       fullWidth
       maxWidth="xs"         
       disableScrollLock={true}
        BackdropProps={{
          style: {backgroundColor:"transparent"}
        }}
        sx={{
           "& .MuiDialog-container": {
            alignItems: "flex-start",
            justifyContent: "center",
          },
        }}
>
        <DialogTitle align="center">
          <Typography variant="h3" sx={{color:(theme) => theme.custom.mainButton}}>Customize How You Want To Pay</Typography>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex",justifyContent:"center"}}>
          <Box sx={{
            display: "flex",
            width: '70%',
            height: '3px',
            backgroundColor: (theme) => theme.custom.mainButton,
            mb: 2,
          }} />
          </Box>
           <Box sx={{ display: "flex", justifyContent: "start",flexDirection:"column", gap: 2, mb: 3, flexWrap: "wrap" }}>
         <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="h4">Coin:</Typography>
          {["MAS", "USDT", "COIN"].map((currency) => (
            <Button
              key={currency}
              variant={currencyType === currency ? "contained" : "outlined"}
              onClick={() => setCurrencyType(currency)}
              sx={{background: currencyType === currency ? (theme) => theme.custom.mainButton : "",
                   color: currencyType === currency ? "white" : (theme) => theme.custom.mainButton,
                   borderColor: currencyType === currency ? "" : (theme) => theme.custom.mainButton,
               }}
            >
              {currency}
            </Button>
          ))}
          </Box>

           <Box display={"flex"} alignItems={"center"} gap={1}>
          <Typography variant="h4">Duration:</Typography>
          {["monthly", "yearly"].map((type) => (
            <Button
              key={type}
              variant={billingType === type ? "contained" : "outlined"}
              onClick={() => setBillingType(type)}
              sx={{background: billingType === type ? (theme) => theme.custom.mainButton : "",
                 color: billingType === type ? "white" : (theme) => theme.custom.mainButton,
                   borderColor: billingType === type ? "" : (theme) => theme.custom.mainButton,
               }}

            >
              {type === "monthly" ? "Monthly" : "Yearly"}
            </Button>
          ))}
          </Box>
        </Box>
        </DialogContent>

      </Dialog>
    </Box>
  );
};

export default Plans;
