
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaThumbsUp } from "react-icons/fa";
import { Box } from '@mui/material';


  

const BlogCard = ({ title, desc, date, id, activeIcon, onIconClick }) => {



const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

    return(
        <Box className="blog-center" >
        <Box
      ref={ref}
      className={`blog-card ${inView ? 'animate' : ''}`}
      sx={{background: (theme) => theme.custom.CarBackGround}}
    >
     <span className="blog-card-title">{title}</span>
     <p className="blog-card-desc">{desc}</p>
     <Box className="lower-blog">
     <span className='blog-card-date'>{date}</span>
     <Box className="blog-icons">
     <FaThumbsUp
              className={`${activeIcon === 'like' ? 'active' : ''}`}
              onClick={() => onIconClick(id, 'like')}
              style={{ color: activeIcon === 'like' ? '#9c9797' : '#c053ff', cursor: 'pointer' , fontSize:"25px"}}
            ></FaThumbsUp>
     
    

     </Box>
     </Box>
    </Box>
    </Box>
        
    )


}

export default BlogCard