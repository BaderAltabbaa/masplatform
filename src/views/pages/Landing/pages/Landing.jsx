
import { Typography ,Box,styled,Grid} from "@mui/material";
import img1 from "../assets/Image_1.png"
import img2 from "../assets/Image_2.png"
import { slideIn, fadeIn, textVariant } from "../utils/Motion.js"
import { motion } from "framer-motion";
import CountdownTimer  from '../components/ui/CountdownTime.jsx'
import ButtonL from "../components/ui/button.jsx";
import { useInView } from "react-intersection-observer";




const Landing = () => {

  const ImageBox = styled(Box)({
          width: "100%",
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.3s ease",
          margin: 20,
        });

  const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.8 }
        }
      };

   const RotatedGridContainer = styled(Box)({
          transform: "rotate(45deg)",
          width: "400px",
          height: "400px",
          margin: "50px auto",
          overflow: "hidden",
        });

const AnimatedRotatedGrid = () => {
        const [ref, inView] = useInView({
          triggerOnce: true,
          threshold: 0.1,
        }); 
        return (
              <RotatedGridContainer 
                ref={ref}
                component={motion.div}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={containerVariants}
              >
                <Grid container spacing={2} sx={{ width: "100%", height: "100%" }}>
                  {[1,2,3,4].map((img, index) => (
                    <Grid item xs={6} key={index} sx={{ padding: "0 !important" }}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          paddingTop: "100%",
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <ImageBox
                          sx={{
                            background: (theme) => theme.custom.CarBackGround,
                            position: "absolute",
                            top: 0,
                            left: 0,
                            borderRadius: 10
                          }}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </RotatedGridContainer>
            );
          };


  return (
    <Box sx={{background: (theme) => theme.custom.PageBackGround,
    }}>
     
     <Box sx={{maxWidth:1200,mx:"auto",px:2, py:{xs:2,md:10}}}>
    
     


      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={textVariant(.3)} className=' flex flex-col items-center'
        >
           <Box sx={{position:"absolute" ,left:"0",display:{xs:"none",lg:"flex",zIndex:1}}}>
      <AnimatedRotatedGrid/>
     </Box>
     <Box sx={{position:"absolute" ,right:"0",display:{xs:"none",lg:"flex",zIndex:1}}}>
      <AnimatedRotatedGrid/>
     </Box>


        <Typography variant="h1" mb={2} sx={{fontSize:{xs:"2rem",md:"3rem",color:"white"},textAlign:"center",zIndex:2}}>
          Marvelous Agency of Support is a digital  platform that aims to help creators

        </Typography>

        <Typography mb={2} sx={{fontSize:"1rem",color:"white",textAlign:"center",zIndex:2}}>by helping them achieve more by matching them with potential clients and connecting with their audience. Based on blockchain technology, the mas platform will feature increased transparency, being at the same time very easy to use.</Typography>
        <Typography  mb={2} sx={{fontSize:"1rem",color:"white",textAlign:"center",zIndex:2}}>2-3rd December 2021</Typography>
     

        <CountdownTimer/>
        <ButtonL >GET STARTED</ButtonL>


      </motion.div>
     
    </Box>
    </Box>
  )
}

export default Landing
