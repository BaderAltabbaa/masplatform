import React, { useEffect, useState } from "react";
import Dialog from "@mui/material//Dialog";
import DialogTitle from "@mui/material//DialogTitle";
import DialogContent from "@mui/material//DialogContent";
import {
  Grid,
  Input,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Apiconfigs from "../Apiconfig/Apiconfigs";
import { tokensDetails } from "../constants/index";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LinearProgress from "@mui/material/LinearProgress";

import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const AddBundleDialog = ({ show, handleClose, bundleData }) => {
  const [isEdit, setIsEdit] = useState(!!bundleData);
  const classes = useStyles();
  const [mediaUrl, setMediaUrl] = useState(isEdit ? bundleData.mediaUrl : "");
  const [uploadCounter, setUploadCounter] = useState(0);

  // Yup inputs validation
  const schema = yup.object({
    file: yup.mixed().required("File is required"),
    bundleTitle: yup.string().required("Enter title please"),
    bundleName: yup.string().required("Enter name please"),
    details: yup.string().required("Enter description please"),
    duration: yup.number().min(1, "Select a ending date"),
    donationAmount: yup
      .number()
      .min(1, "Enter donation amount please")
      .positive("the price should be positive number"),
    coinName: yup.string().required("Enter coin name"),
  });

  // React hook form for handle form data
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
      bundleTitle: isEdit ? bundleData.bundleTitle : "",
      bundleName: isEdit ? bundleData.bundleName : "",
      donationAmount: isEdit ? bundleData.donationAmount : 0,
      duration: isEdit ? +bundleData.duration.split(" ")[0] : 0,
      details: isEdit ? bundleData.details : "",
      coinName: isEdit ? bundleData.coinName : "MAS",
    },
  });

  useEffect(() => {
    setMediaUrl(isEdit ? bundleData.mediaUrl : "");
  }, [show]);

  /* Main Return */

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      open={show}
      onClose={uploadCounter === 0 ? handleClose : null}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle
        style={{ textAlign: "center", color: "black", fontWeight: "bold",fontSize:"1.2rem" }}
      >
        {isEdit ? "Edit Bundle" : "Create a Bundle"}
      </DialogTitle>
      <DialogContent style={{ padding: 40 }}>
        <Grid container spacing={5}>
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

  /* Main Return */

  function MediaBox() {
    const { name } = watch("file") ? watch("file") : { type: "", name: "" };

    const isVideo = watch("file")
      ? watch("file")?.type?.split("/")[0] !== "image"
      : isEdit
      ? isVideoType(mediaUrl)
      : false;

    const onRemove = () => {
      setMediaUrl("");
      setValue("file", null);
    };

    return (
      <Box
        style={{ display: mediaUrl !== "" ? "block" : "none" }}
        className={classes.mediaBox}
      >
        {isVideo ? (
          <div
            style={{ borderRadius: "10px 10px 0px 0px", overflow: "hidden" }}
          >
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
            height={"50%"}
            alt={"bundle image"}
            style={{ borderRadius: "10px 10px 0px 0px" }}
          />
        )}
        <div className={classes.mediaBoxInfo}>
          <div>
            <p
              style={{
                color: "#777",
                fontWeight: "600",
                margin: 0,
                fontSize: 14,
              }}
            >
              Filename
            </p>
            <p style={{ marginTop: 5, fontWeight: "500" }}>
              {name ? name : ""}
            </p>
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
            <p>Uploading {uploadCounter}%</p>
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
    const onSubmit = handleSubmit(
      (data) => (isEdit ? editBundle(data) : createBundle(data)),
      () => console.log(errors)
    );

    return (
      <Grid xs={12} className={classes.buttonContainerStyle}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          size="large"
          style={{ fontSize: "15px",background:"#8c0087",color:"white" ,margin:"0 5px"}}

        >
          Cancel
        </Button>
        <Button
        color="primary"
          variant="contained"
          onClick={onSubmit}
          size="large"
          // className={classes.submitButton}
          disabled={isEdit && !dirtyFields.file}
          style={{ fontSize: "15px",background:"#8c0087",color:"white" ,margin:"0 5px"}}

        >
          {isEdit ? "Edit" : "Create"}
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
          onChange={(e) => {
            onChange(e.target.files[0]);
            setMediaUrl(URL.createObjectURL(e.target.files[0]));
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
             <div style={{display:"flex" ,justifyContent:"center", alignItems:"center" ,border:"1px solid rgb(184, 180, 180)",padding:"60px 10px",borderRadius:"10px"
            }}>
            <div className={classes.uploadIcon}>
              <CloudUploadIcon />
            </div>
            <div style={{ margin: 15, textAlign: "left" }}>
              <p style={{ margin: "5px 0px 0px 0px", fontSize: 18 }}>
                Select Image/Video
              </p>
              <p style={{ margin: "5px 0px 0px 0px" }}>Drag And Drop Files</p>
              <p style={{ margin: "5px 0px 0px 0px" }}>
                Accept All Video/Image Formats
              </p>
              <p style={{ margin: "5px 0px 0px 0px" }}>
                Max File Size: 1024 MP
              </p>
              <p style={{ margin: "5px 0px 0px 0px" }}>
                Min Width Size: 300px
              </p>
              <p style={{ margin: "5px 0px 0px 0px" }}>
                Min Height Size: 160px
              </p>
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
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["bundleTitle"] ? "red" : "rgba(45, 34, 45, 0)" }}
          >
            <label style={{color:' #2d013a'}}>Bundle Title</label>
            <Input
              {...register("bundleTitle")}
              className={classes.input}
              placeholder={"Enter Bundle Title"}
              disabled={isEdit}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["bundleTitle"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["bundleName"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>Bundle Name</label>
            <Input
              {...register("bundleName")}
              className={classes.input}
              placeholder={"Enter Bundle Name"}
              disabled={isEdit}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["bundleName"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["donationAmount"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>Amount</label>
            <Input
              {...register("donationAmount")}
              className={classes.input}
              inputProps={{
                min: 0,
              }}
              placeholder={"Enter Donation Amount"}
              disabled={isEdit}
              type={"number"}
              endAdornment={
           <Box sx={{ position: 'relative', top: '-18px' }}> {/* Adjust `top` value as needed */}
             <CoinSelector/>
             </Box>}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {typeof watch("donationAmount") === "number" &&
              errors["donationAmount"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["duration"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>Duration</label>
            <Input
              {...register("duration")}
              inputProps={{
                min: 0,
              }}
              className={classes.input}
              placeholder={"Enter Duration"}
              disabled={isEdit}
              type={"number"}
              endAdornment={
                <p style={{ margin: "0px 10px", fontSize: 14 }}>days</p>
              }
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {typeof watch("duration") === "number" &&
              errors["duration"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["details"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>Details</label>
            <Input
              {...register("details")}
              className={classes.input}
              placeholder={"Enter a details about your bundle"}
              disabled={isEdit}
              multiline={true}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["details"]?.message}
          </p>
        </>
      </Grid>
    );
  }

  function CoinSelector() {
    return (
      <InputAdornment position="end">
        <Select
          className={classes.select}
          value={watch("coinName")}
          onChange={(event) => setValue("coinName", event.target.value)}
          disabled={isEdit}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: '#f5f5f5', // Background color of the dropdown
                borderRadius: '0px 0 20px 20px',
              },
            },
            MenuListProps: {
              sx: {
                padding: '10px 0',
                backgroundColor:"rgb(255, 255, 255)",
              
              },
            },
          }}
        >
          {tokensDetails.map((item, index) => (
            <MenuItem
              key={index}
              value={item.name}
              style={{
                padding: "10px 0px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <p style={{ margin: 5, width: 50 }}>{item.name}</p>
              <img src={'/' + item.img} style={{ width: 25 }} />

            </MenuItem>
          ))}
        </Select>
      </InputAdornment>
    );
  }

  async function createBundle(data) {
    try {
      const formData = new FormData();
      formData.append("file", data.file);
      formData.append("tokenName", data.bundleName);
      formData.append("bundleTitle", data.bundleTitle);
      formData.append(
        "duration",
        `${data.duration} ${data.duration > 1 ? "days" : "day"}`
      );
      formData.append("bundleName", data.bundleName);
      formData.append("details", data.details);
      formData.append("donationAmount", data.donationAmount);
      formData.append("coinName", data.coinName);

      const res = await axios({
        method: "POST",
        url: Apiconfigs.addNft,
        data: formData,
        headers: {
          token: sessionStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      });

      if (res.data.statusCode === 200) {
        toast.success("Bundle created");
        handleClose();
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function editBundle(data) {
    const formData = new FormData();
    formData.append("_id", bundleData._id);
    formData.append("mediaUrl", data.file);
    try {
      const res = await axios({
        method: "PUT",
        url: Apiconfigs.editNft,
        data: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          token: sessionStorage.getItem("token"),
        },
        onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
      });
      if (res.data.statusCode === 200) {
        toast.success("Bundle edited successfully");
        handleClose();
      }
    } catch (e) {
      console.log(e);
    }
  }

  function onUploadProgress(progressEvent) {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadCounter(percentCompleted);
  }

  function isVideoType(url) {
   //return url.includes("video");
  }
};

export default AddBundleDialog;

const useStyles = makeStyles(() => ({
  inputContainer: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "solid",
    borderRadius: 5,
    padding: "10px",
    marginBottom: 10,
    transition: "border-color 0.3s ease-in",
    "&:focus-within": {
      borderColor: "rgb(192, 72, 72)",
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
    "&>div": {
      display: "flex",
      alignItems: "center",
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
    width: 70,
    height: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px #ddd solid",
    borderRadius: "50%",
  },

  buttonContainerStyle: {
    padding: "0px 20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
