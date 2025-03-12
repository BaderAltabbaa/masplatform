import React,{useContext, useState} from "react"
import BalanceBox from "../../../../../component/ui/BalanceBox"
import { UserContext } from "src/context/User"
import { Link } from "react-router-dom"
import MainCard from '../../ui-component/cards/MainCard'
import { tokensDetails } from "src/constants";
import { Box ,Typography,Button} from "@mui/material"
import '/src/views/pages/Profile/buymas.css' 






const Wallet = () => {

  const user = useContext(UserContext);

  const availableBalance = {
    masBalance : parseFloat(user.userData.masBalance),
    fdusdBalance : parseFloat(user.userData.fdusdBalance),
    usdtBalance : parseFloat(user.userData.usdtBalance),
  }


    return(
<>
<MainCard title="My Wallet">
    <Box sx={{
        padding:"0 150px",
        "@media(max-width: 800px)":{
            padding:"0"
        }
    }}>
               <div className="tableWrapper">
               <div className="tableAnimatedBackground"></div>
               <div className="tableInnerBlurEffect"></div>
   <Box sx={{backgroundColor:"#30003c" , padding:"40px" ,borderRadius:"20px",position:"relative"}}>
    <Typography variant="h2" color="white" align="center" mb={5}>My Ballance</Typography>
    <BalanceBox
        availableBalance={availableBalance}
        tokensDetails={tokensDetails}
        />
        <Box align="center" mt={5} display="flex" justifyContent="space-around">
            <Link to={"/buymas"}><Button className="primaryButton">Buy MAS</Button></Link>
            <Link to={"/connectWallet"}><Button className="primaryButton">Connect Wallet</Button></Link>


        </Box>
        </Box>
        </div>
        </Box>
</MainCard>
</>    
)
}

export default Wallet