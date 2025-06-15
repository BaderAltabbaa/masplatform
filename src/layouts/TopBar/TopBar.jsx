/**
 * @file Header.jsx
 * @description Main application header/navigation component
 * @module Header
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - User authentication management
 * - Dynamic dropdown menus
 * - Search functionality with caching
 * - Notification system
 * - Support chat interface
 * - Language switching
 * - Scroll-to-top button
 */

// React and Framework Imports
import React, { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';


// Material-UI Components
import {
  AppBar,
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
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogContent,
  DialogContentText,
  Container,
  Input,
  InputAdornment

} from '@mui/material';
import { makeStyles } from '@mui/styles';
import NotificationsIcon from "@mui/icons-material/Notifications";

//ICONS
import { AiOutlineLogout } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { FaSearch, FaBars, FaTimes, FaUser, FaDollarSign, FaArrowUp , FaChevronDown } from "react-icons/fa";

// Application Components
import User from "src/component/User";
import NotificationCard from "src/component/NotificationCard";
import LanguageSwitcher from '../../component/LangugeSwitcher';
import NoDataFound from "src/component/NoDataFound";

// Context and Utilities
import { UserContext } from "src/context/User";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import { hideSupportIcon } from '../../utils';

//STYLES
import './TopBar.css'
import StaticPage from "../../views/pages/staticPage";


/**
 * Custom styles using makeStyles
 */
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
  input_fild2: {
        width: "100%",
        "& input": {
            height: "45px",
        },
    },
  dilogBody: {
          paddingBottom: "20px",
          position: "relative",
          zIndex: 1,
          "& small": {
              position: "absolute",
              bottom: "13px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "13px",
              width: "100%",
              textAlign: "center",
          },
      },

   mobileDialog: {
    '& .MuiDialog-paper': {
      margin: theme.spacing(2),
      width: 'calc(100% - 32px)',
      maxHeight: 'calc(100% - 64px)',
    },
  },

  dialogWrapper: {
          position: "relative",
          overflow: "hidden",
          borderRadius: "20px",
          background: " #30003c",
          padding: "5px",
          zIndex:"1"
        },

  dialogAnimatedBackground: {
          content: '""',
          background: "conic-gradient(transparent 270deg, rgb(196, 1, 218), transparent)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          aspectRatio: "1 / 1",
          width: "100%",
          animation: "$rotate 3s linear infinite",
          zIndex: 0, // Ensure the background is behind the content
        },
        dialogInnerBlurEffect: {
          content: '""',
          background: " #30003c",
          borderRadius: "inherit",
          position: "absolute",
          inset: "var(--offset)",
          height: "calc(100% - 2 * var(--offset))",
          width: "calc(100% - 2 * var(--offset))",
          backdropFilter: "blur(40px)",
          zIndex: 0, // Ensure the blur effect is behind the content
        },
        "@keyframes rotate": {
          from: {
            transform: "translate(-50%, -50%) scale(2.5) rotate(0turn)",
          },
          to: {
            transform: "translate(-50%, -50%) scale(2.5) rotate(1turn)",
          },
        },
  
         dialogContent: {
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5),
      },
    },


}));


/**
 * Main Header Component
 * @component
 */
