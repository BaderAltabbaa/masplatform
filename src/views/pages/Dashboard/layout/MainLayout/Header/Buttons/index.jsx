import { Box, Button, Dialog, DialogContent, DialogContentText, IconButton, Typography, Container, Input, InputAdornment, } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AiFillSetting } from 'react-icons/ai';
import { isMobile } from "react-device-detect";
import { makeStyles } from "@mui/styles";
import { UserContext } from "src/context/User";
import CopyToClipboard from 'react-copy-to-clipboard';
import { VerifyOtp } from "src/component/Modals/VerifyOtp";
import { tokensDetails, websiteName } from "src/constants";
import BalanceBox from "src/component/ui/BalanceBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    profilebg: {
        boxShadow: " 0 1.5px 3px 0 rgba(0, 0, 0, 0.16)",
        backgroundImage: " linear-gradient(to bottom, #c04848, #480048)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100%",
        backgroundPosition: "center center",
        height: " 95px",
        width: "100%",
        position: "relative",
    },
    profileText: {
        "& h3": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "25px",
            fontWeight: "500",
            color: "#000",
            [theme.breakpoints.down("xs")]: {
                fontSize: "18px",
            },
        },
        "& a": {
            fontSize: "16px",
            fontWeight: "700",
            color: "#707070",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            [theme.breakpoints.down("xs")]: {
                justifyContent: "flex-start",
            },
            "& svg": {
                paddingRight: "5px",
            },
        },
        "& p": {
            fontSize: "12px",
            fontWeight: "500",
            color: "#444",
            marginTop: "6px",
        },
    },
    masBox: {
        backdropFilter: " blur(15px)",
        border: "solid 0.5px #c6cacf",
        backgroundColor: "#fff",
        padding: "10px",
        "& ul": {
            display: "flex",
            padding: "0",
            justifyContent: "center",
            "& li": {
                display: "flex",
                justifyContent: "center",
                position: "relative",
                "&::after": {
                    content: " ''",
                    position: "absolute",
                    height: "70%",
                    width: "1px",
                    backgroundColor: "#e5e3dd",
                    right: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                },
                "&:last-child::after": {
                    display: "none",
                },
            },
        },
    },
    masBox1: {
        backdropFilter: " blur(15px)",
        border: "solid 0.5px #c6cacf",
        backgroundColor: "#fff",
        padding: "10px",
        marginLeft: "-10px",
        "& ul": {
            display: "flex",
            padding: "0",
            justifyContent: "center",
            "& li": {
                display: "flex",
                justifyContent: "center",
                position: "relative",
                "&::after": {
                    content: " ''",
                    position: "absolute",
                    height: "70%",
                    width: "1px",
                    backgroundColor: "#e5e3dd",
                    right: "0",
                    top: "50%",
                    transform: "translateY(-50%)",
                },
                "&:last-child::after": {
                    display: "none",
                },
            },
        },
    },
    masBoxFlex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: "32px",
        "& button": {
            height: "30px",
            fontSize: "12px",
        },
        "@media(max-width:600px)": {
            marginTop: "0",
        },
    },
    dialogTitle: {
        textAlign: "Center",
        "& h2": {
            color: "#141518",
            fontSize: "23px",
        },
    },
    tokenList: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "7px",
        border: "solid 0.5px #e5e3dd;",
        "&:hover": {
            backgroundColor: "rgba(209, 91, 91, 0.39)",
        },
        "&.active": {
            backgroundColor: "rgba(209, 91, 91, 0.39)",
        },
        "& h3": {
            color: "#141518",
            fontSize: "14px",
        },
    },
    input_fild2: {
        width: "100%",
        "& input": {
            height: "45px",
        },
    },
    dilogBody: {
        paddingBottom: "30px",
        position: "relative",
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
    dilogBody2: {
        boxShadow: "0 1.5px 3px 0 rgb(0 0 0 / 16%)",
        backgroundImage: "linear-gradient(to bottom, #c04848, #480048)",
        borderRadius: "50px",
        overflow: "hidden",
    },
    dilogBody3: {
        backgroundColor: "#101010",
    },
    table: {
        "& th": {
            color: "#fff",
        },
        "& td": {
            color: "#fff",
        },
    },
    input_fild: {
        backgroundColor: "#ffffff6e",

        border: " solid 0.5px #e5e3dd",
        color: "#141518",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        borderRadius: "20px",
        "&:hover": {
            "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
            },
        },
        "& .MuiInputBase-input": {
            color: "#141518",
            height: "34px",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            borderWidth: 0,
        },
    },
    userno: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& svg": {
            paddingRight: "5px",
        },
    },

    walletActions: {
        display: "flex",
        marginBottom: "20px",
        "& button": {
            margin: '10px'
        },
        "@media(max-width:600px)": {
            order: "0",
            width: " 100%",
            justifyContent: "space-between",
        },
    },
    textbox: {
        "@media(max-width:600px)": {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: 'center'
        },
        "& h3": {
            "@media(max-width:600px)": {
                width: "100%",
                textAlign: "center",
            },
        },
        "& h5": {
            "@media(max-width:600px)": {
                width: "100%",
                textAlign: "center",
            },
        },
        "& button": {
            "@media(max-width:600px)": {
                width: "100%",
                textAlign: "center",
            },
        },
    },
    title: {
        border: "1px solid #DDD",
        borderRadius: "15px",
        padding: "4px 10px"
    },
}));

