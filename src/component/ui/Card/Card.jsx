import React from "react";
import "./Card.css";
import { Box } from "@mui/material";

const Card = ({  imgsrc, titel, text,AvatarClick }) => {
  return (
    <Box className="card-containerx" sx={{background: (theme) => theme.custom.miniUserCard}}
    >
      
      <div className="content2x">
        
        <div className="text-content2x">
          <span className="main-span">{titel}</span>
          <span className="sub-span">{text}</span>
        </div>
      </div>
      <div
        className="profile-picture2x"
       
      >
        
          <img
            src={imgsrc? imgsrc : "/images/users/dprofile.avif"}
            alt="profile"
    
            className="profile-imgx"
            onClick={AvatarClick}
            style={{cursor :"pointer"}}
          />
       
      
      </div>
     
    </Box>
  );
};

export default Card;
