import React from 'react'
import { Typography ,Box} from '@mui/material'

const BoxL = ({title,descrption,icon}) => {
  return (
    <Box sx={{background:(theme) => theme.custom.CarBackGround}} className='w-[330px] rounded-2xl transition-all shadow-md min-h-[380px] py-10 px-2 text-center flex flex-col gap-10 hover:border-2 border-[#8033a1]'>
      <div className='text-center  flex justify-center text-[70px] text-white'>{icon}</div>
     <Typography variant={"h4"} className='h-[50px]' sx={{fontSize:"30px",color:"white"}}>{title}</Typography>
     <Typography  className='text-white '>{descrption}</Typography>

    </Box>
  )
}

export default BoxL
