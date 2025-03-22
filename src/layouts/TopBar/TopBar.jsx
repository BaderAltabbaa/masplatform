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
import { FaSearch, FaBars, FaTimes, FaUser,FaDollarSign } from "react-icons/fa";
import { useTranslation } from 'react-i18next';




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
        <Button
            onClick={() => {
              navigate("/profile");
              onClose();
            }}
            sx={{color:"#43005e"}}
            startIcon={
              <Badge>
                <FaUser/>
              </Badge>
            }
          >

            {t("My Profile")}
          </Button>
         
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
            sx={{color:"#43005e"}}
          >
            {t("Chat")}
          </Button>
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
            sx={{color:"#43005e"}}
          >
            {t("Notifications")}
          </Button>
          <Button
            onClick={() => {
              navigate("/buymas");
              onClose();
            }}
            sx={{color:"#43005e"}}
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
    );
  };

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
  return (
    <>
      <AppBar
        position={"relative"}
        elevation={0}
        style={{ border: "none" }}
      >


        <header className="header  " >
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
            <ul className='' style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
              <li><Link to="/bundles">{t("Explore")}</Link></li>
              <li><Link to="/items">{t("Marketplace")}</Link></li>
              <li><Link to="/creators">{t("Creators")}</Link></li>
              <li><Link to="/user-list">{t("Transfer")}</Link></li>
              <li><Link to="/corporate/metaverse">{t("Games")}</Link></li>
              <li><Link to="/corporate/metaverse">{t("Metaverse")}</Link></li>
              <li className='test'><Link to="/buymas">{t("Buy A Mas")}</Link></li>
              <li className='test'><Link to="/connectWallet">{t( "Connect Wallet")}</Link></li>

              <li className='test'><Link to="/profile">{t("Create on MAS")}</Link></li>

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
                <Tooltip title="My Profile" placement="bottom">
                  <IconButton onClick={toggleDropdown}>
                    <Avatar
                      alt={auth.userData?.userName}
                      src={auth.userData?.profilePic}
                      style={{ cursor: 'pointer', border: 'solid 3px #43005e' }}
                    />
                  </IconButton>
                </Tooltip>
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
                          onClick={() => navigate("/profile")}
                        >
                          {t("Create on MAS")}
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
                    <Link style={{ color: "white" }} to="/profile" className=' Create_on_MAS'> <Button className="primaryButton"
                      fullWidth
                      variant="contained">{t("Create on MAS")}</Button></Link>

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

      <Dialog
        open={openNotifications}
        onClose={() => setOpenNotifications(false)}
        scroll='paper'
        fullWidth
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
                style={{ fontSize: "15px", background: "#2f0032", color: "white", margin: "0 5px" }}

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
