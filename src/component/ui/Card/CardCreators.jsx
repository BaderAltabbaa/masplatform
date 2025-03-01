import { FaHeart, FaComment } from "react-icons/fa"; // استيراد أيقونة النقاط الثلاثة
import "./cardComponent.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import { Badge, Box, IconButton, Tooltip } from "@mui/material";
import { BsChat } from "react-icons/bs";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";


function CardCreators({
  
  title,
  onFollow,
  CardpersonalInfo,
  Subscribe,
  data,
  chat
}) {
  const [isLiked, setIsLiked] = useState(false); 
  
    const handleLikeClick = () => {
      setIsLiked(!isLiked); 
    };
  const [copyMessage, setCopyMessage] = useState("");
  const [menuVisible, setMenuVisible] = useState(false); 

  const handleCopy = () => {
    navigator.clipboard.writeText(title);
    setCopyMessage("Copied!"); 
    setTimeout(() => setCopyMessage(""), 3000);
    setMenuVisible(false); 
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); 
  };

// clean
  const userCardData = data;
  console.log(data)
  const navigate = useNavigate();
 
  const auth = useContext(UserContext);

  const [isLike, setisLike] = useState(false);
  const [nbLike, setnbLike] = useState(0);
  const [isSubscribed, setisSubscribed] = useState(false);
  const [nbSubscribed, setnbSubscribed] = useState(0);
  // start Handle subscribe function
  const subscribeToUserHandler = async () => {
    if (auth.userData?._id) {
      await axios({
        method: "GET",
        url: Apiconfigs.followProfile + userCardData._id,
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
        .then(async (res) => {
          if (res.data.statusCode === 200) {
            setisSubscribed(res.data.result.subscribed == "yes");
            setnbSubscribed(res.data.result.nb);
          } else {
            toast.error(res.data.result);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.responseMessage);
        });
    } else {
      toast.error("Please Login");
    }
  }
  // End Handle subscribe function

  const likeDislikeUserHandler = async (id) => {
    if (auth.userData?._id) {
      try {
        const res = await axios.get(Apiconfigs.likeDislikeUser + id, {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        if (res.data.statusCode === 200) {
          setisLike((liked) => !liked);
          setnbLike((nb) => isLike ? nb - 1 : nb + 1)
        } else {
          setisLike(false);
          toast.error(res.data.responseMessage);
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      toast.error("Please Login");
    }
  };

  useEffect(() => {
    setnbLike(userCardData?.likesUsers?.length);
    setnbSubscribed(userCardData?.followers?.length);
    if (auth.userData?._id) {
      setisLike(userCardData?.likesUsers?.includes(auth.userData?._id));
      setisSubscribed(userCardData?.followers?.includes(auth.userData?._id));
    }
    console.log(userCardData?._id)

  }, [])
  return (
    <Box
  className="card-3"
  sx={{
     
    background: (theme) => theme.custom.CarBackGround,
   
  }}
    
  onClick={() => {
    navigate("/user-profile/" + userCardData.userName);
  }}
>
  <img src={userCardData.profilePic} alt={title} style={{height:"320px",maxHeight: "270px"}}/>
  <div className="contentContainer">
    <h3
      onClick={(event) => {
        event.stopPropagation(); // يمنع النقر على العنوان من تشغيل onClick الخاص بـ Box
        navigate("/user-profile/" + userCardData.userName);
      }}
    >
      {userCardData && userCardData.name
        ? userCardData.name
        : userCardData.userName}
    </h3>
    <p className="speciality">{userCardData.speciality}</p>


    <div
      className="buttons"
      style={{
        display: "flex",
        alignItems: "center",
        marginTop: "15px",
        justifyContent:"space-evenly"
      }}
    >
 
        <div>
          <button
            onClick={(event) => {
              event.stopPropagation(); // يمنع تشغيل onClick الخاص بـ Box
              subscribeToUserHandler();
            }}
            className="primary"
            style={{padding:"8px"}}
          >
            {isSubscribed ? "Subscribed" : "Subscribe"}
          </button>
          <span
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: "12px",
              padding: "2px",
            }}
          >
            {nbSubscribed
              ? nbSubscribed > 0
                ? nbSubscribed + " subs"
                : "0 sub"
              : "0 sub"}
          </span>
        </div>
     
        
     

      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
       {chat && (
        <Box>
        <Tooltip title="Chat" placement="bottom">
          <div
            onClick={(event) => {
              event.stopPropagation(); // يمنع تشغيل onClick الخاص بـ Box
              navigate(`/chat/t${userCardData._id}`);
            }}
          >
            <Badge
              badgeContent={Object.keys(auth.unreadChats).length}
              overlap="rectangular"
            >
              <BsChat style={{ color: "white", margin: "10px", fontSize: "20px" }} />
            </Badge>
          </div>
        </Tooltip>
      </Box>
       )} 

        <Box
          style={{
            cursor: "pointer",
            margin: "0 3px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "15px", margin: "1px 10px", color: "white" }}>
            {nbLike && nbLike}
          </span>
          <FaHeart
             style={isLike ? {color: ' #FD1D1D' ,fontSize:"20px" } : { color:' #ffffff6e' ,fontSize:"20px" }}
            onClick={(event) => {
              event.stopPropagation(); // يمنع تشغيل onClick الخاص بـ Box
              likeDislikeUserHandler(userCardData._id);
            }}
          />
        </Box>
      </div>
    </div>
  </div>
</Box>

//       <Box className="card-3" onClick={() => {
//         navigate("/user-profile/" + userCardData.userName)
//       }}>
//       <img
//          src={userCardData.profilePic}
//         alt={title}
     
//       />
//       <div
//       className="contentContainer"
//         style={{
      
//         }}
//       >
//         <h3 onClick={() => { navigate("/user-profile/" + userCardData.userName) }} >


//         {userCardData && userCardData.name
//                   ? userCardData.name
//                   : userCardData.userName}
//         </h3>
//         <p> {userCardData.speciality}</p>

//         {
//           CardpersonalInfo && (
//             <Card
//             titel="moustaf"
//              text="Marketing engineer"
//              imgsrc={'assets/Images/15.jpg'}
             
//            />
//           )
//         }
//         <div
//           className="buttons"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             marginTop: "15px",
        
//           }}
//         >
//           {Subscribe ? (   
//             <div>
//              <button
//           onClick={subscribeToUserHandler}
//             // onClick={onFollow}
//             className="primary"
//             style={{}}
//           >
//                          {isSubscribed ? 'Subscribed' : 'Subscribe'}

           
//           </button>
//           <span
//               style={{
//                 color: "white",
//                 fontWeight: "600",
//                 fontSize: "12px",
//                 padding: '2px'
//               }}
//             >
//               {
//                 nbSubscribed ?
//                   nbSubscribed > 0 ?
//                     nbSubscribed + " subs" :
//                     '0 sub' : "0 sub"
//               }
//             </span>

            
//             </div>
          
//         )
          
//           :  (    <button
//             onClick={onFollow}
//             className="primary"
//             style={{}}
//           >
//            Details
           
//           </button>) }


       
      
        
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               position: "relative", // لإظهار القائمة فوق العناصر الأخرى
            
//             }}
//           >

// <Box>
//             <Tooltip title="Chat" placement="bottom">
//               <div onClick={() => navigate(`/chat/t${userCardData._id}`)}>
//                 <Badge badgeContent={Object.keys(auth.unreadChats).length} overlap="rectangular" color="">
//                   <BsChat style={{ color: "white" ,margin : "10px",fontSize: '20px'}} />
//                 </Badge>
//               </div>
//             </Tooltip>
//           </Box>


//            <Box style={{
//                       cursor: "pointer",
//                       margin: "0 3px",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                     }} >
//                       <span style={{ fontSize: '12px', margin: "1px 5px" ,color : 'white' }}>
//                         {nbLike && nbLike}
//                       </span>
//                       <FaHeart
//                         style={{ color:isLiked ? 'red':'white', fontSize: '20px' }} 
//                         onClick={() => likeDislikeUserHandler(userCardData._id)}
//                       />
//                     </Box>

          
//           {/* <FaHeart style={{ color:isLiked ? 'red':'white', fontSize: '20px' }}  onClick={handleLikeClick}/>
                                
//             <span
//               style={{
//                 color: "white",
//                 marginLeft: "7px",
//                 margin : "7px",
//               }}
//             >
//               {likesCount}
//             </span> */}
//              {/* <FaComment style={{ 
//                           color:'white',
//                           fontSize:'20px',
//                           margin : "7px",
                     
//                          }}  /> */}
        

     

          
//           </div>
//         </div>
//       </div>
//     </Box>
    
  );
}

export default CardCreators;
