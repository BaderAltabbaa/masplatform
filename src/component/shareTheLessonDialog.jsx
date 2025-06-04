import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Box,TextField,Tooltip,Typography
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Apiconfigs from "../Apiconfig/Apiconfigs";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { Pagination } from "@mui/material";
import { useTranslation } from 'react-i18next';


const ShareTheLessonDialog = ({ show, handleClose, lessonData }) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [state, setState] = useState({
    mediaUrl: "",
    uploadCounter: 0,
    courseList: [],
    page: 1,
    pages: 1,
    isEdit: !!lessonData,
  });
  const { mediaUrl, uploadCounter, page, pages, courseList, isEdit } = state;
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  // Yup inputs validation
  const schema = yup.object({
    file: !isEdit ? yup.mixed().required("File is required") : null,
    title: yup.string().min(3, "Enter title please"),
    details: yup.string().min(3, "Enter description please"),
    courseIds: yup.array().min(1, "Select 1 course at least"),
  });

  // React hook form for handling form data
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, dirtyFields },
    register,
  } = useForm({
    resolver: yupResolver(schema),
    reValidateMode: "onChange",
    defaultValues: {
      file: null,
      title: isEdit ? lessonData.title : "",
      details: isEdit ? lessonData.details : "",
      type: isEdit ? lessonData.postType : "PUBLIC",
      courseIds: isEdit ? lessonData.nft2Id : [],
    },
  });

  const formCourses = watch("courseIds") || []; // Ensure formCourse is always an array
  const [selectedItemName, setSelectedItemName] = useState("");

  useEffect(() => {
    updateState({ mediaUrl: isEdit ? lessonData.mediaUrl : "" });
  }, [show]);

  useEffect(() => {
    getCourseListHandler().catch(console.error);
  }, [page]);

  // Handle item click
  const handleItemClick = (item) => {
    if (!isEdit) {
      const isChosen = formCourses.includes(item._id);
      if (isChosen){
        selectItem(item._id);
        setSelectedItemName('');
        setValue("title", "");
      }
      else{
        if (item.courseName && item.courseName.length >= 3) {
        setValue("courseIds", [item._id]);
        setSelectedItemName(item.courseName);
        setValue("title", item.courseName); // Update the title field in the form\
        }else{
          toast.error("Course name must be at least 3 characters long.");

        }
      }
    }
  };

  // Select/deselect an item
  const selectItem = (itemId) => {
    const updatedCourses = formCourses.includes(itemId)
      ? formCourses.filter((id) => id !== itemId) // Deselect
      : [...formCourses, itemId]; // Select
    setValue("courseIds", updatedCourses); // Update form value
  };


  const convertImageToWebP = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Image conversion to WebP failed"));
          }
        },
        "image/webp",
        0.8 // quality (0.0 to 1.0)
      );
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};

  return (
    <Dialog
    fullWidth={true}
    maxWidth={"lg"}
    open={show}
    onClose={uploadCounter === 0 ? handleClose : null}
    aria-labelledby="max-width-dialog-title"
    dir='ltr'
    scroll="body"
   
    >
      <DialogTitle
 sx={{ 
  textAlign: "center", 
  color: "black", 
  fontWeight: "bold", 
  fontSize: "1.5rem",
  py: 1
}}      >
        {isEdit ? t("Edit Lesson") : t("Add a Lesson")}
      </DialogTitle>
      <DialogContent  sx={{ p: "0 20px", overflow: 'hidden' }}>
       
        <Grid container spacing={2} sx={{ flex: 1, overflow: 'auto' }}>
          {InputList()}
          <Grid item xs={12} sm={5}>
            {MediaInput()}
            {MediaBox()}
          </Grid>
          {FormButtons()}
        </Grid>
      </DialogContent>
    </Dialog>
  );

  function MediaBox() {
    const { name } = watch("file") ? watch("file") : { type: "", name: "" };
    const isVideo = watch("file")
      ? watch("file")?.type?.split("/")[0] !== "image"
      : isEdit
      ? isVideoType(mediaUrl)
      : false;

    const onRemove = () => {
      updateState({ mediaUrl: "" });
      setValue("file", null);
    };

    return (
      <Box
        style={{ display: mediaUrl !== "" ? "block" : "none" }}
        className={classes.mediaBox}
        mb={1}
      >
        {isVideo ? (
          <div style={{ borderRadius: "10px 10px 0px 0px", overflow: "hidden" }}>
            <ReactPlayer
              url={mediaUrl}
              playing
              controls
              width={"100%"}
              height={"100%"}
            />
          </div>
        ) : (
          <img
            src={mediaUrl}
            width="100%"
            alt={"Course image"}
            style={{ borderRadius: "10px 10px 0px 0px" ,height:"200px"}}
          />
        )}
        <div className={classes.mediaBoxInfo}>
          <div>
            <p style={{ color: "#777", fontWeight: "600", margin: 0, fontSize: 14 }}>{t("Filename")}</p>
            <p style={{ marginTop: 5, fontWeight: "500" }}>{name ? name : ""}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <DeleteIcon
              fontSize={"medium"}
              style={{ color: "red", cursor: "pointer" }}
              onClick={onRemove}
            />
          </div>
        </div>
        {uploadCounter > 0 && (
          <div className={classes.uploadCounter}>
             <p>{t("Uploading")} {uploadCounter}%</p>
            <LinearProgress
            variant="determinate"
            value={uploadCounter}  
            sx={{
              marginTop:"10px",
              width: "100%", // Take full width of the parent container
              height: 10, // Set a visible height
              borderRadius: 5, // Optional: Add rounded corners
              backgroundColor: " #e0e0e0", // Background color
              "& .MuiLinearProgress-bar": {
                backgroundColor: "rgb(67, 0, 90)", // Progress bar color
              },
            }}
           />
           
          </div>
        )}
      </Box>
    );
  }

  function FormButtons() {
    const onSubmit = handleSubmit(async (data) => {
      try{
        if(isEdit){
          await editLesson(data)
        }
        else {
          await shareTheLesson(data)
        }
        window.location.reload()
      } catch (error) {
        console.error("Submission error:", error);
      }
    }, () => console.log(errors));

    return (
      <Grid xs={12} className={classes.buttonContainerStyle}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          size="large"
          sx={{ fontSize: "15px", background: (theme) => theme.custom.mainButton, color: "white", margin: "0 10px",
              "&:hover":{
                background:(theme) => theme.custom.hoverMainButton
              } }}
        >
          {t("Cancel")}
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={onSubmit}
          size="large"
          sx={{ fontSize: "15px", background: (theme) => theme.custom.mainButton, color: "white", margin: "0 10px",
              "&:hover":{
                background:(theme) => theme.custom.hoverMainButton
              } }}
        >
          {isEdit ? t("Edit") : t("Share")}
        </Button>
      </Grid>
    );
  }

  function MediaInput() {
    const {
      field,
      fieldState: { error },
    } = useController({
      name: "file",
      control,
    });

    const { onChange, ref, name } = field;

    return (
      
      <label htmlFor="raised-button-file">
        <input
          accept="image/*,video/*"
          style={{ display: "none" }}
          className={classes.input}
          id="contained-button-file-add-bun"
          multiple
           onChange={async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const isImage = file.type.startsWith("image/");
  if (isImage) {
    const convertedWebPBlob = await convertImageToWebP(file);
    const webpFile = new File([convertedWebPBlob], file.name.replace(/\.\w+$/, ".webp"), {
      type: "image/webp",
    });

     // 🔍 Log details
    console.log("Original file:", file);
    console.log("Converted WebP file:", webpFile);
    console.log("WebP Name:", webpFile.name);
    console.log("WebP Size (KB):", (webpFile.size / 1024).toFixed(2));
    console.log("WebP Type:", webpFile.type);
    onChange(webpFile);
     updateState({ mediaUrl: URL.createObjectURL(webpFile)});
  } else {
    onChange(file); // Keep video files as-is
     updateState({ mediaUrl: URL.createObjectURL(file)});
  }
}}
          ref={ref}
          name={name}
          type="file"
        />
        <label htmlFor="contained-button-file-add-bun">
          <Button
            variant="outined"
            color="primary"
            component="span"
            className={classes.uploadBox}
            style={{
              borderColor: error ? "red" : "#ddd",
              display: mediaUrl === "" ? "flex" : "none",
            }}
          >
 <div
              style={{
                width:"100%",
                height:"100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgb(199, 196, 196)",
                padding: "60px 10px",
                borderRadius: "10px",
              }}
            > 
             <Tooltip title={<div>
              <div>Max-Size: 1024 Mb</div>
              <div>min-width: 300px</div>
              <div>min-hieght: 160px</div>
              </div>}
               placement="bottom" >
                         <div className={classes.uploadIcon}>
                <CloudUploadIcon sx={{fontSize:{xs:"2rem",md:"4rem"}}}/>
              </div>
               </Tooltip>
              <div style={{ margin: 15, textAlign: "center" }}>
                <Typography sx={{ margin: "5px 0px 0px 0px", fontSize:{xs:"0.8rem",md:"1.5rem"} }}>{t("Select Image/Video")}</Typography>
               
              </div>
            </div>
          </Button>
        </label>
      </label>
     
    );
  }

  function InputList() {
    return (
      <Grid item xs={12} sm={7}>
  {/* Course Selector */}
  <CourseSelector />

  {/* Title Field */}
  <TextField
    {...register("title")}
    label={t("Title")}
    placeholder={t("Enter Course Title")}
    disabled={true}
    value={selectedItemName}
    fullWidth
    margin="normal"
    error={!!errors.title}
    helperText={errors.title?.message}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: errors.title ? "red" : ""
        },
      },
    }}
  />

  {/* Type Field */}
  <TextField
    {...register("type")}
    label={t("Type")}
    placeholder={t("Enter Course Type")}
    disabled={true}
    fullWidth
    margin="normal"
    InputProps={{
      endAdornment: (
        <Box sx={{ position: 'relative'}}>
          <TypeSelector />
        </Box>
      )
    }}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: ""
        },
      },
    }}
  />

  {/* Details Field */}
  <TextField
    {...register("details")}
    label={t("Details")}
    placeholder={t("Enter Course Details")}
    multiline
    rows={1}
    fullWidth
    margin="normal"
    error={!!errors.details}
    helperText={errors.details?.message}
    sx={{
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: errors.details ? "red" : ""
        },
      },
    }}
  />
