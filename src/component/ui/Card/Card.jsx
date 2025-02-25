import React from "react";
import "./Card.css";

const Card = ({  imgsrc, titel, text,AvatarClick }) => {
  return (
    <div className="card-container"
    >
      
      <div className="content2">
        
        <div className="text-content2">
          <h3 style={{ 
            
            fontSize:'18px'
           }}>{titel}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div
        className="profile-picture2"
       
      >
        {imgsrc ? (
          <img
            src={imgsrc}
            alt="profile"
    
            className="profile-img"
            onClick={AvatarClick}
            style={{cursor :"pointer"}}
          />
        ) : (
          <div
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            backgroundColor: imgsrc ? "transparent" : "white", // لون محدد إذا لم يتم تمرير الصورة
          }}
          
          className="origin-left rounded-full transition-transform duration-300 ease-in-out transform hover:rotate-180 hover:scale-110 circular-image2"
          >
          
          </div> 
        )}
      </div>
     
    </div>
  );
};

export default Card;
