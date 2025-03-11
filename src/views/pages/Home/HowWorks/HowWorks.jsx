import React from 'react'
import Typography from '../../../../component/ui/typography/typography'
import './HowWorks.css'

const HowWorks = ({title,description,contents,img}) => {

  return (
 <div className='HowWorks'>
   

     
      <div className="HowWorks-content ">
        <Typography className='headTitle' >{title} </Typography>
        <h2 className="HowWorks-subtitle">{description}</h2>
        {contents.map((content) => {
          return (
         <>
            <h2 className="HowWorks-section-title">{content.heading}</h2>
            <p className="HowWorks-text">{content.contentDescription}</p>
         </>
          )
        }
        )}
     

      


  
      </div>


      <div className="HowWorks-image-container">
        <img src={'assets/Images/22.jpg'} alt="How Works" className="HowWorks-image" />
      </div>
 </div>
  )
}

export default HowWorks
