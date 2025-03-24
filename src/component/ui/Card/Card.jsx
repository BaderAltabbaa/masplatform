import React from "react";
import "./Card.css";

const Card = ({  imgsrc, titel, text,AvatarClick }) => {
  return (
    <div className="card-containerx"
    >
      
      <div className="content2x">
        
        <div className="text-content2x">
          <h3 style={{ 
            fontSize:'14px'
           }}>{titel}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div
        className="profile-picture2x"
       
      >
        
          <img
            src={imgsrc? imgsrc : "/assets/Images/profile.jpg"}
            alt="profile"
    
            className="profile-imgx"
            onClick={AvatarClick}
            style={{cursor :"pointer"}}
          />
       
      
      </div>
     
    </div>
  );
};

export default Card;
