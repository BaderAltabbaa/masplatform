import { Box, Typography } from '@mui/material'
import React from 'react'

export default function NoDataFound() {
  return (
    <Box align="center" mt={4} mb={5}>
      <Typography
        variant="h1"
        style={{
          color: '#43005e',
          marginBottom: '10px',
          padding: '10px',
          fontSize: '17px',
          backgroundColor:"#cdc8c8",
          borderRadius:"20px",
          margin:"0 50px"
        }}
      >
        NO DATA FOUND!
      </Typography>
      <img src="/images/nodata.png" style={{width:"180px"}} />
    </Box>
  )
}
