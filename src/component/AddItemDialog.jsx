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
  IconButton,
  Box,Popover
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { ArrowDropDown, ArrowUpward } from "@mui/icons-material";

import { useController, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Apiconfigs from "../Apiconfig/Apiconfigs";
import { tokensDetails } from "../constants/index";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import LinearProgress from "@mui/material/LinearProgress";

import { toast } from "react-toastify";

const AdditemDialog = ({ show, handleClose, itemData }) => {
  const [isEdit, setIsEdit] = useState(!!itemData);
  const classes = useStyles();
  const [mediaUrl, setMediaUrl] = useState(isEdit ? itemData.mediaUrl : "");
  const [mediaUrls, setMediaUrls] = useState(isEdit && Array.isArray(itemData.mediaUrls) ? itemData.mediaUrls : []);


  const [uploadCounter, setUploadCounter] = useState(0);

  // Yup inputs validation
  const schema = yup.object({
    file: yup.mixed().required("File is required"),
    itemTitle: yup.string().required("Enter title please"),
    itemName: yup.string().required("Enter name please"),
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
      itemTitle: isEdit ? itemData.itemTitle : "",
      itemName: isEdit ? itemData.itemName : "",
      donationAmount: isEdit ? itemData.donationAmount : 0,
      duration: isEdit ? +itemData.duration.split(" ")[0] : 0,
      details: isEdit ? itemData.details : "",
      coinName: isEdit ? itemData.coinName : "MAS",
    },
  });

  useEffect(() => {
    setMediaUrl(isEdit ? itemData.mediaUrl : "");
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
        style={{ textAlign: "center", color: "black", fontWeight: "bold",fontSize:"1.2rem"}}
      >
        {isEdit ? "Edit item" : "Create an item"}
      </DialogTitle>
      <DialogContent style={{ padding: 40 }}>
  <Grid container spacing={5}>
    {InputList()}
    <Grid item xs={12} sm={5} style={{ textAlign: 'center' }}>
      {MediaBox()}
      <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
        {MediaInput()}
      </div>
    </Grid>
    {FormButtons()}
  </Grid>
</DialogContent>
    </Dialog>
  );

  /* Main Return */

  function MediaBox() {
    const classes = useStyles(); // Assuming you use this hook for styles
    const maxImages = 9;
    const emptySlots = maxImages - mediaUrls.length;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
            <div className={classes.mediaBoxHeader}>
                Upload your images here
            </div>
            {mediaUrls.map((url, index) => (
                <Box key={index} className={classes.mediaPreview}>
                    <img src={url} alt={`Selected image ${index + 1}`} className={classes.img} />
                    <IconButton onClick={() => removeImage(index)} size="small" style={{ position: 'absolute', top: 0, right: 0, color: 'red' }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ))}
            {Array.from({ length: emptySlots }, (_, i) => (
                <Box key={i + mediaUrls.length} className={classes.emptyBox} onClick={() => document.getElementById('file-input').click()}>
                    <CloudUploadIcon style={{ color: '#ccc', fontSize: 24 }} />
                </Box>
            ))}
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
        </div>
    );
}

function removeImage(index) {
    const filteredUrls = mediaUrls.filter((_, idx) => idx !== index);
    setMediaUrls(filteredUrls);
}


  function FormButtons() {
    const onSubmit = handleSubmit(
      (data) => (isEdit ? edititem(data) : createitem(data)),
      () => console.log(errors)
    );

    return (
      <Grid xs={12} className={classes.buttonContainerStyle}>
        <Button
          variant="contained"
          onClick={handleClose}
          color="primary"
          size="large"
          style={{ background:"#8c0087",color:'white',margin:"0 5px"}}

        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          size="large"
          style={{ background:"#8c0087",color:'white',margin:"0 5px"}}

          className={classes.submitButton}
          disabled={isEdit && !dirtyFields.file}
        >
          {isEdit ? "Edit" : "Create"}
        </Button>
      </Grid>
    );
  }

  function MediaInput() {
    const { field } = useController({
        name: "file",
        control,
    });

    const { onChange, ref, name } = field;
    const handleFileChange = (files) => {
      if (files.length > 0) {
          const file = files[0]; // Get the single file
          const newUrl = URL.createObjectURL(file); // Create a URL for this single file
          setMediaUrls([...mediaUrls, newUrl]); // Append new URL to existing URLs
      }
  };
  

    return (
        <>
            <input
                accept="image/*"
                style={{ display: "none" }}
                className={classes.input}
                id="file-input"
                multiple={false}
                onChange={(e) => {
                    onChange(e.target.files[0]);
                    handleFileChange(e.target.files);
                }}
                ref={ref}
                name={name}
                type="file"
            />
        </>
    );
}

  function InputList() {
    return (
      <Grid item xs={12} sm={7}>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["itemTitle"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>item Title</label>
            <Input
              {...register("itemTitle")}
              className={classes.input}
              placeholder={"Enter item Title"}
              disabled={isEdit}
              inputProps={{maxLength: 16}}
            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["itemTitle"]?.message}
          </p>
        </>
        <>
          <Grid
            sm={12}
            className={classes.inputContainer}
            style={{ borderColor: errors["itemName"] ? "red" : "rgba(140, 0, 135, 0)" }}
          >
            <label style={{color:' #2d013a'}}>item Name</label>
            <Input
              {...register("itemName")}
              className={classes.input}
              placeholder={"Enter item Name"}
              disabled={isEdit}
              inputProps={{maxLength: 16}}

            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["itemName"]?.message}
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
                <CoinSelector
             watch={watch} // Pass the `watch` function from react-hook-form
             setValue={setValue} // Pass the `setValue` function from react-hook-form
             isEdit={isEdit}/>
              }
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
              className={classes.input}
              inputProps={{
                min: 0,
              }}
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
              placeholder={"Enter a details about your item"}
              disabled={isEdit}
              multiline={true}
              inputProps={{maxLength: 50}}

            />
          </Grid>
          <p style={{ margin: "-5px 0px 15px 5px", color: "red" }}>
            {errors["details"]?.message}
          </p>
        </>
      </Grid>
    );
  }

 function CoinSelector({watch, setValue, isEdit}) {
     const [anchorEl, setAnchorEl] = useState(null); // Anchor element for the popover
   const open = Boolean(anchorEl); // Whether the popover is open
 
   // Open the popover
   const handleOpen = (event) => {
     if (!isEdit) {
       setAnchorEl(event.currentTarget);
     }
   };
 
   // Close the popover
   const handleClose = () => {
     setAnchorEl(null);
   };
 
   // Handle token selection
   const handleTokenSelect = (tokenName ,tokenImg) => {
     setValue("coinName", tokenName); // Update the form value
     setValue("coinImg", tokenImg);
     handleClose(); // Close the popover
   };
 
     // Get the selected coin's image
     const selectedCoin = tokensDetails.find((item) => item.name === watch("coinName"));
     const selectedCoinImg = selectedCoin ? selectedCoin.img : "";
 
   return (
     <>
     <Box  display="flex"
         alignItems="center"
         sx={{
           border: "1px solid #ccc", // Optional: Add a border for better visibility
           borderRadius: "20px", // Optional: Add border radius
           padding: "4px 8px", // Adjust padding to control spacing
           width: "auto", // Ensure the Box takes full width
         }}>
 
          {/* Start Adornment: Coin Image */}
          {selectedCoinImg && (
           <img
             src={'/' + selectedCoinImg}
             alt={watch("coinName")}
             style={{ width: 25, marginRight: 8 }} // Adjust marginRight to control spacing
           />
         )}
 
       {/* Input Field */}
         <Input
           value={watch("coinName") || ""} // Display the selected token name
           onClick={handleOpen} // Open the popover when clicked
           readOnly // Make the input read-only
           disableUnderline // Remove the underline
           sx={{
             flex: 1, // Allow the input to take up remaining space
             "& .MuiInput-input": {
               cursor: "pointer", // Show pointer cursor on hover
               padding: 0, // Remove default padding
             },
           }}
         />
          <Button
           onClick={handleOpen}
           disabled={isEdit}
           sx={{
             padding: "6px 8px", // Adjust button padding
             minWidth: "auto", // Reduce button width
             marginLeft: "8px", // Adjust marginLeft to control spacing
           }}
         >
               <ArrowDropDown></ArrowDropDown>
               </Button>
               </Box>
 
       
 
       {/* Popover to display the list of tokens */}
       <Popover
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
           vertical: "bottom",
           horizontal: "right",
         }}
         transformOrigin={{
           vertical: "top",
           horizontal: "right",
         }}
         sx={{
           "& .MuiPopover-paper": {
             borderRadius: 20, // Add rounded corners
             boxShadow: 3, // Add a shadow
           },
         }}
       >
         <Box
           display="flex"
           flexDirection="row"
           flexWrap="wrap"
           padding={2}
           maxWidth={400} // Adjust the max width as needed
         >
           {tokensDetails.map((item, index) => (
             <MenuItem
               key={index}
               onClick={() => handleTokenSelect(item.name)} // Handle token selection
               style={{
                 padding: "1px",
                 display: "flex",
                 alignItems: "center",
                 flex: "1 1 auto",
               }}
             >  <Box sx={{display:"flex", alignItems:"center", margin:"0 2px"}}>
                |<img src={'/' + item.img} style={{ width: 25, marginRight: 2 }} />
                <p style={{ margin: "0" }}>{item.name}</p>
                </Box>
             </MenuItem>
             
           ))}
         </Box>
       </Popover>
     </>
   );
   }


  async function createitem(data) {
    try {
        const formData = new FormData();
        // Append text fields first
        formData.append("itemTitle", data.itemTitle);
        formData.append("itemName", data.itemName);
        formData.append("details", data.details);
        formData.append("donationAmount", data.donationAmount);
        formData.append("duration", `${data.duration} ${data.duration > 1 ? "days" : "day"}`);
        formData.append("coinName", data.coinName);
        // Append URLs as separate fields
        mediaUrls.forEach((url, index) => {
          formData.append(`url${index + 1}`, url); // Appending as url1, url2, ..., url9
      });

        // Convert URLs to File objects and append them
        const filePromises = mediaUrls.map(async (url, index) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], `image${index}.png`, { type: 'image/png' });
        });

        const files = await Promise.all(filePromises);
        files.forEach(file => formData.append("images", file));

        const res = await axios({
          method: "POST",
          url: Apiconfigs.addNft1,
          data: formData,
          headers: {
            token: sessionStorage.getItem("token"),
          },
          onUploadProgress: (progressEvent) => onUploadProgress(progressEvent),
        });

        if (res.data.statusCode === 200) {
            toast.success("Item created successfully");
            handleClose();
        } else {
            throw new Error('Failed to create item');
        }
    } catch (err) {
        console.error(err);
        toast.error("An error occurred while creating the item.");
    }
   
}

  async function edititem(data) {
    const formData = new FormData();
    formData.append("_id", itemData._id);
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
        toast.success("item edited successfully");
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
    return url.includes("video");
  }
};