export default function Header() {
    // State management
  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [isServiceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [isEducationDropdownOpen, setEducationDropdownOpen] = useState(false);
  const [isGameDropdownOpen, setGameDropdownOpen] = useState(false);
  const [showScroll, setShowScroll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLogOutOpen, setIsLogoutOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [userList, setUserList] = useState();
  const [notify, setNotify] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openDeposit, setOpenDeposit] = useState(false);

  // Refs
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const servicesDropdownRef = useRef(null);
  const educationDropdownRef = useRef(null);
  const gameDropdownRef = useRef(null);
  const messagesEndRef = useRef(null);
  const readNotificationCache = useRef({});
  const searchCache = useRef({});
  const socketRef = useRef(null);


  // Context and hooks
  const { t } = useTranslation();
  const auth = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles();
  const search = auth?.search;
  const setsearch = auth?.setsearch;
  
  // Media queries
  const isMeduimScreen = useMediaQuery('(max-width: 1250px)');
  const isMobileView = useMediaQuery('(max-width: 1250px)');
  const relativeBar = ['/', '/login', '/Forget', '/About_us'];

//close deposit dialog
  const handleCloseDepositModal = () => {
          setOpenDeposit(false);
        };

  
  //Support Chat
  const handleOpenSupport = () => {
    setOpenSupport(true);
    socketRef.current.emit('join_chat', { userId: 'user123' });
  }

  const handleCloseSupport = () => {
    setOpenSupport(false);
  }

  //Search Bar
  const toggleSearch = () => {
    setSearchVisible(!isSearchVisible);
  };

  //Burger Menu
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  //Profile Picture Dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  //About Dropdown
  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!isAboutDropdownOpen)
  }

  //Sevices DropDown
  const toggleServicetDropdown = () => {
    setServiceDropdownOpen(!isServiceDropdownOpen)
  }

  //Eductaion Dropdown
  const toggleEducationDropdown = () => {
    setEducationDropdownOpen(!isEducationDropdownOpen);
  };

  //Metaverse Dropdown
  const toggleGameDropdown = () => {
    setGameDropdownOpen(!isGameDropdownOpen);
  };

  //Event Listener To Close The Burger Menu When Clicking OutSide
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false); // Closes List When clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close the burger menu whenever the window is resized 
  useEffect(() => {
    const handleResize = () => {
      setMenuOpen(false); // Close the menu whenever the window is resized
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // No dependencies, runs only once on mount and cleans up on unmount

  //Support Chat Initiliaztion
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

  //Scroll to the bottom message
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  //Message Send Method
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

  // User data fetching
  useEffect(() => {
    const fetchUserAsyncInsideHook = async () => {
      if (auth.isLogin && !auth.userData) {
        await auth.updateUserData();
      }
    }
    fetchUserAsyncInsideHook();
  }, []);


  // Notification data handling
  useEffect(() => {
    setNotify(auth?.notifyData);
  }, [auth?.notifyData]);


    /**
   * Marks all notifications as read with caching
   */
  const readNotificationhandler = async () => {
    const cacheKey = "readNotifications";
    const sessionKey = "readNotifications";

    // Check cache
    if (readNotificationCache.current[cacheKey]) {
      console.log("Using in-memory cache for read notifications.");
      return; // Already marked as read
    }

    // Check sessionStorage
    const sessionData = sessionStorage.getItem(sessionKey);
    if (sessionData === "done") {
      console.log("Using sessionStorage cache for read notifications.");
      return;
    }

    try {
      const res = await axios.get(Apiconfigs.markAllNotificationsRead, {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      });

      if (res.data?.result?.ok === 1) {
        auth.setUnReadNotification(0);

        // Cache it in memory and sessionStorage
        readNotificationCache.current[cacheKey] = true;
        sessionStorage.setItem(sessionKey, "done");

        console.log("Marked all notifications as read and cached the result.");
      } else {
        console.log("Unexpected response", res.data);
      }
    } catch (error) {
      console.log("Error marking notifications as read:", error.message);
    }
  };


    /**
   * Handles search functionality with caching
   */
  const getSearchResult = async (cancelTokenSource) => {
    const cacheKey = `search-${search}-page-${page}`;
    const sessionKey = `search-${search}-page-${page}`;

    // 1. Try in-memory cache
    if (searchCache.current[cacheKey]) {
      console.log("Using in-memory cache for", cacheKey);
      setUserList(searchCache.current[cacheKey]);
      return;
    }

    // 2. Try sessionStorage
    const sessionData = sessionStorage.getItem(sessionKey);
    if (sessionData) {
      console.log("Using sessionStorage cache for", cacheKey);
      setUserList(JSON.parse(sessionData));
      return;
    }

    // 3. Fetch from API
    setIsLoading(true);


    // API call if no cache
    try {
      const res = await axios({
        method: "GET",
        url: Apiconfigs.latestUserList,
        params: {
          limit: 10,
          page: page,
          search: search,
          userType: "Creator",
        },
        headers: {
          token: sessionStorage.getItem("token"),
        },
        cancelToken: cancelTokenSource?.token,
      });

      setIsLoading(false);

      if (res.data.statusCode === 200 && res.data.result.docs) {
        const data = res.data.result.docs;

        // Cache results
        searchCache.current[cacheKey] = data;
        sessionStorage.setItem(sessionKey, JSON.stringify(data));

        console.log("Fetched and cached data for", cacheKey);
        setIsLoading1(true);
        setUserList(data);
      }
    } catch (err) {
      setIsLoading(false);
      console.log("API error:", err.message);
    }
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



  //Mobile View Responsiveness
  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1084
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  //Cancel Search Token
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

  window.addEventListener("click", function (event) {
    setsearch("");
  });

  //user Profile form user context
  const ProfileId = auth?.userData?._id;


  // Sub-components

  const ProfileDropdown = ({ onClose, unreadChats, unReadNotification }) => {

    return (
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: '50%', // Center it horizontally
          transform: 'translateX(-50%)', // Adjust for exact centering
          backgroundColor: 'rgba(55, 0, 53, 0.70)',
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}
              startIcon={
                <Badge>
                  <FaUser />
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}
            >
              {t("Notifications")}
            </Button>
          </Box>
          {/*<Box>
            <Button
              onClick={() => {
                navigate("/buymas");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}
              startIcon={
                <Badge>
                  <FaDollarSign />
                </Badge>
              }
            >
              {t("Buy A Mas")}
            </Button>
          </Box>*/}
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
          backgroundColor: isMobile ? 'none' : 'rgba(55, 0, 53, 0.70)',
          borderRadius: isMobile ? '0' : '0 0 5px 5px', // Sharp edges in mobile
          padding: '10px',
          zIndex: 1000,
          width: isMobile ? '100%' : 'auto', // Full width in mobile
          whiteSpace: "nowrap",
          textAlign: "center"
        }}
      >
        <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
           <Box>
            <Button
              onClick={() => {
                navigate("/corporate/company");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Company")}
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigate("/FAQ");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
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
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
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

  const GamesDropDown = ({ onClose, isMobile }) => {
    return (
      <Box
        sx={{
          position: isMobile ? 'relative' : 'absolute', // Only relative in mobile
          top: isMobile ? 'unset' : '100%', // Reset top in mobile
          left: isMobile ? 'unset' : '50%', // Reset left in mobile
          transform: isMobile ? 'none' : 'translateX(-50%)', // Only center in desktop
          backgroundColor: isMobile ? 'none' : 'rgba(55, 0, 53, 0.70)',
          borderRadius: isMobile ? '0' : '0 0 5px 5px', // Sharp edges in mobile
          padding: '10px',
          zIndex: 1000,
          width: isMobile ? '100%' : 'auto', // Full width in mobile
          whiteSpace: "nowrap",
          textAlign: "center"
        }}
      >
        <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box>
            <Button
              onClick={() => {
                navigate("/corporate/metaverse");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("MetaVerse")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/corporate/metaverse");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Games")}
            </Button>
          </Box>



        </Box>
      </Box>
    )
  }

  const EducationDropDown = ({ onClose, isMobile }) => {
    return (
      <Box
        sx={{
          position: isMobile ? 'relative' : 'absolute', // Only relative in mobile
          top: isMobile ? 'unset' : '100%', // Reset top in mobile
          left: isMobile ? 'unset' : '50%', // Reset left in mobile
          transform: isMobile ? 'none' : 'translateX(-50%)', // Only center in desktop
          backgroundColor: isMobile ? 'none' : 'rgba(55, 0, 53, 0.70)',
          borderRadius: isMobile ? '0' : '0 0 5px 5px', // Sharp edges in mobile
          padding: '10px',
          zIndex: 1000,
          width: isMobile ? '100%' : 'auto', // Full width in mobile
          whiteSpace: "nowrap",
          textAlign: "center"
        }}
      >
        <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box>
            <Button
              onClick={() => {
                navigate("/education");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Education")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/plans");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Plans")}
            </Button>
          </Box>
        </Box>
      </Box>
    )
  }


  const ServicesDropDown = ({ onClose, isMobile }) => {
    return (
      <Box
        sx={{
          position: isMobile ? 'relative' : 'absolute', // Only relative in mobile
          top: isMobile ? 'unset' : '100%', // Reset top in mobile
          left: isMobile ? 'unset' : '50%', // Reset left in mobile
          transform: isMobile ? 'none' : 'translateX(-50%)', // Only center in desktop
          backgroundColor: isMobile ? 'none' : 'rgba(55, 0, 53, 0.70)',
          borderRadius: isMobile ? '0' : '0 0 5px 5px', // Sharp edges in mobile
          padding: '10px',
          zIndex: 1000,
          width: isMobile ? '100%' : 'auto', // Full width in mobile
          whiteSpace: "nowrap",
          textAlign: "center"
        }}
      >
        <Box dir="ltr" sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Box>
            <Button
              onClick={() => {
                navigate("/creators");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Creators")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/bundles");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Bundles")}
            </Button>
          </Box>
          <Box>
            <Button
              onClick={() => {
                navigate("/items");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Marketplace")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/user-list");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Transfer")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/Fundraise");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("Fundraise")}
            </Button>
          </Box>

          <Box>
            <Button
              onClick={() => {
                navigate("/RWA");
                onClose();
              }}
              sx={{
                color: "#dadada",
                "&:hover": {
                  background: "none",
                  color: (theme) => theme.custom.miniUserCard
                }
              }}

            >

              {t("RWA")}
            </Button>
          </Box>


        </Box>
      </Box>
    )
  }

  //Close the list when the mouse hovers out the list
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

  //Close the list when the mouse hovers out the list
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

  //Close the list when the mouse hovers out the list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesDropdownRef.current && !servicesDropdownRef.current.contains(event.target)) {
        setServiceDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Close the list when the mouse hovers out the list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (educationDropdownRef.current && !educationDropdownRef.current.contains(event.target)) {
        setEducationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //Close the list when the mouse hovers out the list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (gameDropdownRef.current && !gameDropdownRef.current.contains(event.target)) {
        setGameDropdownOpen(false);
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


  //hide the support icon in /chat
  const hideicon = hideSupportIcon(location.pathname)

  //show the scroll up icon after scrolling down
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


  //scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  //main return
  return (
    <>
      <AppBar
        position={"fixed"}
        elevation={0}
        sx={{ border: "none", background: "none" }}
      >


        <header style={{ display: "flex", backgroundColor: "rgba(55, 0, 53, 0.70)", padding: "0 10px" }}>
          
          {/* ///////////////////////////////Logo section//////////////////// */}

          <div className='logo1_contanier '>
            <Link to={"/"}>
              <img className="logo1" src="\assets\Images\masfooter-logo1.svg" alt="Logo11" />
            </Link>
          </div>
            
           {/* Right section with search and menu toggle */}
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
                style={{ fontSize: '20px', margin: '10px', cursor: 'pointer', color: '#dadada' }}
                onClick={toggleSearch}
              />
              <LanguageSwitcher />
            </div>

            <button className="burger-icon" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>


                     {/* Main navigation */}
          <nav className={` nav-links1 ${isMenuOpen ? 'active' : ''}`} ref={menuRef}>
            <ul style={{ display: "flex", alignItems: "center", marginBottom: "10px", padding: "0" }}>
              <li><Link to="/">{t("Home")}</Link></li>


              <li
                ref={servicesDropdownRef}
                onMouseEnter={!isMobileView ? () => setServiceDropdownOpen(true) : undefined}
                onMouseLeave={!isMobileView ? () => setServiceDropdownOpen(false) : undefined}
                onClick={isMobileView ? toggleServicetDropdown : undefined}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: isMobileView ? 'column' : 'row',
                  // Add these to prevent layout shift:
                  alignItems: 'center',
                  width: isMobileView ? '100%' : 'auto'
                }}
              >
                <Link>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <span>{t("Services")}</span>
                    <FaChevronDown style={{
                      transform: isServiceDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginLeft: '3px'
                    }} />
                  </Box>
                </Link>
                <AnimatePresence>
                  {isServiceDropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        scale: 0.98,
                        filter: 'blur(2px)'
                      } : false} // No animation on mobile
                      animate={!isMobileView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)'
                      } : false}
                      exit={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        transition: { duration: 0.2 }
                      } : false}
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      style={{
                        position: isMobileView ? 'static' : 'absolute',
                        top: 'calc(100% + 65%)',
                        left: 0,
                        width: "100%",
                        borderRadius: '8px',
                        zIndex: 1000,
                        transformOrigin: 'top center',
                        // Mobile-specific styles
                        ...(isMobileView && {
                          marginTop: '8px',
                          boxShadow: 'none',
                          animation: 'none'
                        })
                      }}
                    >
                      <ServicesDropDown
                        onClose={() => setServiceDropdownOpen(false)}
                        isMobile={isMobileView}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </li>



              <li
                ref={educationDropdownRef}
                onMouseEnter={!isMobileView ? () => setEducationDropdownOpen(true) : undefined}
                onMouseLeave={!isMobileView ? () => setEducationDropdownOpen(false) : undefined}
                onClick={isMobileView ? toggleEducationDropdown : undefined}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: isMobileView ? 'column' : 'row',
                  // Add these to prevent layout shift:
                  alignItems: 'center',
                  width: isMobileView ? '100%' : 'auto'
                }}>

                <Link>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <span>{t("Education")}</span>
                    <FaChevronDown style={{
                      transform: isEducationDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginLeft: '3px'
                    }} />
                  </Box>    </Link>
                <AnimatePresence>
                  {isEducationDropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        scale: 0.98,
                        filter: 'blur(2px)'
                      } : false} // No animation on mobile
                      animate={!isMobileView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)'
                      } : false}
                      exit={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        transition: { duration: 0.2 }
                      } : false}
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      style={{
                        position: isMobileView ? 'static' : 'absolute',
                        top: 'calc(100% + 65%)',
                        left: 0,
                        width: "100%",
                        borderRadius: '8px',
                        zIndex: 1000,
                        transformOrigin: 'top center',
                        // Mobile-specific styles
                        ...(isMobileView && {
                          marginTop: '8px',
                          boxShadow: 'none',
                          animation: 'none'
                        })
                      }}
                    >
                      <EducationDropDown
                        onClose={() => setEducationDropdownOpen(false)}
                        isMobile={isMobileView} // Pass mobile state
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>



              <li
                ref={gameDropdownRef}
                onMouseEnter={!isMobileView ? () => setGameDropdownOpen(true) : undefined}
                onMouseLeave={!isMobileView ? () => setGameDropdownOpen(false) : undefined}
                onClick={isMobileView ? toggleGameDropdown : undefined}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: isMobileView ? 'column' : 'row',
                  // Add these to prevent layout shift:
                  alignItems: 'center',
                  width: isMobileView ? '100%' : 'auto'
                }}>
                <Link>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <span>{t("Metaverse")}</span>
                    <FaChevronDown style={{
                      transform: isGameDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginLeft: '3px'
                    }} />      </Box>
                </Link>

                <AnimatePresence>
                  {isGameDropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        scale: 0.98,
                        filter: 'blur(2px)'
                      } : false} // No animation on mobile
                      animate={!isMobileView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)'
                      } : false}
                      exit={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        transition: { duration: 0.2 }
                      } : false}
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      style={{
                        position: isMobileView ? 'static' : 'absolute',
                        top: 'calc(100% + 65%)',
                        left: 0,
                        width: "100%",
                        borderRadius: '8px',
                        zIndex: 1000,
                        transformOrigin: 'top center',
                        // Mobile-specific styles
                        ...(isMobileView && {
                          marginTop: '8px',
                          boxShadow: 'none',
                          animation: 'none'
                        })
                      }}
                    >
                      <GamesDropDown
                        onClose={() => setGameDropdownOpen(false)}
                        isMobile={isMobileView} // Pass mobile state
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>





              <li
                ref={aboutDropdownRef}
                onMouseEnter={!isMobileView ? () => setAboutDropdownOpen(true) : undefined}
                onMouseLeave={!isMobileView ? () => setAboutDropdownOpen(false) : undefined}
                onClick={isMobileView ? toggleAboutDropdown : undefined}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: isMobileView ? 'column' : 'row',
                  // Add these to prevent layout shift:
                  alignItems: 'center',
                  width: isMobileView ? '100%' : 'auto'
                }}
              >

                <Link>
                  <Box sx={{
                    display: "flex",
                    alignItems: "center",

                  }}>
                    <span
                    >{t("About us")}</span>
                    <FaChevronDown style={{
                      transform: isAboutDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s ease',
                      marginLeft: '3px'
                    }} />  </Box></Link>
                <AnimatePresence>
                  {isAboutDropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        scale: 0.98,
                        filter: 'blur(2px)'
                      } : false} // No animation on mobile
                      animate={!isMobileView ? {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: 'blur(0px)'
                      } : false}
                      exit={!isMobileView ? {
                        opacity: 0,
                        y: -25,
                        transition: { duration: 0.2 }
                      } : false}
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      style={{
                        position: isMobileView ? 'static' : 'absolute',
                        top: 'calc(100% + 65%)',
                        left: 0,
                        width: "100%",
                        borderRadius: '8px',
                        zIndex: 1000,
                        transformOrigin: 'top center',
                        // Mobile-specific styles
                        ...(isMobileView && {
                          marginTop: '8px',
                          boxShadow: 'none',
                          animation: 'none'
                        })
                      }}
                    >
                      <AboutUsDropDown
                        onClose={() => setAboutDropdownOpen(false)}
                        isMobile={isMobileView} // Pass mobile state
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li ><Link to="/buymas">{t("Buy Mas")}</Link></li>
              <li >
              <Box 
              onClick={auth.userLoggedIn ? () => setOpenDeposit(true) : () => {navigate("/create-account")}}
              ><Link>{t("Deposit")}</Link></Box></li>

              <li className='test'><Link to="/connectWallet">{t("Connect Wallet")}</Link></li>

              {auth.userLoggedIn ? <></> :

                <li className='test'><Link to="/create-account">{t("Register")}</Link></li>}

              {
                auth.userLoggedIn ? <></> :

                  <li className='test'><Link to="/login">{t("Login")}</Link></li>}


            </ul>

            <div style={{ display: "flex", alignItems: "center" }}>
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
                  style={{ fontSize: '20px', margin: '10px', cursor: 'pointer', color: '#dadada' }}
                  onClick={toggleSearch}
                />
                <LanguageSwitcher />
              </div>



              {auth.userLoggedIn ?
                <Box sx={{
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
                      style={{ cursor: 'pointer', border: 'solid 3px #dadada' }}
                    />
                  </IconButton>
                  {isDropdownOpen && (
                    <Box sx={{
                      position: 'absolute',
                      top: 'calc(100%)',
                      left: 0,
                      width: "100%",
                      zIndex: 1000,
                      transformOrigin: 'top center',
                    }}>
                      <ProfileDropdown
                        onClose={() => setDropdownOpen(false)}
                        unreadChats={Object.keys(auth.unreadChats).length}
                        unReadNotification={auth.unReadNotification}
                      />
                    </Box>
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
                              <BsChat style={{ color: " #dadada" }} />
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
                                style={{ color: " #dadada" }}
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
                            style={{ cursor: 'pointer', border: 'solid 3px  #dadada' }}
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
                            <AiOutlineLogout color='#dadada' />
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
                          {t("Login")}
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
                          {t("Connect Wallet")}
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

                      >{t("Login")}</Button>

                    </Link>
                  
                    <Link style={{ color: "white" }} to="/connectWallet" className='ConnectWallet'> <Button className="primaryButton"

                      variant="contained">{t("Connect Wallet")}</Button></Link>


                  </div>
                )}
            </div>
          </nav>
        </header>

      </AppBar>
      <Box sx={{ width: "100%", minHeight: "3.5rem", background: (theme) => theme.custom.PageBackGround }}
        display={relativeBar.includes(location.pathname) ? "none" : "block"}
      >
      </Box>

      <Zoom in={window.scrollY > 100}>
        <IconButton
          onClick={scrollToTop}
          sx={{
            position: 'fixed',
            bottom: 24,
            left: 24,
            zIndex: 1000,
            backgroundColor: 'rgb(206, 204, 204)',
            color: (theme) => theme.custom.mainButton,
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
            background: " #cdc8c8",
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
          margin: "80px 0px"
          ,
          "& .MuiDialog-container": {
            alignItems: "flex-end",
            justifyContent: "flex-end",
          },
          "& .MuiDialog-paper": {
            margin: "0px",
            height: "60vh",
            maxHeight: "500px",
            maxWidth: "350px",
            display: "flex",
            flexDirection: "column"
          }
        }}
        PaperProps={{
          sx: {
            backgroundImage: 'url(/assets/Images/doodle2.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }
        }}
        BackdropProps={{
          style: { backgroundColor: "transparent" }
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
                    padding: "5px 10px",
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
                        fontSize: "10px"
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
            backgroundImage: 'url(/assets/Images/doodle2.webp)',
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
        disableScrollLock
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
                  setIsLogoutOpen(false);
                }}
              >
                {t("Yes")}
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
            open={openDeposit}
            disableScrollLock
            fullWidth
            maxWidth="sm"
            onClose={handleCloseDepositModal}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        className={classes.mobileDialog}
            PaperProps={{
              sx: {
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "transparent", // Remove default background
                maxHeight: '90vh', // Ensure it doesn't exceed screen height
      
              },
            }}
          >
            <div className={classes.dialogWrapper}>
              <div className={classes.dialogAnimatedBackground}></div>
              <div className={classes.dialogInnerBlurEffect}></div>
              <DialogContent className={classes.dilogBody}>
                <DialogContentText id="alert-dialog-description">
                  <Typography
                    variant="h3"
                    align="center"
                    sx={{ color: "white", marginBottom: "20px" }}
                  >
                    {t("Deposit")}
                  </Typography>
                  <Typography
                    variant="h5"
                    align="center"
                    style={{ color: "white", marginBottom: "10px" }}
                  >
                    {t("Please make sure you use BSC (BNB Smart Chain) and send only supported tokens (MAS, USDT, BUSD)")}
                  </Typography>
                  <Container maxWidth="md">
                    <Box mt={4}>
                      <Input
                        value={auth.userData?.ethAccount?.address}
                        placeholder="Wallet Address"
                        className={classes.input_fild2}
                        sx={{
                          color: "white", // Change the text color here
                          "& .MuiInput-input": {
                            color: "white", // Ensure the input text color is white
                          },
                        }}
                        startAdornment={
                          <InputAdornment position="end">
                            <CopyToClipboard text={auth.userData?.ethAccount?.address}>
                              <Button onClick={() => toast.info("Copied")} sx={{ color: "white" }}>
                                {t("Copy")}
                              </Button>
                            </CopyToClipboard>
                          </InputAdornment>
                        }
                      />
                    </Box>
                    <Box mt={2} mb={4}>
                      <Button
                        variant="contained"
                        size="large"
                        color="secondary"
                        onClick={handleCloseDepositModal}
                        style={{ fontSize: "15px", background: "#8c0087", color: "white" }}
                      >
                        {t("Close")}
                      </Button>
                    </Box>
                  </Container>
                </DialogContentText>
              </DialogContent>
            </div>
          </Dialog>
    </>
  );
}
