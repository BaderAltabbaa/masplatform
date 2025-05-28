import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogTitle, DialogContent, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import Apiconfigs from "src/Apiconfig/Apiconfigs";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import bwipjs from 'bwip-js';
import { useTranslation } from 'react-i18next';

export default function BillingDialog({  open, 
  onClose, 
  itemData,    // Destructure itemData from props
  auth,        // Destructure auth from props
  userId,      // Destructure userId from props
  userName     // Destructure userName from props
   }) {
    const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phoneNumber: '',
    email: '',
    postcode: '',
    address1: '',
    address2: '',
    serialNumber: '',
  });
            const [error, setError] = useState('');
            const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
            const isMounted = useRef(true);
            const [showBillDialog, setShowBillDialog] = useState(false);
            const [showPurchaseDialog, setshowPurchaseDialog] = useState(false);
            const [billPdfUrl, setBillPdfUrl] = useState(null);
              const {t} = useTranslation();
            
        
        
            useEffect(() => {
              // Function to generate the serial number
              const generateSerialNumber = () => {
                  const now = new Date();
                  return 'SN' + now.getFullYear().toString() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + now.getHours().toString().padStart(2, '0') + now.getMinutes().toString().padStart(3, '0') + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
              };
          
              if (open) {
                  const newSerialNumber = generateSerialNumber();
                  setFormData(prevFormData => ({
                      ...prevFormData,
                      serialNumber: newSerialNumber  // Set the new serial number
                  }));
              }
          
              // Cleanup function
              return () => {
                  isMounted.current = false;
              };
          }, [open]);  // Dependency array includes `open` to trigger the effect when it changes
          
        
          const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        };
        
            const handleSubmit = async () => {
                try {
                    console.log("data:", formData);
                    const res = await axios({
                        method: "PUT",
                        url: Apiconfigs.bill,
                        data: formData,
                        headers: {
                            token: sessionStorage.getItem("token") || "default-token",
                        },
                    });
        
                    console.log("Response from server:", res.data);
                    if (res.status !== 200) {
                        throw new Error('Form submission failed with status: ' + res.status);
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                    if (isMounted.current) {
                        setError("Failed to submit form: " + error.message);
                    }
                }
            };
        
            const buyNow = async () => {
                try {
                    console.log("Initiating purchase:");
                    console.log("Data needed:", itemData.details, itemData.coinName, itemData.donationAmount,userName);
                    console.log("sellerId", userId);
                    console.log("ItemId", itemData._id);
                    console.log("buyerId",auth.userData._id );
                    const response = await axios({
                        method: "PUT",
                        url: Apiconfigs.order ,
                        data: {
                            //sellerId:userId, 
                            userBuyer:auth.userData._id,
                            nft1Id: itemData._id,
                            //mediaUrl: itemData.mediaUrl1,
                            //details: itemData.details,
                            //tokenName: itemData.coinName,
                            //Price: itemData.donationAmount,
                            
                        },
                        headers: {
                          token: sessionStorage.getItem("token"),
                        },
                    });
        
                    console.log("Order response:", response.data);
                    if (response.status !== 200) {
                      throw new Error('Order placement failed with status: ' + response.status);
                  }
                  if (isMounted.current) {
                      setShowConfirmationDialog(true);
                      //setShowBillDialog(true);
                      setshowPurchaseDialog(true);
                  }
              } catch (error) {
                  console.error("Order placement error:", error);
                  if (isMounted.current) {
                      if (axios.isAxiosError(error) && error.response && error.response.status === 400) {
                          setError("Failed to place order: your balance is low");
                      } else {
                          setError("Failed to place order: " + error.message);
                      }
                  }
              }
          };
        
          const handleBuy = async () => {
            // First validate all fields
            const requiredFields = ["name", "surname", "phoneNumber", "email", "postcode", "address1", "serialNumber"];
            const emptyFields = requiredFields.filter(field => !formData[field]?.trim());
            
            if (emptyFields.length > 0) {
              setError(`Please fill in all required fields: ${emptyFields.join(", ")}`);
              return; // Stop execution if fields are empty
            }
          
            try {
              await handleSubmit();
              await buyNow();
            } catch (error) {
              console.error("Unable to complete purchase:", error.message);
              setError(error.message);
            }
          };
          
          const generatePDF = async (formData, itemData) => {
            const doc = new jsPDF();
  
            // Get current date and time
            const now = new Date();
            const formattedDate = now.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
            const formattedTime = now.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit' });
        
            const serialNumber = formData.serialNumber;  // Generate serial number
            console.log("serialNumber:",serialNumber);
        
            // Create an element to render the barcode into (a canvas)
            const canvas = document.createElement("canvas");
            let barcodeDataUrl = null; // Declare outside to widen scope
        
            try {
                bwipjs.toCanvas(canvas, {
                    bcid: 'code128',       // Barcode type
                    text: serialNumber,    // Text to encode
                    scale: 3,              // 3x scaling factor
                    height: 10,            // Bar height, in millimeters
                    includetext: true,     // Include text in the barcode
                    textxalign: 'center',  // Center-align text
                });
        
                barcodeDataUrl = canvas.toDataURL("image/png"); // Convert canvas to data URL
            } catch (error) {
                console.error('Barcode generation failed:', error);
                // Consider handling the failure case, possibly with a fallback or a message
            }
        
            const tableColumn = ["Field", "Value"];
            const tableRows = [];
        
            // Extract data from formData to populate the table
            Object.entries(formData).forEach(([key, value]) => {
                const field = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
                const rowData = [field, value];
                tableRows.push(rowData);
            });
        
            // Additional data from itemData
            tableRows.push(["Price", `${itemData.donationAmount} ${itemData.coinName}`]);
            tableRows.push(["Details", `${itemData.details}`]);
            tableRows.push(["Serial Number", serialNumber]);
            tableRows.push(["Date", formattedDate]);  // Add formatted date
            tableRows.push(["Time", formattedTime]);  // Add formatted time
        
            // Title of the document
            doc.text("Billing Information", 14, 15);
            // Adding the table to the PDF
            autoTable(doc, {
                head: [tableColumn],
                body: tableRows,
                startY: 40,
            });
        
            // If barcode is generated, position it at the top right
            if (barcodeDataUrl) {
              // Assuming the width of your barcode is about 50mm (adjust as necessary)
              const pageWidth = 210;  // A4 width in mm
              const barcodeWidth = 50;  // Width in mm
              const marginRight = 10;  // Right margin in mm
              const marginTop = 10;    // Top margin in mm
              doc.addImage(barcodeDataUrl, 'PNG', pageWidth - marginRight - barcodeWidth, marginTop, barcodeWidth, 20); // Height adjusted to 20mm
          }
          
        // Generate a Blob from the PDF
      const pdfBlob = doc.output("blob");
  
      try {
          const pdfUrl = URL.createObjectURL(pdfBlob);
          setshowPurchaseDialog(true);
          //setShowBillDialog(true);
          setBillPdfUrl(pdfUrl);
      } catch (error) {
          console.error('Error creating Blob URL:', error);
      }
  };
            const downloadPDF = () => {
              console.log("Preparing to display bill...");
              
              generatePDF(formData, itemData);
              
          };
          const handlePreviewBill = async () => {
            setShowBillDialog(true);
            await generatePDF(formData, itemData); // Generate PDF and set URL
        };
          const handleCancel = () => {
            setShowConfirmationDialog(false);  // Close dialog on cancel
            setShowBillDialog(false);
            onClose();  // Also close the main dialog
            setOpen2(false);
            };
          
          
            return (
              <>
               <Dialog
               disableScrollLock={true}
    open={open}
    onClose={onClose}
    aria-labelledby="billing-dialog-title"
    maxWidth="sm"
    fullWidth={true}
  >
    <DialogTitle id="billing-dialog-title">{t("Billing Information")}</DialogTitle>
    <DialogContent>
      <Typography variant="body1" sx={{color:(theme) => theme.custom.mainButton}}>
        {t("Please enter your billing information below:")}
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      
      {["name", "surname", "phoneNumber", "email", "postcode", "address1", "address2", "serialNumber"].map((item) => (
        <TextField
          key={item}
          margin="dense"
          label={`${item.charAt(0).toUpperCase() + item.slice(1).replace(/([A-Z])/g, ' $1').trim()}${["address2"].includes(item) ? "" : ""}`}
          type={item === "phoneNumber" ? "number" : "text"}  // Set type to "number" for phoneNumber
          fullWidth
          name={item}
          value={formData[item]}
          onChange={handleChange}
          required={!["address2"].includes(item)} // address2 is optional
          error={error?.includes(item) && !formData[item]?.trim()}
          helperText={error?.includes(item) && !formData[item]?.trim() ? "This field is required" : ""}
          inputProps={{
            inputMode: item === "phoneNumber" ? "numeric" : "text",
            pattern: item === "phoneNumber" ? "[0-9]*" : undefined,
            min: item === "phoneNumber" ? "0" : undefined,
            style: {
              // Hide arrows in most browsers
              MozAppearance: item === "phoneNumber" ? 'textfield' : undefined,
              WebkitAppearance: item === "phoneNumber" ? 'none' : undefined,
              appearance: item === "phoneNumber" ? 'none' : undefined,
              margin: 0
            }
          }}
          sx={item === "phoneNumber" ? {
            // Hide arrows in Chrome/Safari
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            },
            // Hide arrows in Firefox
            '& input[type=number]': {
              MozAppearance: 'textfield'
            }
          } : undefined}
        />
      ))}
    </DialogContent>
    <br />
    <Box textAlign="center" justifyContent="space-around" display="flex" width="100%">
      <Button onClick={onClose} sx={{color:(theme) => theme.custom.mainButton}}>{t("Cancel")}</Button>
      <Button 
        onClick={handleBuy} 
        color="secondary" 
        variant="contained" 
        sx={{background:(theme) => theme.custom.mainButton,color:"white" }}
        disabled={Object.keys(formData).some(key => 
          !["address2"].includes(key) && !formData[key]?.trim()
        )}
      >
        {t("Buy Now")}
      </Button>
    </Box>
    <br />
  </Dialog>
                
                <Dialog disableScrollLock={true} open={showConfirmationDialog} onClose={() => {}} aria-labelledby="successed-dialog-title" maxWidth="sm" fullWidth={true}>
                    <DialogTitle id="successed-dialog-title" align="center" sx={{fontSize:"20px" ,color:(theme) => theme.custom.mainButton}}>{t("successed Purchase")}</DialogTitle>
                    <DialogContent>
                        <Typography variant="body1"> {t("Your purchase was successful. You can download your bill now.")}</Typography>
                        <Box textAlign="center" mt={2}>
                            <Button onClick={downloadPDF} color="secondary" variant="contained" sx={{background:(theme) => theme.custom.mainButton,color:"white" }}>{t("Download Bill")}</Button>
                            <Button onClick={handleCancel} sx={{color:(theme) => theme.custom.mainButton}}>{t("Cancel")}</Button>
                        </Box>
                    </DialogContent>
                </Dialog>
        
                <Dialog open={showPurchaseDialog} onClose={() => {}} aria-labelledby="bill-dialog-title" maxWidth="sm" fullWidth={true}>
              <DialogTitle id="bill-dialog-title">{t("Bill Preview")}</DialogTitle>
              <DialogContent>
              <Typography variant="h6" component="h2" id="successed-dialog-title" gutterBottom align="center" sx={{fontSize:"20px" ,color:(theme) => theme.custom.mainButton}}> 
              {t("Successful Purchase")}
              </Typography>
              <Typography variant="body1" gutterBottom align="center">
              {t("Your purchase was successful. You can view your bill below:")}
              </Typography>
              <Box textAlign="center" mt={2}>
              <Button onClick={handlePreviewBill}  variant="contained" sx={{backgroundColor:(theme) => theme.custom.mainButton,color:"white" ,"&:hover":{
                backgroundColor:"rgb(99, 0, 96)"
              } }}>{t("View Bill now")}</Button>
              </Box>
              </DialogContent>
              </Dialog>
  
              <Dialog 
          open={showBillDialog} 
          disableScrollLock={true}
          onClose={() => {}}
          aria-labelledby="bill-dialog-title" 
          maxWidth="sm" 
          fullWidth={true}
            >
             <DialogContent>
              <iframe src={billPdfUrl} style={{ width: '100%', height: '500px', border: 'none' }} title="Bill Preview"></iframe>
              </DialogContent>
              <br />
              <Box textAlign="center" mt={2}>
                  <Button onClick={handleCancel} sx={{background:(theme) => theme.custom.mainButton,color:"white`"}}>{t("Close")}</Button>
                  </Box>
                  <br />
                  
          </Dialog>
  
         
                </>
            );
        }