export default AdditemDialog;

const useStyles = makeStyles(() => ({
  inputContainer: {
    borderWidth: 2,
    borderColor: " #8c0087",
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
  deleteIcon: {
    color: 'red', // Set the color property to red
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

    "&:hover": {
      boxShadow: "0px 0px 0px 0px",
      backgroundColor: "rgba(81, 0, 94, 0.95) !important",
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

  mediaPreview: {
    width: '100px',  // Same as empty box width
    height: '100px', // Same as empty box height
    overflow: 'hidden', // Ensures no part of the image spills out
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',  // Optional, for visual consistency
    borderRadius: '5px',       // Optional, matches empty box
},
img: {
    width: 'auto',
    height: '100%', // Ensures the image covers the full height
    maxWidth: '100%',  // Ensures the image width does not exceed the box
},


mediaBoxHeader: {
  width: '100%',
  marginBottom: '10px', // Adjust spacing as needed
  color: '#666',
  textAlign: 'center',
  fontWeight: 'bold',
},


emptyBox: {
  width: '100px',
  height: '113px',
  border: '2px dashed #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
},
plusIcon: {
  fontSize: '24px',
  color: '#ccc',
},

uploadCounter: {
  position: "relative",
  marginTop: 30,
  padding: 20,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center", // Ensures vertical centering in the column
  alignItems: "center", // Centers content horizontally
  width: '100%', // Ensures it takes the full width of its container
  textAlign: 'center', // Centers any text inside the div
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
