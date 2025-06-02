import Landing from "./pages/Landing"
import Services from "./pages/Services"
import BusinessModel from "./pages/BusinessModel"
import 'src/App.css'
import FAQ from "./pages/FAQ"
import IeoSpecifics from "./pages/IeoSpecifics"
import VestingChart from "./pages/VestingChart"
import { Box } from "@mui/material"



const MainLayout = () => {

    return <>
    <div >
    <Landing/>
    <Box sx={{background:(theme) => theme.custom.PageBackGround}}>
    <Services/>
    </Box>
    <BusinessModel/>
    <Box sx={{background:(theme) => theme.custom.PageBackGround}}>
    <FAQ/>
    </Box>
    <IeoSpecifics/>
    <VestingChart/>
    
    

    </div>
    </>
}

export default MainLayout