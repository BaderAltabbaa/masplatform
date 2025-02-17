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

import { FaSearch, FaBars, FaTimes } from "react-icons/fa";



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
  menuButton: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
    borderRadius: 0,
    minWidth: "auto",
    color: theme.palette.secondary.main,
    height: "30px",
    padding: "0px 0px",
    letterSpacing: "1px",
    marginLeft: "15px",
    color: "black",
    "@media (max-width: 900px)": {
      color: "#FFF",
      padding: "15px !important",
      height: "51px",
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "&:active": {
      color: theme.palette.secondary.dark,
    },
    "&:hover": {
      color: '#222',
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    "@media (max-width: 900px)": {
      paddingLeft: "75px",
      paddingRight: "20px",
      height: "100%",
    },
  },
  liLink: {
    "& span li": {
      width: "fit-content",
      textAlign: "center",
    }
  },
  logoDrawer: {
    paddingLeft: "10px",
    width: "140px",
    marginBottom: "30px",
  },
  drawerContainer: {
    padding: "20px 0px ",
    background: "#fff",
    width: "240px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width:500px)": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      alignItems: "start",
    },
  },

  logoImg: {
    width: "75px",
    margin: " 14px 15px 11px 0px",
    objectFit: "contain",
    "@media (max-width: 500px)": {
      margin: " 11px 1px 3px 0px",
      width: "52px",
    },
  },
  flexButton: {
    display: "flex",
    justifyContent: "flex-between",
    alignItems: "center",
  },
  menuMobile: {
    fontSize: "16px",
    fontWeight: "800",
    fontStyle: "normal",
    lineHeight: "1.75",
    padding: "16px",
    textAlign: 'center',
    "@media (max-width: 500px)": {
      padding: "7px 0",
      width: "100%",
      textAlign: 'center',
    },
  },

  containerHeight: {
    height: "100%",
    background: "white",
    height: "54px",
  },

  createButton: {
    color: "#fff",
    backgroundImage: "linear-gradient(45deg, #240b36 30%, #c31432 90%)",
    margin: "0px 10px",
  },

  inputRoot: {
    color: "black",
    fontSize: "12px",
    width: "100%",
  },
  wallet: {
    fontSize: "14px",
    fontWeight: "400",
    fontStyle: "normal",
    lineHeight: "21px",
    color: "#fff",
    border: "1px solid #ec0066",
    padding: "0 15px",
    background: "#ec0066",
    borderRadius: "50px",
    height: "30px",
    "&:hover": {
      background: "#fff",
      color: "#ec0066",
    },
    "@media (max-width: 900px)": {
      marginLeft: "12px",
      marginTop: "12px",
    },
  },
  inputInput: {
    fontSize: "13px",
    color: "black",
    paddingLeft: "10px",

    [theme.breakpoints.up("sm")]: {
      width: "100%",
    },
  },
  submenu: {
    top: "25px !important",
  },
  menuMobile1: {
    marginLeft: "10px",
    backgroundColor: " #FCF2FA",
    borderRadius: "40px",
    textAlign: "center!important",
    "& h4": {
      fontSize: "14px",
      lineHeight: " 17px",
      color: "#D200A5",
      margin: "0 5px",
    },
    "&:hover": {
      backgroundColor: " #FCF2FA",
      borderRadius: "40px",
    },

  },
  imgbox: {
    display: "flex",
    justifyContent: "center",
  },

  searchResults: {
    position: 'fixed',
    top: '0px',
    right: '0px',
    zIndex: '1000',
    background: "white",
    height: '100vh',
    maxHeight: "100vh",
    width: "300px",
    overflowY: "scroll",
    "@media(max-width:816px)": {
      position: 'initial',
      width: "100%",
      marginTop: '10px',
      maxHeight: 'initial'
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

  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
  // start Search result
  const SearchResult = () => {
    return (
      <Box className={classes.searchResults}>
        {/* Start Title */}
        <Box style={{ height: '54px', marginBottom: "14px", color: '#fafafa', backgroundImage: 'linear-gradient(to bottom, #c04848, #480048)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4">
            Search Result
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
        position={location.pathname.includes('chat') ? "fixed" : location.pathname !== "/" ? "relative" : "absolute"}
        elevation={0}
        style={{ backgroundColor: "#eee2", border: "none" }}
      >


        <header className="header  " >
          <div className='logo1_contanier '>
            <Link to={"/"}>
            <img className="logo1" src="assets/Images/maslogo.png" alt="Logo" />
            </Link>
          </div>

          <div className='right'>
            <div className="search-container1">
              {isSearchVisible && (

                <Box className={classes.searchBox} >
                  <InputBase
                    placeholder="Search.."
                    style={{ color: "#000" }}
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
                style={{ fontSize: '20px', margin: '10px', cursor: 'pointer', color: ' #080838' }}
                onClick={toggleSearch}
              />
            </div>

            <button className="burger-icon" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>



          <nav className={` nav-links1 ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <ul className=''>
              <li><Link to="/bundles">Explore</Link></li>
              <li><Link to="/items">Marketplace</Link></li>
              <li><Link to="/creators">Creators</Link></li>
              <li><Link to="/user-list">Transfer</Link></li>



            </ul>
            {ProfileId ? (
              <Grid item >
                <Box className={flexButton}>
                  {ProfileId && (
                    <Box>
                      <Tooltip title="Chat" placement="bottom">
                        <IconButton onClick={() => navigate("/chat/t")}>
                          <Badge badgeContent={Object.keys(auth.unreadChats).length} overlap="rectangular" color="primary">
                            <BsChat style={{ color: " #080838" }} />
                          </Badge>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                  {ProfileId && (
                    <Box>

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
                              style={{ color: " #080838" }}
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
                          style={{ cursor: 'pointer', border: 'solid 3px  #080838' }} />
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
                        Create on MAS
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
                        Login
                      </Button>

                    )}
                  </Box>
                  {!isMeduimScreen &&
                    (
                      <Box className="hidden md:flex !bg-slate-700">
                        <Button
                             className="primaryButton p"
                             
                            variant="contained"
                            size="large"
                          onClick={() => navigate('/buymas')}
                         
                        
                        
                          style={{ marginRight: '10px' }}
                        >
                          buy a mas
                        </Button>
                        <Button
                          onClick={() => navigate('/connectWallet')}
                          className="primaryButton p"
                             
                            variant="contained"
                        >
                          connect wallet
                        </Button>

                      </Box>
                    )
                  }
                </Box>
              </Grid>
            )
              : (
                <div className='btn_group'>
                  <Link style={{ color: "white" }} to="/profile" className=' Create_on_MAS'> <Button className="primaryButton"
                             fullWidth
                            variant="contained"> Create on MAS</Button></Link>

                  <Link style={{ color: "white" }} to="/login">
                    <Button  
                     className="primaryButton p"
                             fullWidth
                            variant="contained"
                           
                            >LogIn</Button>

                  </Link>
                  <Link style={{ color: "white" }} to="/buymas" className="primaryButton "
                             
                            variant="contained"><Button className="primaryButton p"
                            
                           variant="contained">Buy A Mas</Button></Link>
                  <Link style={{ color: "white" }} to="/connectWallet" className='ConnectWallet'> <Button className="primaryButton p"
                             
                            variant="contained">Connect Wallet</Button></Link>


                </div>
              )}






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
              Are you sure want to logout!
            </Typography>

            <Box mt={1} display="flex">
              <Button
                variant="contained"
                size="small"
                color='white'
                mr={2}
               
                fullWidth
                onClick={() => setIsLogoutOpen(false)}
              >
                No
              </Button>
              <Button
                variant="contained"
                size="small"
                color='white'

               
                fullWidth
                onClick={() => {
                  auth.logOut();
                  navigate('/login');
                }}
              >
                Yes
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