</Grid>
    );
  }

  function TypeSelector() {
    return (
      <InputAdornment position="end">
        <Select
          className={classes.select}
          value={watch("type")}
          onChange={(event) => setValue("type", event.target.value)}
          disabled={isEdit && lessonData.postType === "PUBLIC"}
           sx={{
          height: '40px',
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            paddingRight: '24px !important',
            gap:1,

          }
        }}
        >
          {["PUBLIC", "PRIVATE"].map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </InputAdornment>
    );
  }

  function CourseSelector() {
    return (
      <div style={{ margin:"0 10px" }}>
        <p className={classes.selectorTitleStyle} style={{ color: " #2d013a" }}>
          Choose The Course You Wish To A Lesson To: 
        </p>
        <Grid container spacing={2}>
        {Array.isArray(courseList) && courseList.map((item) => {

            const isChosen = formCourses.includes(item._id);
            return (
              <Grid item key={item._id} lg={3} md={4} sm={6} xm={12}>
                <Box
                  className={classes.courseCardStyle}
                  sx={{
                    backgroundColor: isChosen ? (theme) => theme.custom.hoverMainButton : (theme) => theme.custom.mainButton,
                    cursor: "pointer",
                      color: "white"
                  }}
                  onClick={() => handleItemClick(item)}
                >
                  <p style={{ textAlign: "center" }}>{item.courseName}</p>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {errors?.courseIds && (
          <p style={{ color: "red" }}>{errors.courseIds?.message}</p>
        )}
        {pages > 0 && (
          <Box
            mb={2}
            mt={2}
            display="flex"
            justifyContent="center"
            style={{ marginTop: 20 }}
          >
            <Pagination
              count={pages}
              page={page}
              onChange={(e, v) => updateState({ page: v })}
              size="small"
            />
          </Box>
        )}
      </div>
    );
  }

  async function shareTheLesson(data) {
    const formData = new FormData();
    formData.append("mediaUrl", data.file);
    formData.append("title", data.title);
    formData.append("details", data.details);
    formData.append("postType", data.type);
    formData.append("nft2Ids", JSON.stringify(data.courseIds));
    try {
      const res = await axios({
        method: "POST",
        url: Apiconfigs.share2,
        data: formData,
        headers: {
          token: sessionStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      });
      if (res.data.statusCode === 200) {
        toast.success(res.data?.responseMessage);

         Object.keys(sessionStorage).forEach(key => {
                if (key.startsWith('course-content-')) {
                  sessionStorage.removeItem(key);
                }
              });
       
             // Trigger refresh event
             window.dispatchEvent(new CustomEvent('refreshCourseContnetList'));

        handleClose();
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function editLesson(data) {
    const formData = new FormData();
    formData.append("id", lessonData._id);
    if (dirtyFields.file) {
      formData.append("mediaUrl", data.file);
    }
    formData.append("details", data.details);
    formData.append("postType", data.type);
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.editLesson,
        data: formData,
        headers: {
          token: sessionStorage.getItem("token"),
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      });
      if (res.data.statusCode === 200) {
        handleClose();
        window.location.reload();
        toast.success(res.data?.responseMessage);
      } else {
        toast.error(res.data.responseMessage);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getCourseListHandler() {
    await axios({
      method: "GET",
      url: Apiconfigs.myNft2List,
      headers: {
        token: sessionStorage.getItem("token"),
      },
      params: {
        page,
        limit: 4,
      },
    })
      .then(async (res) => {
        if (res.data.statusCode === 200) {
          updateState({ courseList: res.data.result.docs });
          updateState({ pages: res.data.result.totalPages });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function onUploadProgress(progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    updateState({ uploadCounter: percentCompleted });
  }

  function isVideoType(url) {
    return url.includes("video");
  }
};

export default ShareTheLessonDialog;

const useStyles = makeStyles((theme) => ({
  inputContainer: {
    borderWidth: 2,
    borderColor: "rgba(140, 0, 135, 0)",
    borderStyle: "solid",
    borderRadius: 5,
    padding: "10px",
    marginBottom: 10,
    transition: "border-color 0.3s ease-in",
    "&:focus-within": {
      borderColor: "rgba(72, 162, 192, 0)",
      "& label": {
        color: "rgb(192, 72, 72)",
        transition: "color 0.3s ease-in",
      },
    },
    "&>label": {
      fontWeight: "500",
      color: "black",
      fontSize: 14,
    },
  },

  input: {
    width: "100%",
    "&::before": {
      content: "none",
    },
    "&::after": {
      content: "none",
    },
    "&>input": {
      width: "100%",
    },
  },

  select: {
    "&::before": {
      content: "none",
    },
    "&::after": {
      content: "none",
    },
    "& div:focus": {
      background: "transparent",
      
    },
  },

  uploadBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    height: "calc(100% - 10px)",
    border: "2px #ddd solid",
    "&>.MuiButton-label": {
      flexDirection: "column",
    },
  },

  uploadIcon: {
    width: 100,
    height: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px #ddd solid",
    borderRadius: "50%",
     [theme.breakpoints.down('sm')]: {
      width:50,
      height:"100%"
    },
  },

  buttonContainerStyle: {
    padding: "0px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop:"25px"
  },

  submitButton: {
    backgroundColor: "rgb(192, 72, 72)",
    color: "#fff",
    "&:hover": {
      boxShadow: "0px 0px 0px 0px",
      backgroundColor: "rgba(192, 72, 72, 0.95) !important",
    },
  },

  mediaBox: {
    width: "100%",
    marginBottom: 0,
  },

  mediaBoxInfo: {
    background: "rgba(0,0,0,0.1)",
    marginTop: -6,
    padding: 20,
    borderRadius: "0px 0px 10px 10px",
    height: "50%",
  },

  uploadCounter: {
    position: "relative",
    marginTop: 30,
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  uploadCounterIcon: {
    position: "absolute",
    marginBottom: 20,
    animation: "$upAndDown 2s ease-in-out infinite",
  },

  selectorTitleStyle: {
    fontWeight: "500",
    color: "black",
    fontSize: 16,
    margin: "20px 0px",
  },

  courseCardStyle: {
    width: 150,
    height: 100,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2px #ddd solid",
     [theme.breakpoints.down('sm')]: {
      width:80,
      height:80
    },
  },

  "@keyframes upAndDown": {
    "0%": {
      top: 0,
    },
    "50%": {
      top: -15,
    },
    "100%": {
      top: 0,
    },
  },
}));
