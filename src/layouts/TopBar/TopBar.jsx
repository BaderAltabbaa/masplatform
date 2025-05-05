import {
  AppBar,
  Toolbar,
  Button,
  Tooltip,
  Avatar,
  IconButton,
  InputBase,
  Grid,
  Badge,
  Box,
  Typography,
  useMediaQuery,
  Zoom,
  TextField, List, ListItem, ListItemText,

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AiOutlineLogout } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "src/context/User";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React, { useContext, useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Logo from "src/component/Logo";
import User from "src/component/User";
import NotificationCard from "src/component/NotificationCard";
import Dialog from "@mui/material//Dialog";
import DialogContent from "@mui/material//DialogContent";
import NoDataFound from "src/component/NoDataFound";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import InputAdornment from "@mui/material/InputAdornment";
import './TopBar.css'
import StaticPage from '../../views/pages/staticPage';
import LanguageSwitcher from '../../component/LangugeSwitcher';
import { FaSearch, FaBars, FaTimes, FaUser,FaDollarSign ,FaArrowUp} from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { hideSupportIcon } from '../../utils';




const menuLinks = [
  {
    label: "Explore",
    href: "/bundles",
    isLink: true,
  },
  {
    label: "Marketplace",
    href: "/items",
    isLink: true,
  },
  {
    label: "Creators",
    href: "/creators",
    isLink: true,
  },
  {
    label: "Transfer`s",
    href: "/user-list",
    isLink: true,
  },
];

const useStyles = makeStyles((theme) => ({








  flexButton: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
  },


  inputRoot: {
    color: "black",
    fontSize: "12px",
    width: "100%",
  },

  inputInput: {
    fontSize: "13px",
    color: "black",
    paddingLeft: "10px",

    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },


  searchResults: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    zIndex: '1000',
    background: "#cdc8c8",
    height: '100vh',
    maxHeight: "100vh",
    width: "300px",
    overflowY: "scroll",
    "@media(max-width:1250px)": {
      top: "0px"
    },

  },

  searchBox: {
    border: "1px solid gray",
    borderRadius: "29px",
    backgroundColor: "#eee"
  },


}));

