import React from "react";
import { useInView } from "react-intersection-observer";
import "./ContactUs.css";
import { ButtonwithAnimation } from "../../../component/ui/Button/button";


export default function ContactUs() {

    const cardData = [
        {
          id: 1,
          iconClass: "fa-solid fa-location-pin",
          title: "Head Office",
          desc: "istanbul-fatih akdeniz cd. no.61 TÜRKİYE-İSTANBUL",
        },
        {
          id: 2,
          iconClass: "fa-solid fa-envelope",
          title: "Email Us",
          desc: "masdevelopment11@gmail.com",
        },
        {
          id: 3,
          iconClass: "fa-solid fa-phone",
          title: "Call us",
          desc: "Phone : +905365439850",
        },
        {
          id: 4,
          iconClass: "fa-solid fa-user",
          title: "Free Consultations",
          desc: "Phone : +905394955991",
        },
      ];
    
      const { ref: ref1, inView: inView1 } = useInView({
        threshold: 0.2,
        triggerOnce: true,
      });
    
      const { ref: ref2, inView: inView2 } = useInView({
        threshold: 0.2,
        triggerOnce: true,
      });


      return (
        <>
        <div style={{
            background:"linear-gradient(to right,#280026,#4a004f)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"20px 0"
        }}>
        <ButtonwithAnimation>Contact us</ButtonwithAnimation>
        </div>
        <div className="touch-sec">
        <div className={`touch-top ${inView1 ? "animate" : ""}`} ref={ref1}>
          <div className="t-top-1">
            <span>Get in touch</span>
            <span>Don't hesitate to contact us for more information.</span>
          </div>

          <div className="t-top-2">
            <span>Follow our social network</span>
            <div className="soical-cont">
              <a href="https://www.facebook.com/masmarkeating/">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="https://www.instagram.com/mas_digital_marketing/">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.tiktok.com/@masdigitalmarketing">
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="touch-bottom">
          <div className="contact-cards">
            {cardData.map((card, index) => {
              const { ref, inView } = useInView({
                threshold: 0.1,
                triggerOnce: true,
              });

              return (
                <div
                  ref={ref}
                  key={card.id}
                  className={`contact-card-body ${
                    index % 2 === 0 ? "direction-left" : "direction-right"
                  } ${inView ? "animate" : ""}`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <i className={card.iconClass}></i>
                  <span className="contact-title">{card.title}</span>
                  <span className="contact-desc">{card.desc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>       
        </>
      )

}