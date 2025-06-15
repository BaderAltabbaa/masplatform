import React from "react"
import { Box ,Container} from "@mui/material"
import { useInView } from 'react-intersection-observer';


const RWA = () => {

    const { ref: ref2,inView: inView2 } = useInView({
                threshold: 0.2, 
                triggerOnce: true,
              });
            
              const { ref: ref3,inView: inView3 } = useInView({
                threshold: 0.2, 
                triggerOnce: true, 
              }); 

    return(
        <>
        <Box
         sx={{
     padding:"20px 0",
      background: (theme) => theme.custom.PageBackGround,
     
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
        src="/assets/Images/wave20.png" 
        alt="Description" 
        style={{ display: 'block' , maxHeight:"120px" }}
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
       RWA
      </div>
    </div>
    </div>

     <div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-text1">Real World Assets</span>
      <span className="who-text2">Comming Soon....</span>
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img style={{
            display:"inline",
            width:"100%",
            borderRadius:"20px"
          }} 
          src="/assets/Images/rwaCrop.jpg" alt="" />
        </div>
      </div>
            </Container>

        </Box>
        </>
    )

}

export default RWA