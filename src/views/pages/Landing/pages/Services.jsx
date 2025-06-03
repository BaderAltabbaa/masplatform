import React from 'react'
import BoxL from '../components/ui/Box'
import { IoLayersOutline } from "react-icons/io5";
import { GrTechnology } from "react-icons/gr";
import { BsSearchHeart } from "react-icons/bs";
import { PiHandHeartBold } from "react-icons/pi";
import { motion } from 'framer-motion';
import { fadeIn } from "../utils/Motion.js"
import { SectionWrapper } from '../hoc'
import { Box } from '@mui/material';



const Services = () => {
  const Service = [
    { icon: <IoLayersOutline />, title: "Bundles", descrption: "A bundle represents a set of content creations that the MAS intends to develop and for which needs funding" },
    { icon: <GrTechnology />, title: "Generic Donations", descrption: "Gitents will also be able to allocate funds to specific MAS as generic donations. supporting the content creators financial security" },
    { icon: <PiHandHeartBold />, title: "Matchmaking", descrption: "MAS will feature a matathimaking mechanism, where both clients and MAS will be able to celine preferences and what they are looking for" },
    { icon: <BsSearchHeart />, title: "Marketplace", descrption: "Every user can display and sell their physical products using the agency's amazing support platform ecosystem." },

  ]
  return (
    <Box className={` flex justify-center`} sx={{ pt: { xs: 0, md: 5 }, pb: 12 }}>
      <div className=' flex justify-center items-center gap-10 flex-wrap   '>
        {Service.map((Service, i) => (
          <motion.div initial="hidden"
            whileInView="show">

            <BoxL title={Service.title} descrption={Service.descrption} icon={Service.icon} />

          </motion.div>
        ))}



      </div>
    </Box>
  )
}
export default SectionWrapper(Services, "Services", "bg-gideient-rotate min-h-screen")

// export default Services
