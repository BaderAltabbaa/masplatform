import "./AboutUs.css";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import DoCard from "./cards/DoCard";
import VisionCard from "./cards/VisionCard";
import ChooseCard from "./cards/ChooseCard";
import ContactUs from "./ContactUs";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function AboutUs() {

    const { t } = useTranslation(); 

    const { ref: ref1,inView: inView1 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
      });

    const { ref: ref2,inView: inView2 } = useInView({
        threshold: 0.2, 
        triggerOnce: true,
      });
    
      const { ref: ref3,inView: inView3 } = useInView({
        threshold: 0.2, 
        triggerOnce: true, 
      }); 


      const weDoContent = [
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/mobile_app.webp' },
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/bt-altyapi-donusumu-basari-metodolojisi-601x520-removebg-preview.webp' },
        { title: "Lorem ipsum dolor sit amet", desc: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, nisl nisl aliquam nisl, eget ultricies nisl nisl eget nisl.", src: '/assets/Images/—Pngtree—business professional analyzing stock market_20116370.png' },
      ];

      const [isExpanded , setIsExpanded] = useState(false);
      const [isExpanded2 , setIsExpanded2] = useState(false);

    
return(
    <>
    <div style={{background:"linear-gradient(to right,#280026,#4a004f)"}}>
    <div style={{display:"flex" ,flexDirection:"column" ,alignItems:"center", justifyContent:"center" ,padding:"25px" ,overflow: "hidden"}}   className="bunner-animaton">
   
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'flex' ,transform:" scale(0.7)"  }}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white",
      }}
    >
       About Us
      </div>
    </div>

    </div>

    <div className="who-we-are-sec">
      <div className={`who-top-sec ${inView2 ? 'animate' : ''}`} ref={ref2}>
      <span className="who-title">WHO WE ARE</span>
      <span className="who-text1">Delivering IT solutions that enable you to work smarter.</span>
      <span className="who-text2">IT can streamline processes, enhance efficiency, and facilitate communication, making tasks and operations easier and more effective.</span>
     <Link to="/login"> <button className="learn-btn">Learn More</button></Link>
        </div>
        
        <div className={`who-bottom-sec ${inView3 ? 'animate' : ''}`} ref={ref3} >
          <img className='small-screen' src="/assets/Images/28.jpg" alt="" />
          <img className='big-screen' src="/assets/Images/28.jpg" alt="" />
        </div>
      </div>

      <div className="we-do-sec">
<div className="we-do-content">
<span className='we-do-title'>What We Do</span>
<span className='we-do-text'>Let us change the way you think about technology.</span>
<div className="cards" ref={ref1}>
<div  className={`card-container ${inView1 ? 'animate' : ''}`}>
{weDoContent.map((props) => (
          <DoCard title={props.title} desc={props.desc} src={props.src}/>
        ) )}
</div>
    </div>
    </div>
        </div>


        <div className="how-it-work-sec" style={{
          marginTop: isExpanded? '50px' : '100px'
        }}>


<div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'flex',transform:" scale(0.7)"   }}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white",
      }}
    >

      <span className='how-title' onClick={() => setIsExpanded(!isExpanded)} style={{cursor:"pointer"}}>
        Our Vision  {isExpanded ? '−' : '+'} 
        </span>
</div>
</div>

        {isExpanded && (
          <>
      <span className='how-decs'>Discover our streamlined approach to boost your brand’s success through innovative strategies and advanced technologies</span>
      <div className="how-card">
        <VisionCard></VisionCard>
      </div> </> )}
  
  
     </div>


     <div className="choose-us-sec">
        <span className='choose-title'>Why Choose Us</span>
        <span className='choose-desc'>Let us change the way you think about technology.</span>
      <div className="choose-card">
        <ChooseCard></ChooseCard>
      </div>
     </div>


     <div className="how-it-work-sec" style={{
          marginTop: isExpanded2? '50px' : '100px'
        }}>


<div style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src="/assets/Images/wave10.png" 
        alt="Description" 
        style={{ display: 'flex' ,transform:" scale(0.7)"  }}
      />
      <div style={{
         position: 'absolute',
         top: '50%',
         left: '50%',
         transform: 'translate(-50%, -50%)',
         color: 'white',
         fontSize: '2.5rem',
          fontWeight:"bold",
         textShadow:"0px 0px 10px white",
      }}
    >

      <span className='how-title' onClick={() => setIsExpanded2(!isExpanded2)} style={{cursor:"pointer"}}>
        Our Mission  {isExpanded2 ? '−' : '+'} 
        </span>
</div>
</div>

        {isExpanded2 && (
          <>
      <span className='how-decs'>Discover our streamlined approach to boost your brand’s success through innovative strategies and advanced technologies</span>
      <div className="how-card">
        <VisionCard></VisionCard>
      </div> </> )}
  
  
     </div>


    


<ContactUs/>


    </div>
    </>
)


}