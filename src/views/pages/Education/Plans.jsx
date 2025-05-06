
import React, { useState, useContext, useEffect ,useRef } from "react";
import {
  Grid,
  Container,
  Box,
  Typography,
  Pagination,
  Button ,
  Dialog,
  DialogTitle,
  DialogContent,TextField,Snackbar,InputAdornment,Input,Select
} from "@mui/material";  
import MuiAlert from '@mui/material/Alert';
import PlanCard from "./PlanCard";

const Plans = () => {

    const Plans = [
        {
        id: 1,
        name: "Premium Plan",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },

      { 
        id: 2,
        name: "Premium Plan",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },
      { id: 3,
        name: "Premium Plan",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },

      { id: 4,
        name: "Premium Plan",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },
      { id: 5,
        name: "Premium Plan",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },
      { id: 6,
        name: "Premium",
        subtext: "Best for professional use",
        price: "$29.99",
        billingCycle: "per month",
        features: [
          "Feature A",
          "Feature B",
          "Feature C",
          "Feature D"
        ]
      },
     

    ]

return (
    <>
    <Box
    sx={{
        background : (theme) => theme.custom.PageBackGround,
        padding:"20px 0"
    }}
    >
        <Container maxWidth='xl'>
        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"10px"
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
       Education Plans
      </div>
    </div>
    </div>


  <div style={{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  }}>
    <Grid  container 
        spacing={3} 
        maxWidth="lg" // Limits the maximum width of the grid
        
        > 
        {Plans.map((plan) => (
          <Grid item key={plan.id} xs={12} sm={6} md={4} 
          sx={{
            '& > *': {          // Targets direct child (your PlanCard)
              mx: 'auto',       // Centers card horizontally
            }
          }}
        >
            <PlanCard plan={plan} />
          </Grid>
        ))}
      </Grid>
   
      </div>
      
        </Container>

    </Box>
    </>
)



}
export default Plans