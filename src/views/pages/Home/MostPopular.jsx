import {useState ,useEffect,useContext} from "react"
import axios from "axios"
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { Box ,Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "src/context/User";
import { useTranslation } from 'react-i18next';






const MostPopular = () => {

      const [isLoading, setIsLoading] = useState(false);
      const [userListToDisplay, setUserListToDisplay] = useState([]);
      const navigate = useNavigate();
      const auth = useContext(UserContext);
      const [isSubscribed, setisSubscribed] = useState(false);
          const {t} = useTranslation();
      

        
   
      const getuser = async (cancelTokenSource) => {
        setIsLoading(true); 

        try {
            const res = await axios({
                method: "GET",
                url: Apiconfigs.latestUserList, 
                params: {
                    userType: "Creator",
                    page: 1,
                    limit: 100
                },
                headers: {
                    token: sessionStorage.getItem("token"),
                },
                cancelToken: cancelTokenSource?.token,
            });

            // Sort users by followers count (most followers first)
            const sortedUsers = res.data.result.docs
            .sort((a, b) => b.followers.length - a.followers.length)
            .slice(0, 8); // Get top 6 users
    
          // Initialize isSubscribed for each user
          const updatedUsers = sortedUsers.map((user) => ({
            ...user,
            isSubscribed: auth.userData?._id ? user.followers.includes(auth.userData._id) : false,
          }));
    
          setUserListToDisplay(updatedUsers);
        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    
      useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();
        getuser(cancelTokenSource);
    
        return () => {
          cancelTokenSource.cancel();
        };
      }, [auth.userData?._id]);


      const subscribeToUserHandler = async (userCardData) => {
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
                setUserListToDisplay((prevUsers) =>
                    prevUsers.map((user) =>
                      user._id === userCardData._id
                        ? { ...user, isSubscribed: res.data.result.subscribed === "yes" ,
                              followers: res.data.result.subscribed === "yes"
                              ? [...user.followers, auth.userData._id] // Add user to followers
                              : user.followers.filter((id) => id !== auth.userData._id),
                        }
                        : user
                    )
                  );
                }
               else {
                toast.error(res.data.result);
              }
            })
            .catch((err) => {
              toast.error(err?.response?.data?.responseMessage);
            });
        } else {
          toast.error("Please Login");
        }}


       
       


return(
    <><Box dir={"ltr"} sx={{padding:"30px 150px", 
           
          }} display="flex" flexDirection="column" alignItems="center">
                    <Typography align="center" variant="h1" color="white" mb={3}>{t("Popular Creators")}</Typography>
             <Box mt={2} sx={{ display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr 1fr", 
                    gap: "50px", 
                    padding: "10px",
                    "@media(max-width:1200px)":{
                        gridTemplateColumns:"1fr 1fr"
                    },
                    "@media(max-width:900px)":{
                        gridTemplateColumns:"1fr"
                    }
                    }}>
   
                    {userListToDisplay.length > 0 ? (
                        userListToDisplay.map((user) => (
                            <Box sx={{  boxShadow:"0 4px 8px rgba(0, 0, 0, 0.5)",borderRadius:"20px","&:hover":{
                                transform:"scale(1.05)",
                                transition:"ease-out 500ms"
                            }}}>
                            <Box key={user._id}  display="flex" sx={{background:"linear-gradient(to top right,#900098,#4d0051)", padding:"10px 20px", borderRadius:"20px 20px 0 0" ,
                              }}>
                            
                               <img 
                               onClick={() => {
                                navigate("/user-profile/" + user.userName);
                              }} 
                               src={user.profilePic? user.profilePic : "/assets/Images/profile.jpg"} 
                               style={{width:"80px", height:"80px" ,borderRadius:"50%",cursor:"pointer"}} 
                               alt="profile">
                                </img> 
                               <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" color="white" ml={3}> 
                                 <strong>{user.name}</strong> 
                                  {user.followers.length} {t("Subscribers")}
                                  </Box>
                            </Box>
                            <Box align="center" sx={{background:"linear-gradient(to top right,rgb(113, 3, 119),rgb(48, 0, 51))"
                            ,color:"white"
                            ,borderRadius:"0 0 20px 20px"
                            ,fontWeight:"bold" 
                            ,padding:"5px"
                            ,cursor:"pointer",
                            "&:hover":{
                                background:"linear-gradient(to top right,rgb(113, 3, 119),rgb(0, 0, 0))"
                            }
                        }}
                          
            onClick={(event) => {
                event.stopPropagation(); // يمنع تشغيل onClick الخاص بـ Box
                subscribeToUserHandler(user);
              }}
          
          >
            {user.isSubscribed ? t("Subscribed") : t("Subscribe")}
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <></>
                    )}
                
                </Box>
                </Box>
    </>
)

}

export default MostPopular



 