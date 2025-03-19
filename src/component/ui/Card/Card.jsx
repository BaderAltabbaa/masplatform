import React from "react";
import "./Card.css";

const Card = ({  imgsrc, titel, text,AvatarClick }) => {
  return (
    <div className="card-container"
    >
      
      <div className="content2">
        
        <div className="text-content2">
          <h3 style={{ 
            fontSize:'14px'
           }}>{titel}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div
        className="profile-picture2"
       
      >
        
          <img
            src={imgsrc? imgsrc : "/assets/Images/profile.jpg"}
            alt="profile"
    
            className="profile-img"
            onClick={AvatarClick}
            style={{cursor :"pointer"}}
          />
       
      
      </div>
     
    </div>
  );
};

export default Card;
