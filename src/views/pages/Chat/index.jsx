import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';

const PusherChatNoBackend = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [username] = useState(prompt("Enter your name") || `User${Math.floor(Math.random() * 1000)}`);

    const [otherUser, setOtherUser] = useState('');
    const [channel, setChannel] = useState(null);

    useEffect(() => {
        const pusher = new Pusher('YOUR_APP_KEY', {  // Replace with your key
          cluster: 'YOUR_CLUSTER',                  // Replace with your cluster
          encrypted: true
        });
      
        // Both users will join the same public channel
        const channelName = 'public-chat-channel';
        const pusherChannel = pusher.subscribe(channelName);
        setChannel(pusherChannel);
      
        // Listen for new messages
        pusherChannel.bind('client-message', (data) => {
          if (data.sender !== username) {  // Don't show our own messages
            setMessages(prev => [...prev, data]);
          }
        });
      
        // Listen for user connections
        pusherChannel.bind('client-user-connected', (data) => {
          if (data.username !== username) {
            setOtherUser(data.username);
            alert(`${data.username} has joined the chat!`);
          }
        });
      
        // Notify others when we connect
        if (pusherChannel) {
          pusherChannel.trigger('client-user-connected', {
            username: username
          });
        }
      
        return () => {
          pusher.unsubscribe(channelName);
          pusher.disconnect();
        };
      }, [username]);  // ← This was missing - now properly added


      const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim() || !channel) return;
    
        // Add message to our own screen immediately
        setMessages(prev => [...prev, {
          sender: username,
          message: message,
          timestamp: new Date().toISOString()
        }]);
    
        // Send to other user via Pusher
        channel.trigger('client-message', {
          sender: username,
          message: message,
          timestamp: new Date().toISOString()
        });
    
        setMessage('');
      };

      return (
        <div style={{
          maxWidth: '500px',
          margin: '20px auto',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px'
        }}>
          <h2>Simple Chat ({username})</h2>
          {otherUser && <p>Connected with: {otherUser}</p>}
          
          <div style={{
            height: '300px',
            border: '1px solid #eee',
            overflowY: 'scroll',
            marginBottom: '10px',
            padding: '10px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: '10px',
                textAlign: msg.sender === username ? 'right' : 'left'
              }}>
                <div style={{
                  display: 'inline-block',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: msg.sender === username ? '#dcf8c6' : '#f1f0f0'
                }}>
                  <strong>{msg.sender}: </strong>
                  {msg.message}
                </div>
                <div style={{
                  fontSize: '0.7em',
                  color: '#666',
                  textAlign: msg.sender === username ? 'right' : 'left'
                }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          
          <form onSubmit={sendMessage} style={{ display: 'flex' }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              style={{ flex: 1, padding: '8px' }}
            />
            <button 
              type="submit"
              style={{ 
                padding: '8px 15px',
                marginLeft: '10px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px'
              }}
            >
              Send
            </button>
          </form>
        </div>
      );
    };
    export default PusherChatNoBackend;
    

    







{/*import React, { useEffect, useState, useCallback, useContext, useRef } from "react";
import {
    Box,
    Card,
    Badge,
    Typography,
    Tooltip,
    IconButton,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Button,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
    Container
} from '@mui/material';  
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from '@mui/styles';  
import TopBar from '../../../layouts/TopBar/TopBar'

import InsertPhotoRoundedIcon from '@mui/icons-material/InsertPhotoRounded';  
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined'; 
import SendIcon from '@mui/icons-material/Send';  

import ImageUploading from "react-images-uploading";  
import { RemoveScrollBar } from 'react-remove-scroll-bar';  

import InputEmoji from "react-input-emoji";  
import axios from "axios";  
import Apiconfigs, { baseURL } from "src/Apiconfig/Apiconfigs.js"; 
import { useNavigate, useParams } from 'react-router-dom';  
import { UserContext } from "src/context/User"; 
import DataLoading from "src/component/DataLoading";  
import io from 'socket.io-client';  
import { toast } from "react-toastify";  
import { Virtuoso } from 'react-virtuoso'; 
import { isMobile } from 'react-device-detect';  
import './chat.css'
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import zIndex from "@mui/material/styles/zIndex";
const drawerWidth = 300;


const useStyles = makeStyles((theme) => ({
    container: {
        background: "rgba(144, 0, 173, 0.3)",
        position: 'fixed',
        top: '60px',
        paddingTop: '10px',
        right: '0px',
        bottom: '60px',
        display: "flex",
        justifyContent: 'flex-end',
        width: '100%',
        height:"100%",
        "@media(max-width:400px)": {
            width: '100%',
        right: '0',

          },
        // maxWidth: '100vw',
        // height: 'calc(100vh - 55px)',

    },
    drawer: {
        
        flexShrink: 0,
        '& .MuiList-padding': {
            padding: '0px',
            paddingTop: '10px',
            
            
        },
        '& .MuiListItemText-secondary': {
            fontSize: "12px"
        }
    },
    drawerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        height: "100vh", 
      },
      drawerPaper: {
        width: "300px", 
        position: "absolute", 
        boxShadow: theme.shadows[3],
        background: "rgba(17, 25, 40, 0.75) !important",
       
        zIndex : "10",
      },
      menuButton: {
        // position: "fixed",
        // top: '0',
        height : "20px",
        left: theme.spacing(4),
        zIndex: 1300, // أعلى من الـ Drawer
      },
    
    // drawerPaper: {
    //     top: '60px',
    //     width: drawerWidth,
    //     background: '#fcfcfc'
    // },
    avatar: {
        marginLeft: "5px",
        backgroundColor: '#fff',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        // alignItems: 'stretch',
        width: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
        maxWidth: isMobile ? '100vw' : `calc(100vw - ${drawerWidth}px )`,
        "@media(max-width:768px)": {
            paddingLeft : '80px',

          },
    },
    msg: {
        alignSelf: 'end',
        width: '100%',
        '& .react-input-emoji--container': {
            order: 2,
            // margin: "0px 10px"
        },
        '& .react-emoji-picker--wrapper': {
            width: '100%',
        },
    },
}));

const socket = io(baseURL, {
    auth: {
        token: sessionStorage.getItem("token")
        
    },
});


const ChatBox = function ({chat, socket, visible, isOnline}) {
    const START_INDEX = 10000;
    const INITIAL_ITEM_COUNT = 50;
    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX)

    const classes = useStyles();
    const user = useContext(UserContext);
    const virtuosoRef = useRef(null)
    const [isScrolling, setIsScrolling] = useState(false);
    const [theStart, setTheStart] = useState(false);

    const [messages, setMessages] = useState([]);
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [msg, setMsg] = useState("");
    let contact = chat.users.find(c => c._id != user.userData._id);
    let photo = contact?.profilePic ? contact?.profilePic :
        `https://avatars.dicebear.com/api/miniavs/${contact?.userName}.svg`;

    const onImagesChange = (imageList) => {
        setImages(imageList);
    };

    const uploadImages = async (onImageRemoveAll) => {
        if (images.length > 0) {
            try {
                setUploading(true);
                let upload_images = [...images];
                console.log(upload_images);
                for (const image in upload_images) {
                    const formData = new FormData();
                    console.log(upload_images[image].file);
                    formData.append("file", upload_images[image].file);
                    const res = await axios({
                      method: "POST",
                      url: Apiconfigs.chatUploadImage,
                      data: formData,
                      headers: {
                        token: sessionStorage.getItem("token"),
                      },
                    });

                    if (res.data.statusCode === 200) {
                      let data = {
                        chat_id: chat._id,
                        message: res.data.result,
                        mediaType: 'image'
                      };
                      socket.emit("sendMsg", data);
                    } else {
                      toast.error("Error upload image " + (image + 1));
                    }
                }
                setUploading(false);
                onImageRemoveAll();
            } catch (err) {
                console.log(err);
                setUploading(false);
            }
        } else {
            setUploading(false);
        }
    };

    const sendMsg = () => {
        if (msg.length > 0) {
            let data = {
                chat_id: chat._id,
                message: msg,
            };
            socket.emit("sendMsg", data);
        }
    };

    const unreadMsgs = useCallback(() => {
        return messages.filter(m => (m.status == 'Unread' && m.sender == contact._id));
    }, [messages]);

    const readChatMsgs = async (chatId, MsgsIds) => axios.post(Apiconfigs.readChat,
        {
            chat: chatId,
            ids: MsgsIds
        },
        {
            headers: {
                token: sessionStorage.getItem("token"),
            }
        }).then(res => {
        console.log(res.data);
    }).catch(err => {
        toast.error(err);
    });

    useEffect(() => {

        let unreaded = unreadMsgs();

        if (visible) {
            !isScrolling && virtuosoRef.current.scrollToIndex({index: messages.length - 1, behavior: 'smooth'});
            let chats = user.unreadChats;
            delete chats[chat._id];
            user.setUnReadChats(chats);

            if (unreaded.length > 0) {
                let unreadIds = unreaded.map(ur => ur._id);
                let ids = String(unreadIds);
                readChatMsgs(chat._id, ids);
                let read = messages.map(r => {
                    if (unreadIds.includes(r._id)) {
                        r.status = 'Read';
                    }
                    return r;
                });
                setMessages(read);
            }
        } else {
            if (unreaded.length > 0) {
                user.setUnReadChats(chats => ({...chats, [chat._id]: unreaded}));
            }
        }

    }, [visible, messages]);


    const loadChat = async () => axios.get(Apiconfigs.viewChat + chat._id, {
        headers: {
            token: sessionStorage.getItem("token"),
        },
        params: {
            page: messages.length,
            limit: 50
        },
    }).then(res => {
        if (res.data.result.length > 0) {
            let result = res.data.result.reverse();
            setMessages((msgs) => [...result, ...msgs,]);
            setFirstItemIndex(firstItemIndex => firstItemIndex - result.length);
        } else {
            setTheStart(true);
        }
    });

    useEffect(() => {
        loadChat();
        socket.on(chat._id, (data) => {
            setMessages((msgs) => [...msgs, data]);
        });

        return () => {
            socket.off(chat._id);
        };

    }, []);

    return (
        <>
       
            <Box
        // className=''
            className={classes.main}
            style={{
                display: visible ? 'flex' : 'none',
                
                // paddingBottom: isMobile ? '10px' : '10px',
                height: '100%',
                marginTop: '80px',
            }}>

            {/* Start User`s avatar *}
            <Box display='flex' alignItems='center'>
                <Avatar alt={contact?.userName} src={photo} className={classes.avatar}/>
                <Box m={1}>
                    <Typography component="h5" variant="h5">{contact?.userName}</Typography>
                    <Typography component="p" variant="body2">
                        {isOnline ? 'Online' : 'Active recently'}
                    </Typography>
                </Box>
            </Box>
            {/* End User`s avatar *}


            {/* Start Masseges Box  *}
            <Virtuoso
                style={{}}
                ref={virtuosoRef}
                isScrolling={setIsScrolling}
                firstItemIndex={firstItemIndex}
                initialTopMostItemIndex={INITIAL_ITEM_COUNT - 1}
                data={messages}
                startReached={loadChat}
                // Start chat Start
                components={{
                    Header: () => {
                        return theStart ?
                            <Box width='100%' align='center'>
                                <Typography component="h5" variant="h5">Chat started</Typography>
                                <Typography component="p" variant="body2">
                                    {messages[0] && new Date(messages[0]?.createdAt).toLocaleDateString('en-us', {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "short",
                                        day: "numeric"
                                    })}
                                </Typography>
                            </Box> :
                            <DataLoading/>

                    },
                }}
                // End chat Start

                // Start msg
                itemContent={(index, msg) => {
                    let alignT = (msg.sender == user.userData._id) ? 'right' : ' left';
                    let justf = (msg.sender == user.userData._id) ? 'flex-end' : ' flex-start';
                    let cardV = (msg.sender == user.userData._id) ? 'outlined' : ' elevation';
                    return (
                        <Box key={index} display="flex" justifyContent={justf} padding={1}>
                            <Card variant={cardV} style={{padding: '10px', maxWidth: '80%'}}>
                                {msg.mediaType == 'image' ?
                                    <img src={msg.text} alt="" style={{maxWidth: '300px'}}/> :
                                    <Typography
                                        align={alignT}
                                        variant="h6"
                                        style={{display: "block", fontSize: "14px"}}
                                    >
                                        {msg.text}
                                    </Typography>
                                }

                            </Card>
                        </Box>
                    )
                }}
                // End msg
            />
            {/* End Masseges Box  *}


            <Box display={images.length > 0 ? 'block' : 'flex'} className={classes.msg}>
                {/* Start Enter Image *}
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onImagesChange}
                    maxNumber={5}
                    dataURLKey="data_url"
                    acceptType={["jpg", 'jpeg', 'png', 'gif']}
                >
                    {({
                          imageList,
                          onImageUpload,
                          onImageRemoveAll,
                          onImageRemove,
                          isDragging,
                          dragProps
                      }) => {
                        return (
                            <>
                                <Tooltip title="Send media" placement="top">
                                    <IconButton style={isDragging ? {color: "red"} :{color: "white"}}
                                                onClick={onImageUpload}
                                                {...dragProps}>
                                        <InsertPhotoRoundedIcon/>
                                    </IconButton>
                                </Tooltip>
                                {imageList.length > 1 && <Button onClick={onImageRemoveAll}>Remove all images</Button>}
                                {imageList.length > 0 &&
                                    <ImageList rowHeight={120} className={classes.imageList} cols={6}>
                                        {imageList.map((image, index) => (
                                            <ImageListItem key={index} cols={1}
                                                           style={{backgroundColor: '#ffffff55', textAlign: 'center'}}>
                                                <img src={image.data_url} alt=""
                                                     style={{height: '100%', width: 'auto', margin: 'auto'}}/>
                                                <ImageListItemBar
                                                    title={(index + 1) + ': ' + image.file.name}
                                                    subtitle={<span>{image.file.size} bytes</span>}
                                                    actionIcon={
                                                        <IconButton
                                                            onClick={() => onImageRemove(index)}
                                                            disabled={uploading}
                                                            aria-label={`remove from selection`}>
                                                            {uploading ? <DataLoading/> :
                                                                <HighlightOffOutlinedIcon color="error"/>
                                                            }
                                                        </IconButton>
                                                    }
                                                />
                                            </ImageListItem>

                                        ))}
                                        <ImageListItem key={'send'} cols={1}>
                                            <Box display='flex' height='100%' justifyContent='center'
                                                 alignItems='center' alignContent='center'>
                                                {uploading && <DataLoading/>}
                                                <IconButton
                                                    disabled={uploading}
                                                    onClick={() => uploadImages(onImageRemoveAll)}
                                                    aria-label={`send`}>
                                                    <SendIcon/>
                                                </IconButton>
                                            </Box>

                                        </ImageListItem>
                                    </ImageList>
                                }
                            </>
                        )
                    }}
                </ImageUploading>
                {/*End Enter Image */}

                {/* Start input And Emoji *}
                <InputEmoji
                    value={msg}
                    onChange={setMsg}
                    cleanOnEnter
                    onEnter={sendMsg}
                    placeholder="Type a message"
                    className={classes.msgInput}
                />
                {/*End input And Emoji *}

            </Box>
        </Box>
        </>
        // Start Chat Content
    
        // End Chat Content

    )
}

export default function Chat() {
const Mobile = useMediaQuery(useTheme().breakpoints.down("sm"));

    const {chatId} = useParams();
    const navigate = useNavigate();
    const classes = useStyles();
    const user = useContext(UserContext);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [chatList, setChatList] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };

    const getChatList = async () => axios.get(Apiconfigs.chatList, {
        headers: {
            token: sessionStorage.getItem("token"),
        },
        params: {
            page: 1,
            limit: 20
        },
    }).then(res => {
        setChatList(res.data.result);
    });


    useEffect(async () => {
        socket.emit("ping");
        getChatList();

        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('notify', (msg) => {
            if (msg.onlineusers && Array.isArray(msg.onlineusers)) {
                setOnlineUsers(msg.onlineusers)
            }
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('notify');
        };
    }, []);

    return (
   <Box className='chat' >
        <Container maxWidth='xl'>
       
       <Box 
        className={classes.container}
        >
            <RemoveScrollBar/>
            {/* Start left Section *}
            
    {Mobile  && (
        <IconButton
        className={classes.menuButton}
        color="primary"
        onClick={toggleDrawer(!drawerOpen)}
      >
        <MenuIcon />
      </IconButton>
    )}
      
            <Drawer
                // className={classes.drawer}
                variant={isMobile ? "persistent" : "permanent"}
                classes={{
                    paper: classes.drawerPaper,
                  }}
                  sx={{
                    '& .MuiDrawer-root': {
                        position: 'absolute'
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute'
                    },
                 
                    
                  }}
                
                // classes={{
                //     paper: classes.drawerPaper,
                // }}
                anchor="left"
                // open={chatId == 't'}
                open={isMobile ? drawerOpen : chatId === "t"}
                onClose={toggleDrawer(false)}
            >

                <List>
                    <ListItem>
                        {isConnected ?
                            <Box padding={1} fontSize={12}>🟢 Online users ({onlineUsers.length})</Box> :
                            <Box padding={1} fontSize={12}>⛔ Chat disconnected, retrying ... </Box>
                        }
                    </ListItem>
                </List>
                <Divider/>
                {/* Start Usres *}
                <List dense={true}>
                    {!chatList ? <DataLoading/> :
                        chatList.length > 0 && chatList.map((chat) => {
                            let contact = chat.users.find(c => c._id != user.userData._id);
                            let photo = contact?.profilePic ? contact?.profilePic :
                                `https://avatars.dicebear.com/api/miniavs/${contact?.userName}.svg`;

                            return (
                                <ListItem button key={chat._id} onClick={() => 
                                    {
                                    navigate('/chat/' + chat._id);
                                    toggleDrawer(false)       ;                      
                                }}>
                                    <ListItemAvatar>
                                        <Avatar alt={contact?.userName} src={photo} className={classes.avatar}/>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={contact?.userName}
                                        secondary={onlineUsers.includes(contact?._id) ? 'Online' : 'Active recently'}
                                    />
                                    <ListItemSecondaryAction style={{marginRight: '13px'}}>
                                        <Badge color="error" overlap="rectangular"
                                               badgeContent={user.unreadChats[chat._id]?.length}></Badge>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })
                    }
                </List>
                {/* End Usres *}

            </Drawer>
            {/* End left Section *}

            {chatId == 't' ?
                <Box className={classes.main}
                     style={{justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                    <Typography component="h2" variant="h2" align='center'>
                        Kick start chat now! <br/> Say Hi 👊 to your MAS community
                    </Typography>
                </Box> : null}

            {!chatList ? <DataLoading/> :
                chatList.length > 0 && chatList.map((chat) => {
                    return <ChatBox
                        key={chat._id}
                        chat={chat}
                        socket={socket}
                        visible={(chat._id === chatId)}
                        isOnline={onlineUsers.includes(chat.users.find(c => c._id != user.userData?._id)?._id)}
                    />
                })
            }
        </Box>
       
       </Container>
   </Box>
       
    );
}
} */}