import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";
import styles from './ButtonWithAnimation.module.css'; 
import { Box, Button } from "@mui/material";


export const PrimaryButton = styled(MuiButton)(({ pill }) => ({
  background: "linear-gradient(to bottom right, #640D5F, rgb(199, 113, 238))",
  border: "none",
  padding: "10px 15px",
  borderRadius: pill ? 50 : 15,
  cursor: "pointer",
  width: "auto",
  transition: "background-color 0.3s",
  color: "white",
  minHeight: 50,
  width: 150,
  "&:hover": {
    background: "linear-gradient(to bottom right, #640D5F, rgb(8, 8, 56))",
  },
}));


  

export const ButtonwithAnimation=({children}) => {
return (
  <Box className={styles.btnBlock}>
        
  <Box className={styles.buttonContainer} sx={{background: (theme) => theme.custom.buttonContainer}}>
    <button className={styles.buttonFree}>{children}</button>
    <Box className={styles.animatedBackground} sx={{background: (theme) => theme.custom.animatedBackground
}}></Box>
    <Box className={styles.innerBlurEffect} sx={{background:(theme) => theme.custom.innerBlurEffect}}></Box>
  </Box>
</Box>
)

}