const Buttons = () => {
    const [openDeposit, setOpenDeposit] = useState(false);
    const [openWihdraw, setOpenWithdraw] = useState(false);
     const [withdrawAmount, setWithdrawAmount] = useState(0);
      const [withdrawFees, setWithdrawFees] = useState();
      const [withdrawAddress, setWithdrawAddress] = useState("");
      const [loader, setloader] = useState(false);
      const [withdrawError, setWithdrawError] = useState("");
      const [withdrawTx, setWithdrawTx] = useState("");
      const [verifyOTPOpen, setVerifyOTPOpen] = useState(false);
      const [availableBalance, setAvailableBalance] = useState({});
        const [totalEarning, setTotalEarning] = useState({});
          const [selectedToken, setSelectedToken] = useState(tokensDetails[0]);
        
    const classes = useStyles();

    const user = useContext(UserContext);

    if (user.isLogin && !user.userData) {
        user.updateUserData();
      }
    
      useEffect(() => {
        let timer1;
        function checkechecko() {
          if (user.isLogin && user.userData._id) {
            return () => {
              clearTimeout(timer1);
            };
          } else {
            timer1 = setTimeout(() => {
              checkechecko()
            }, 200);
          }
        }
        checkechecko()
      }, []);
    
      useEffect(() => {
        setAvailableBalance({
          masBalance: parseFloat(user.userData?.masBalance),
          fdusdBalance: parseFloat(user.userData?.fdusdBalance),
          usdtBalance: parseFloat(user.userData?.usdtBalance),
        });
    
      }, [user.userData])
    
      useEffect(() => {
        setTotalEarning({
          masBalance: parseFloat(user.userEarnings?.masBalance) + parseFloat(user.userEarnings?.referralBalance),
          fdusdBalance: parseFloat(user.userEarnings?.fdusdBalance),
          usdtBalance: parseFloat(user.userEarnings?.usdtBalance),
        });
    
      }, [user.userEarnings])
    
      React.useMemo(() => {
        setWithdrawFees(((parseFloat(user.userData?.withdrawFees) * parseFloat(withdrawAmount) / 100)).toFixed(2));
      }, [withdrawAmount]);
    
      const MAxWithdrawAmount = () => {
        setWithdrawAmount((availableBalance[selectedToken.databaseKey] - availableBalance[selectedToken.databaseKey] * parseFloat(user.userData?.withdrawFees) / 100).toFixed(2));
      }
    
      const withdraw = async () => {
    
        if (withdrawAmount === "") {
          setWithdrawError("Please enter Amount");
        } else if (withdrawAmount < 1) {
          setWithdrawError("Please enter valid amount (equal or greater than 1)");
        } else if (
          parseFloat(withdrawAmount) + parseFloat(withdrawFees) >= parseFloat(user.userData[selectedToken.databaseKey])
        ) {
          setWithdrawError(`${selectedToken.name} balance is low`);
        } else if (withdrawAddress === "") {
          setWithdrawError("Please enter Wallet Address");
        } else {
          setloader(true);
          axios({
            method: "POST",
            url: Apiconfigs.withdraw,
            headers: {
              token: sessionStorage.getItem("token"),
            },
            data: {
              recipientAddress: withdrawAddress,
              withdrawAmount: withdrawAmount,
              coin: selectedToken?.name,
            },
          })
            .then(async (res) => {
              await user.updateUserData();
              if (res.data.statusCode === 201) {
                setloader(false);
                setWithdrawTx(res.data.result.txid);
                setOpenWithdraw(false);
                setVerifyOTPOpen(true);
              } else {
                setWithdrawError("Something went wrong!");
                setloader(false);
              }
            })
            .catch((err) => {
              setWithdrawError("Something went wrong!");
              setloader(false);
            });
        }
      };
    
      const handleCloseDepositModal = () => {
        setOpenDeposit(false);
      };
      const handleCloseWithdrawModal = () => {
        setOpenWithdraw(false);
      };
   
    
      const profilePageURL = websiteName + "/user-profile/" + user?.userData?.userName;
    return (

        <>
            <Box

            >
                <Button

                    variant="contained"
                    size="large"
                    color=""
                    style={{ width: "40%", fontSize: "15px", marginRight: "15px",background:"rgb(140, 0, 135)",color:"white" }}
                    onClick={() => setOpenDeposit(true)}
                >
                    Deposit
                </Button>
                <Button
                    variant="contained"
                    style={{ width: "40%", fontSize: "15px",background:"#8c0087",color:"white" }}
                    size="large"
                    color="secondary"
                    onClick={() => setOpenWithdraw(true)}
                >
                    Withdraw
                </Button>

            </Box>
            <Dialog
                open={openDeposit}
                fullWidth="sm"
                maxWidth="sm"
                onClose={handleCloseDepositModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                style={isMobile ? { height: "70%" } : { heihgt: "100%" }}
            >
                <DialogContent className={classes.dilogBody}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                            variant="h3"
                            align="center"
                            style={{ color: "#792034", margiBottom: "10px" }}
                        >
                            Deposit
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            style={{ color: "#792034", margiBottom: "10px" }}
                        >
                            Please make sure you use BSC (BNB Smart Chain) and send only supperted tokens (MAS, USDT, BUSD)
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            style={{ color: "#000" }}
                        ></Typography>
                        <Container maxWidth="md">
                            <Box mt={4}>
                                <Input
                                    value={user.userData?.ethAccount?.address}
                                    placeholder="Wallet Address"
                                    className={classes.input_fild2}
                                    startAdornment={
                                        <InputAdornment position="end">
                                            <CopyToClipboard text={user.userData?.ethAccount?.address}>
                                                <Button onClick={() => toast.info("Copied")}>
                                                    COPY
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
                                    onClick={() => setOpenDeposit(false)}
                                    style={{  fontSize: "15px",background:"#8c0087",color:"white" }}
                                >
                                    Close
                                </Button>
                            </Box>

                        </Container>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <VerifyOtp
                open={verifyOTPOpen}
                handleClose={() => setVerifyOTPOpen(false)}
                channels={['email']}
                context={'withdraw'}
                emailVerificationSent={false}
                smsVerificationSent={false}
                payload={withdrawTx}
                successCallback={() => {
                    setVerifyOTPOpen(false);
                    toast.success("Withdrawal successful!");
                }}
            />

            <Dialog
                open={openWihdraw}
                fullWidth="sm"
                maxWidth="sm"
                onClose={handleCloseWithdrawModal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                disableBackdropClick={loader}
                disableEscapeKeyDown={loader}
                style={isMobile ? { height: "70%" } : { height: "100%" }}
            >
                <DialogContent className={classes.dilogBody}>
                    <DialogContentText id="alert-dialog-description">
                        <Typography
                            variant="h5"
                            align="center"
                            style={{ color: "#792034", margiBottom: "10px" }}
                        >
                            Withdraw
                        </Typography>
                        <Typography
                            variant="body2"
                            align="center"
                            style={{ color: "#000" }}
                        >
                            <>
                                Please make sure the Wallet address is BEP20 <br />
                                (Transaction will be sent in BSC Network)
                            </>
                        </Typography>
                        <BalanceBox
                            availableBalance={availableBalance}
                            tokensDetails={tokensDetails}
                            setSelectedToken={setSelectedToken}
                        />
                        <Container maxWidth="md">
                            <Box mt={4}>
                                <Input
                                    placeholder="Wallet Address"
                                    value={withdrawAddress}
                                    className={classes.input_fild2}
                                    onChange={(e) => setWithdrawAddress(e.target.value)}

                                />
                            </Box>
                            <Box mt={4}>
                                <Input
                                    value={withdrawAmount}
                                    placeholder={"Minimum amount 10 " + selectedToken?.name?.toString()}
                                    className={classes.input_fild2}
                                    type="number"
                                    min={10}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    endAdornment={
                                        <InputAdornment
                                            position="end"
                                            onClick={() => setOpenSelectToken(true)}
                                        >

                                            <Box style={{ cursor: "pointer" }}>
                                                <img src={selectedToken?.img} alt="" width="20px" />
                                                <ArrowDropDownIcon style={{ cursor: "pointer" }} />
                                            </Box>

                                        </InputAdornment>
                                    }
                                />
                                <Typography
                                    variant="body2"
                                    align="left"
                                    style={{ color: "#000" }}
                                >
                                    <span onClick={() => MAxWithdrawAmount()} >
                                        Available: {availableBalance[selectedToken.databaseKey]?.toFixed(2)} {selectedToken.name}
                                    </span>
                                </Typography>

                            </Box>

                            <Box mt={2} mb={4}>
                                <Typography
                                    variant="body2"
                                    align="left"
                                    style={{ color: "#000" }}
                                >
                                    <span>Withdraw fees: {withdrawAmount ? <span>{withdrawFees} {selectedToken.name}</span> : user.userData?.withdrawFees + "%"} </span>
                                    <br />
                                    {withdrawAmount ?
                                        <strong>Amount + Fees: {parseFloat(withdrawAmount) + parseFloat(withdrawFees)} {selectedToken.name}</strong> : ""
                                    }
                                </Typography>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color=""
                                    style={{ marginTop:"15px",fontSize: "15px",background:" #8c0087",color:"white" }}

                                    onClick={withdraw}
                                    disabled={loader || !withdrawAmount || !selectedToken}
                                >
                                    {loader ? "Pending..." : `Withdraw`}
                                    {loader && <ButtonCircularProgress />}
                                </Button>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    style={{ color: "#f22" }}
                                >
                                    <span>{withdrawError}</span>
                                </Typography>

                            </Box>
                        </Container>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>

    )
}

export default Buttons
