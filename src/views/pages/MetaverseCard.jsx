import React from 'react'
import { Card } from "@mui/material/";
import { makeStyles } from '@mui/styles';

import "./style.css";
import { color } from 'framer-motion';
export default function MetaverseCard({ data, key }) {
    const useStyles = makeStyles((theme) => ({
        main: {
            padding: "10px 10px 15px 10px",
            borderRadius: "10px",
            width: "300px",
            height: "50vh",
            margin: "12px",
            overflow: "hidden",

        },
        imgParent: {
            width: "100%",
            height: "77%!important",
            cursor: "pointer",
            overflow: "hidden",
            "&:hover": {
                "& img": {
                    transform: "scale(1.03 ,1.03 )"
                },
            },
            "& img": {
                transition: ".2s all linear",
                // borderTopRightRadius: "10px",
                // borderTopLeftRadius: "10px",
                width: "100%",
                height: "100%",


            },
        },
        nameSpec: {
            width: "100%",
            padding: "15px",
            background: "transparent",
            "& div": {
                textAlign: "center",
                fontSize: "16px",
                color:"white"
            },
        },
    }))
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.main} sx={{background: (theme) => theme.custom.CarBackGround}}>
                <div className={classes.imgParent}>
                    <img src={data} />
                </div>
                <div className={classes.nameSpec}>
                    <div>Game 01</div>
                    <div>Version: 3.2</div>
                </div>
            </Card>
        </div >
    )
}
