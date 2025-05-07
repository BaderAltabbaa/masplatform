import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Chip
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import ReactPlayer from "react-player";
import moment from "moment";
import axios from "axios";
import Apiconfigs from "../../../Apiconfig/Apiconfigs";
import Loader from "../../../component/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  playerContainer: {
    flex: 2,
    minWidth: 0, // Prevent flex item from overflowing
  },
  lessonsContainer: {
    flex: 1,
    maxHeight: '600px',
    overflowY: 'auto',
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      maxHeight: 'none',
    },
  },
  mediaContainer: {
    width: 'fit-content',
    height: '550px',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: '250px',
    },
  },
  lessonCard: {
    width:"fit-content",
    marginBottom: theme.spacing(2),
    cursor: 'pointer',
    transition: 'transform 0.2s',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: theme.shadows[4],
    },
  },
  lessonMedia: {
    height: '120px',
  },
  activeLesson: {
    border: `2px solid ${theme.palette.primary.main}`,
  },
  contentSection: {
    marginTop: theme.spacing(2),
    color: "white"
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  }
}));

const Lesson = () => {
  const classes = useStyles();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // State for the current lesson being viewed
  const [currentLesson, setCurrentLesson] = useState(location.state?.lessonData || null);
  
  // State for all lessons in the course
  const [allLessons, setAllLessons] = useState([]);
  
  // State for course details
  const [courseDetails, setCourseDetails] = useState(location.state?.courseDetails || null);
  
  const [isSubscribed, setIsSubscribed] = useState(location.state?.isSubscribed || false);
  const [loading, setLoading] = useState(!location.state?.lessonData);
  const [loadingLessons, setLoadingLessons] = useState(false);

  useEffect(() => {
    if (!location.state?.lessonData) {
      // If data wasn't passed via state, fetch it from API
      const fetchLessonData = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${Apiconfigs.mynft2}${id}`);
          if (res.data.statusCode === 200) {
            setCurrentLesson(res.data.result);
          }
        } catch (error) {
          console.error("Error fetching lesson:", error);
          navigate('/error');
        } finally {
          setLoading(false);
        }
      };
      
      fetchLessonData();
    }
    
    // Always fetch all lessons for the course
    const fetchAllLessons = async () => {
      try {
        setLoadingLessons(true);
        const res = await axios.get(Apiconfigs.courseContentList, {
          params: {
            nft2Id: location.state?.courseDetails?._id || courseDetails?._id,
          },
          headers: {
            token: sessionStorage.getItem("token"),
          },
        });
        
        if (res.data.statusCode === 200) {
          setAllLessons(res.data.result.docs);
          
          // If we didn't get lessonData from state, set the first lesson as current
          if (!location.state?.lessonData && res.data.result.docs.length > 0) {
            setCurrentLesson(res.data.result.docs[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setLoadingLessons(false);
      }
    };
    
    fetchAllLessons();
  }, [id, location.state, navigate, courseDetails]);

  const handleVideo = (url) => {
    if (!url || typeof url !== "string") return false;
    const videoFormats = ["mp4", "avi", "wmv", "mov", "mkv", "flv", "webm", "mpeg", "3gp", "ogv"];
    const extension = url.split('.').pop().split('?')[0].toLowerCase();
    return videoFormats.includes(extension);
  };

  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson);
    // Update URL without navigation
    navigate(`/lesson/${lesson._id}`, { 
      replace: true,
      state: { 
        lessonData: lesson,
        courseDetails: courseDetails,
        isSubscribed: isSubscribed
      } 
    });
  };

  if (loading) return <Loader />;
  if (!currentLesson) return <Typography variant="h4">Lesson not found</Typography>;

  return (
    <Box className={classes.root} sx={{
      background: (theme) => theme.custom.PageBackGround,
    }}>
      <Box className={classes.container}>
        {/* Main Player and Current Lesson Info */}
        <Box className={classes.playerContainer}>
          <Box className={classes.mediaContainer}>
            {handleVideo(currentLesson?.mediaUrl) ? (
              <ReactPlayer
                url={currentLesson.mediaUrl}
                playing
                controls
                width="100%"
                height="100%"
                muted
              />
            ) : (
              <img
                src={currentLesson?.mediaUrl}
                alt={currentLesson?.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  borderRadius: '8px'
                }}
              />
            )}
          </Box>
          
          <Box sx={{
            backgroundColor: "rgb(117, 0, 125)",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px"
          }}>
            <Box display="flex" justifyContent="space-between" alignItems='center' mb={2}>
              <Typography variant="h2" color="white">
                 {currentLesson?.details || "No details provided."}
              </Typography>
              <Typography variant="h3" color="white">
                {currentLesson?.createdAt && moment(currentLesson.createdAt).format("MMM Do YYYY")}
              </Typography>
            </Box>
            
            <Typography variant="h3" paragraph color="white" mb={3}>
            {currentLesson?.title || "No Title Available"}
            </Typography>
            
            <Box display="flex" flexWrap="wrap">
              <Chip 
                label={currentLesson?.postType || "PUBLIC"} 
                className={classes.chip}
                color={currentLesson?.postType === "PRIVATE" ? "secondary" : "primary"}
              />
              {!isSubscribed && currentLesson?.postType === "PRIVATE" && (
                <Chip 
                  label="Subscribe to access" 
                  className={classes.chip}
                  color="error"
                />
              )}
            </Box>
          </Box>
          
          <Button 
            variant="contained"
            sx={{
              color: "white",
              backgroundColor: "rgb(66, 0, 92)",
              '&:hover': {
                backgroundColor: "rgb(86, 0, 120)",
              }
            }}
            onClick={() => navigate(-1)}
          >
            Back to Course
          </Button>
        </Box>
        
        {/* Lessons List */}
        <Box className={classes.lessonsContainer}>
          <Typography variant="h5" gutterBottom color="white">
            Course Lessons ({allLessons.length})
          </Typography>
          
          {loadingLessons ? (
            <Loader />
          ) : allLessons.length === 0 ? (
            <Typography variant="body1" color="white">
              No lessons available in this course.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {allLessons.map((lesson) => (
                <Grid item xs={12} key={lesson._id}>
                  <Card 
                    className={`${classes.lessonCard} ${
                      currentLesson._id === lesson._id ? classes.activeLesson : ''
                    }`}
                    onClick={() => handleLessonClick(lesson)}
                  >
                    <Box display="flex">
                      <Box>
                        {handleVideo(lesson.mediaUrl) ? (
                          <ReactPlayer
                            url={lesson.mediaUrl}
                            width="150px"
                            height="100%"
                            
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            className={classes.lessonMedia}
                            image={lesson.mediaUrl}
                            alt={lesson.title}
                          />
                        )}
                      </Box>
                      <Box>
                      <CardContent style={{ flex: 1 ,background:"rgb(117, 0, 125)" }}>
                        <Typography variant="subtitle1" noWrap color="white">
                           {lesson.details}
                        </Typography>
                        <Typography variant="body2" color="white">
                          {moment(lesson.createdAt).format("MMM Do YYYY")}
                        </Typography>
                        <Typography variant="body2" color="white" noWrap>
                        {lesson.title}
                        </Typography>
                      </CardContent>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Lesson;