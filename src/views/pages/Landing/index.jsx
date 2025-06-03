import Landing from "./pages/Landing"
import Services from "./pages/Services"
import BusinessModel from "./pages/BusinessModel"
import TokenomicsChart from "./pages/TokenomicsChart"
import 'src/App.css'
import FAQ from "./pages/FAQ"
import IeoSpecifics from "./pages/IeoSpecifics"
import VestingChart from "./pages/VestingChart"
import { Box } from "@mui/material"
import ServicesSection from "../Home/ServicesSection"


const MainLayout = () => {

    return <>
        <div >
            <Landing />
            <Box sx={{ background: (theme) => theme.custom.PageBackGround, pt: 2, pb: 10 }}>
                { /*   <Services/>*/}
                <ServicesSection />
            </Box>


            <BusinessModel />
            <Box sx={{ background: (theme) => theme.custom.PageBackGround }}>
                <FAQ />
            </Box>
            <IeoSpecifics />
            <TokenomicsChart />
            <VestingChart />



        </div>



    </>
}

export default MainLayout