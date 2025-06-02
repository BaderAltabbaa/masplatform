import { Button } from "@mui/material"

const ButtonL=({children}) => {
return(

    <Button sx={{background:(theme) => theme.custom.gradientButton, padding:"10px" ,borderRadius:"10px",color:"white"
        ,"&:hover":{
background:(theme) => theme.custom.hoverGradientButton
        }
    }}>{children}</Button>
)
    
}

export default ButtonL