export default function Header() {
  // 
  const isMeduimScreen = useMediaQuery('(max-width: 1250px)');
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const {t} = useTranslation();
  const [openSupport, setOpenSupport] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const isMobileView = useMediaQuery('(max-width: 1250px)');

 const handleOpenSupport = () => {
  setOpenSupport(true);
  socketRef.current.emit('join_chat', { userId: 'user123' }); // Replace with actual user ID
 } 

 const handleCloseSupport = () => {
  setOpenSupport(false);
 } 
 
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!isAboutDropdownOpen)
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // إغلاق القائمة إذا تم النقر خارجها
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(false); // Close the menu whenever the window is resized
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // No dependencies, runs only once on mount and cleans up on unmount


  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(Apiconfigs.baseUrl); // Replace with your server URL

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('chat_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: 'user',
        timestamp: new Date().toISOString(),
      };
      
      // Emit message to server
      socketRef.current.emit('chat_message', newMessage);
      
      // Add to local state immediately for instant feedback
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };



  // 
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLogOutOpen, setIsLogoutOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState();
  const auth = useContext(UserContext);
  const search = auth?.search;
  const setsearch = auth?.setsearch;
  const [notify, setNotify] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);


  useEffect(() => {
    const fetchUserAsyncInsideHook = async () => {
      if (auth.isLogin && !auth.userData) {
        await auth.updateUserData();
      }
    }
    fetchUserAsyncInsideHook();
  }, []);

  useEffect(() => {
    setNotify(auth?.notifyData);
  }, [auth?.notifyData]);

  const readNotificationhandler = () => {
    try {
      axios.get(Apiconfigs.markAllNotificationsRead, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      }).then((res) => {
        if (res.data.result.ok == 1) {
          auth.setUnReadNotification(0);
        }
      });
    } catch (error) {
      console.log(error)
    }
  };

  const getSearchResult = async (cancelTokenSource) => {
    setIsLoading(true);
    axios({
      method: "GET",
      url: Apiconfigs.latestUserList,
      data: {
        cancelToken: cancelTokenSource && cancelTokenSource.token,
      },
      params: {
        limit: 10,
        page: page,
        search: search,
        userType: "Creator",
      },
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.data.statusCode === 200) {
          if (res.data.result.docs) {
            setIsLoading1(true);
            setUserList(res.data.result.docs);
          }
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  const {

    flexButton,
    inputInput,
    inputRoot,
    loginModal,
  } = useStyles();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });




  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1084
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);


  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (search !== "") {
      getSearchResult(cancelTokenSource);
    } else {
      setUserList();
      setPage(1);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [search, page]);

  const ProfileId = auth?.userData?._id;

  window.addEventListener("click", function (event) {
    setsearch("");
  });


  const ProfileDropdown = ({ onClose, unreadChats, unReadNotification }) => {

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: '50%', // Center it horizontally
          transform: 'translateX(-50%)', // Adjust for exact centering
          backgroundColor: '#cdc8c8',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
          padding: '10px',
          zIndex: 1000,
        }}
      >
        <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box>
        <Button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
                       startIcon={
              <Badge>
                <FaUser/>
              </Badge>
            }
          >

            {t("My Profile")}
          </Button>
          </Box>
          <Box>

          <Button
            onClick={() => {
              navigate("/chat/t");
              onClose();
            }}
            startIcon={
              <Badge badgeContent={unreadChats} >
                <BsChat />
              </Badge>
            }
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
                     >
            {t("Chat")}
          </Button>
          </Box>
          
          <Box>
          <Button
            onClick={() => {
              readNotificationhandler();
              setOpenNotifications(true);
            }}
            startIcon={
              <Badge badgeContent={auth.unReadNotification} color="primary">
                <NotificationsIcon />
              </Badge>
            }
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
                     >
            {t("Notifications")}
          </Button>
          </Box>
          <Box>
          <Button
            onClick={() => {
              navigate("/buymas");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
                       startIcon={
              <Badge>
                <FaDollarSign/>
              </Badge>
            }
          >
            {t("Buy A Mas")}
          </Button>
          </Box>
        </Box>
      </Box>
    );
  };

  const AboutUsDropDown = ({ onClose, isMobile }) => {
    return (
      <Box
        sx={{
          position: isMobile ? 'relative' : 'absolute', // Only relative in mobile
          top: isMobile ? 'unset' : '100%', // Reset top in mobile
          left: isMobile ? 'unset' : '50%', // Reset left in mobile
          transform: isMobile ? 'none' : 'translateX(-50%)', // Only center in desktop
          backgroundColor: '#cdc8c8',
          borderRadius: isMobile ? '0' : '4px', // Sharp edges in mobile
          padding: '10px',
          zIndex: 1000,
          width: isMobile ? '100%' : 'auto', // Full width in mobile
          whiteSpace:"nowrap",
          textAlign:"center"
        }}
      >
      <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box>
        <Button
            onClick={() => {
              navigate("/FAQ");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
           
          >

            {t("FAQ")}
          </Button>
          </Box>

          <Box>
        <Button
            onClick={() => {
              navigate("/Blogs");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
           
          >

            {t("Blogs")}
          </Button>
          </Box>
          <Box>
        <Button
            onClick={() => {
              navigate("/About_us");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
           
          >

            {t("About us")}
          </Button>
          </Box>

          <Box>
        <Button
            onClick={() => {
              navigate("/Contact_Us");
              onClose();
            }}
            sx={{color:"#43005e",
              "&:hover":{
                  background:"none",
                  color: "#8602ba"
              }
            }}
           
          >

            {t("Contact us")}
          </Button>
          </Box>
      </Box>
    </Box>
    )
}


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // start Search result
  const SearchResult = () => {
    return (
      <Box className={classes.searchResults}>
        {/* Start Title */}
        <Box style={{ height: '54px', marginBottom: "14px", color: '#fafafa', backgroundImage: 'linear-gradient(to bottom,rgb(116, 23, 108), #480048)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" style={{ color: "white" }}>
            {t("Search Result")}
          </Typography>
        </Box>
        {/*End Title */}
        {!isLoading && userList && userList.length === 0 ? (
          <NoDataFound />
        ) : (
          ""
        )}
        {userList &&
          userList?.map((data, i) => {
            return (
              <Button
                key={i}
                onClick={() => {
                  navigate(`/user-profile/${data.userName}`);
                }}>
                <User
                  search={search}
                  isLoading1={isLoading1}
                  setIsLoading1={setIsLoading1}
                  setsearch={setsearch}
                  userList={userList}
                  setUserList={setUserList}
                  users={data}
                  history={history}
                />
              </Button>
            );
          })}
      </Box>
    )
  }

const hideicon = hideSupportIcon(location.pathname)


const [showScroll, setShowScroll] = useState(false);

useEffect(() => {
  const checkScroll = () => {
    if (window.scrollY > 100) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  window.addEventListener('scroll', checkScroll);
  return () => window.removeEventListener('scroll', checkScroll);
}, []);

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

  return (
    <>
      <AppBar
        position={"relative"}
        elevation={0}
        style={{ border: "none" }}
      >


        <header style={{display:"flex",backgroundColor:"#cdc8c8" ,padding:"0 10px"}}>
          <div className='logo1_contanier '>
            <Link to={"/"}>
              <img className="logo1" src="\assets\Images\bader-logo.svg" alt="Logo11" />
            </Link>
          </div>

          <div className='right'>
            <div className="search-container1">
              {isSearchVisible && (

                <Box className={classes.searchBox} >
                  <InputBase
                    placeholder={t("Search..")}
                    style={{ color: "#000", paddingLeft: "8px" }}
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    classes={{
                      root: inputRoot,
                      input: inputInput,
                    }}
                    inputProps={{ "aria-label": "search" }}

                  />

                  {search !== "" && <SearchResult />}

                </Box>

              )}
              <FaSearch
                style={{ fontSize: '20px', margin: '10px', cursor: 'pointer', color: ' #43005e' }}
                onClick={toggleSearch}
              />
              <LanguageSwitcher/>
            </div>

            <button className="burger-icon" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>



          <nav className={` nav-links1 ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <ul  style={{ display: "flex", alignItems: "center", marginBottom: "10px" ,padding:"0"}}>
            <li><Link to="/creators">{t("Creators")}</Link></li>
              <li><Link to="/bundles">{t("Bundles")}</Link></li>
              <li><Link to="/items">{t("Marketplace")}</Link></li>
              <li><Link to="/education">{t("Education")}</Link></li>
              <li><Link to="/user-list">{t("Transfer")}</Link></li>
              <li><Link to="/corporate/metaverse">{t("Games")}</Link></li>
              <li><Link to="/corporate/metaverse">{t("Metaverse")}</Link></li>
              <li 
  ref={aboutDropdownRef} 
  onClick={toggleAboutDropdown}
  style={{ 
    position: 'relative',
    display: 'flex',
    flexDirection: isMobileView ? 'column' : 'row' // Only column in mobile
  }}
>
  <Link>{t("About us")}</Link>
  {isAboutDropdownOpen && (
    <AboutUsDropDown
      onClose={() => setAboutDropdownOpen(false)}
      isMobile={isMobileView} // Pass mobile state
    />
  )}
</li>

              <li className='test'><Link to="/buymas">{t("Buy A Mas")}</Link></li>
              <li className='test'><Link to="/connectWallet">{t( "Connect Wallet")}</Link></li>

              { auth.userLoggedIn ? <></> :
                
                <li className='test'><Link to="/create-account">{t("Register")}</Link></li>}

              {
                auth.userLoggedIn ? <></> :

                  <li className='test'><Link to="/login">{t( "Login")}</Link></li>}


            </ul>

            <div style={{ display: "flex" ,alignItems:"center" }}>
              <div className="search-container2">
                {isSearchVisible && (

                  <Box className={classes.searchBox} >
                    <InputBase
                      placeholder={t("Search..")}
                      style={{ color: "#000", paddingLeft: "8px" }}
                      value={search}
                      onChange={(e) => setsearch(e.target.value)}
                      classes={{
                        root: inputRoot,
                        input: inputInput,
                      }}
                      inputProps={{ "aria-label": "search" }}
                      sx={{
                        "& .MuiInputBase-input": {
                          textAlign: "center", // Center the text
                        },
                      }}

                    />

                    {search !== "" && <SearchResult />}

                  </Box>

                )}
                <FaSearch
                  style={{ fontSize: '20px', margin: '10px', cursor: 'pointer', color: ' #43005e' }}
                  onClick={toggleSearch}
                />
                <LanguageSwitcher/>
              </div>



              {auth.userLoggedIn ? <Box sx={{
                position: 'relative',
                "@media(max-width:1250px)": {
                  display: "none"
                }
              }}
                ref={dropdownRef}>
                  <IconButton onClick={toggleDropdown}>
                    <Avatar
                      alt={auth.userData?.userName}
                      src={auth.userData?.profilePic}
                      style={{ cursor: 'pointer', border: 'solid 3px #43005e' }}
                    />
                  </IconButton>
                {isDropdownOpen && (
                  <ProfileDropdown
                    onClose={() => setDropdownOpen(false)}
                    unreadChats={Object.keys(auth.unreadChats).length}
                    unReadNotification={auth.unReadNotification}
                  />
                )}
              </Box> : <></>}


              {ProfileId ? (
                <Grid item >
                  <Box display="flex" justifyContent="center" alignItems="center">
                    {ProfileId && (
                      <Box sx={{
                        display: "none",
                        "@media(max-width:1250px)": {
                          display: "block"
                        }
                      }} >
                        <Tooltip title="Chat" placement="bottom">
                          <IconButton onClick={() => navigate("/chat/t")}>
                            <Badge badgeContent={Object.keys(auth.unreadChats).length} overlap="rectangular" color="primary">
                              <BsChat style={{ color: " #43005e" }} />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                    {ProfileId && (
                      <Box sx={{
                        display: "none",
                        "@media(max-width:1250px)": {
                          display: "block"
                        }
                      }}>

                        <Tooltip title="Notification" placement="bottom">
                          <IconButton
                            onClick={() => {
                              readNotificationhandler();
                              setOpenNotifications(true);
                            }}
                          >

                            <Badge
                              badgeContent={auth.unReadNotification}
                              overlap="rectangular"
                              color="primary"
                            >
                              <NotificationsIcon
                                style={{ color: " #43005e" }}
                                size="12px"
                              />
                            </Badge>
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                    {
                      auth.userLoggedIn ? <>
                        <Tooltip
                          title="My Profile"
                          placement="bottom"
                        >
                          <Avatar onClick={() => navigate("/profile")}
                            alt={auth.userData?.userName}
                            src={auth.userData?.profilePic}
                            style={{ cursor: 'pointer', border: 'solid 3px  #43005e' }}
                            sx={{
                              display: "none",
                              "@media(max-width:1250px)": {
                                display: "block"
                              }
                            }} />
                        </Tooltip>

                      </> :
                        <Button
                          className="primaryButton "
                          fullWidth
                          variant="contained"
                          size="large"
                          // className={classes.createButton}
                          onClick={() => navigate("/create-account")}
                        >
                          {t("Register")}
                        </Button>
                    }
                    <Box>
                      {auth.userLoggedIn ? (

                        <Tooltip
                          title="Logout"
                          placement="bottom"
                        >
                          <IconButton onClick={() => setIsLogoutOpen(true)}>
                            <AiOutlineLogout />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Button
                          onClick={() => navigate('/login')}
                          variant="contained"
                          size="22px"
                          color="secondary"
                          style={{ marginRight: '10px' }}
                        >
                          {t( "Login")}
                        </Button>

                      )}
                    </Box>
                    {!isMeduimScreen &&
                      (
                        
                         
                          <Button
                            onClick={() => navigate('/connectWallet')}
                            className="primaryButton"

                            variant="contained"
                          >
                            {t( "Connect Wallet")}
                          </Button>

                        
                      )
                    }
                  </Box>
                </Grid>
              )
                : (
                  <div className='btn_group test2'>
                    <Link style={{ color: "white" }} to="/create-account" className=' Create_on_MAS'> <Button className="primaryButton"
                      fullWidth
                      variant="contained">{t("Register")}</Button>
                      </Link>

                    <Link style={{ color: "white" }} to="/login">
                      <Button
                        className="primaryButton p"
                        fullWidth
                        variant="contained"

                      >{t( "Login")}</Button>

                    </Link>
                    <Link style={{ color: "white" }} to="/buymas" className="primaryButton "

                      variant="contained"><Button className="primaryButton"

                        variant="contained">{t("Buy A Mas")}</Button></Link>
                    <Link style={{ color: "white" }} to="/connectWallet" className='ConnectWallet'> <Button className="primaryButton"

                      variant="contained">{t( "Connect Wallet")}</Button></Link>


                  </div>
                )}
            </div>





          </nav>

        
          

        </header>

      </AppBar>

      <Zoom in={window.scrollY > 100}>
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 1000,
          backgroundColor: 'rgb(206, 204, 204)',
          color: '#43005e',
          '&:hover': {
            backgroundColor: '#cdc8c8',
            transform: 'scale(1.1)'
          },
          transition: 'all 0.3s ease'
        }}
        size="large"
        aria-label="scroll back to top"
      >
        <FaArrowUp fontSize="24px" />
      </IconButton>
    </Zoom>

      {auth.userLoggedIn && !hideicon &&
      
      <Box 
      onClick={handleOpenSupport}
      sx={{
        position: "fixed",
        bottom: "15px",
        right: "15px",
        zIndex: "1000",
        background: "#cdc8c8",
        borderRadius: "50%", 
        width: "60px",
        height: "60px",
        overflow: "hidden",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "40px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.6)",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.05)",
          transition: "ease-in-out 500ms"
        }
      }}
    >
      <img src="\assets\Images\support.png" alt="" width='40px' />
   
    </Box>
      }


<Dialog 
        open={openSupport} 
        onClose={handleCloseSupport} 
        fullWidth
        maxWidth="sm"
        disableScrollLock={true}
        sx={{
          margin:"80px 0px"
          ,
          "& .MuiDialog-container": {
            alignItems: "flex-end",
            justifyContent: "flex-end",
          },
          "& .MuiDialog-paper": {
            margin: "0px",
            height: "60vh",
            maxHeight: "500px",
            maxWidth:"350px",
            display: "flex",
            flexDirection: "column"
          }
        }}
        PaperProps={{
          sx: {
            backgroundImage: 'url(/assets/Images/doodle2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
        }}
        BackdropProps={{
          style: {backgroundColor:"transparent"}
        }}
      >
        <DialogContent sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column',
          padding: 0
        }}>
          <Box sx={{ 
            p: 2, 
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderBottom: '1px solid #eee'
          }}>
            <Typography variant="h6" sx={{ color: '#43005e' }}>
              Support Chat
            </Typography>
            <Typography variant="caption" sx={{ color: isConnected ? 'green' : 'red' }}>
              {isConnected ? 'Online' : 'Offline'}
            </Typography>
          </Box>
          
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto', 
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }}>
            <List>
              {messages.map((msg, index) => (
                <ListItem 
                  key={index} 
                  sx={{ 
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    py: 1
                  }}
                >
                  <Box sx={{
                    maxWidth: '80%',
                    padding:"5px 10px",
                    borderRadius: 2,
                    backgroundColor: msg.sender === 'user' ? '#600086' : '#e0e0e0',
                    color: msg.sender === 'user' ? 'white' : 'black',
                    boxShadow: 1
                  }}>
                    <ListItemText 
                      primary={msg.text} 
                      secondary={new Date(msg.timestamp).toLocaleTimeString()}
                      secondaryTypographyProps={{
                        color: msg.sender === 'user' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                        fontSize:"10px"
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
              <div ref={messagesEndRef} />
            </List>
          </Box>
          
          <Box sx={{ 
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderTop: '1px solid #eee'
          }}>
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Type your message"
              placeholder="Type your message here..."
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button 
                onClick={handleCloseSupport} 
                sx={{ mr: 2, color: " #43005e" }}
              >
                Close
              </Button>
              <Button 
                variant="contained"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                sx={{
                  background: "#43005e",
                  "&:hover": {
                    background: "#320046"
                  },
                  "&:disabled": {
                    background: "#e0e0e0",
                    color: "#9e9e9e"
                  }
                }}
              >
                Send
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

  
      <Dialog
        open={openNotifications}
        onClose={() => setOpenNotifications(false)}
        scroll='paper'
        fullWidth
        PaperProps={{
          sx: {
            backgroundImage: 'url(/assets/Images/doodle2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            
          }
        }}
        disableScrollLock={true}
      >
        <DialogContent>
          {notify.length == 0 ? (
            <NoDataFound />
          ) : (
            <Box
              style={{
                maxHeight: 450,
                overflowY: "auto",
              }}
            >
              {notify.map((data, i) => {
                return <NotificationCard data={data} index={i} key={i} />;
              })}
            </Box>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={isLogOutOpen}
        onClose={() => setIsLogoutOpen(false)}
        PaperProps={{
          sx: {
            backgroundImage: 'url(/assets/Images/doodle2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            
          }
        }}
      >
        <DialogContent style={{ padding: "20px 50px" }}>
          <Box className={loginModal}>
            <Typography variant="h4" style={{ marginBottom: "12px" }}>
              {t("Are you sure want to logout!")}
            </Typography>

            <Box mt={1} display="flex">
              <Button
                variant="contained"
                size="small"
                color='white'
                style={{ fontSize: "15px", background: " #2f0032", color: "white", margin: "0 5px" }}

                mr={2}

                fullWidth
                onClick={() => setIsLogoutOpen(false)}
              >
                {t("No")}
              </Button>
              <Button
                variant="contained"
                size="small"
                color='white'
                style={{ fontSize: "15px", background: "#2f0032", color: "white", margin: "0 5px" }}



                fullWidth
                onClick={() => {
                  auth.logOut();
                  navigate('/');
                }}
              >
                {t("Yes")}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
