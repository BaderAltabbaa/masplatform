import React, { useRef, useEffect, useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import CardComponent from '../Card/CardCreators';
import './sectionCard.css';
import Cardbundle from '../Card/Cardbundle';
import CardMarketplace from '../Card/CardMarketplace';

const SectionCard = ({
    likesCount,
    subscrib,
    CardpersonalInfo,
    Subscribe,
    data,
    chat,
    Creators,
    Bundles,
    Marketplace
}) => {
    const carouselRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    // Handle left arrow click
    const handleScrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
        }
    };

    // Handle right arrow click
    const handleScrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
        }
    };

    // Automatic scrolling (disabled on mobile)
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isDragging && carouselRef.current) {
                handleScrollRight();
            }
        }, 2000); // Scroll every 2 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [isDragging]);

    // Touch event handlers
    const handleTouchStart = (e) => {
        setIsDragging(true);
        setStartX(e.touches[0].pageX); // Record the initial touch position
        setScrollLeft(carouselRef.current.scrollLeft); // Record the initial scroll position
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX; // Current touch position
        const walk = (x - startX) * 2; // Calculate the distance swiped (multiplied for faster scroll)
        carouselRef.current.scrollLeft = scrollLeft - walk; // Scroll the carousel
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
            {/* Left Arrow */}
            <button onClick={handleScrollLeft} className='prev-arrow'>
                <AiOutlineArrowLeft size={50} />
            </button>

            {/* Carousel Container */}
            <div
                ref={carouselRef}
                style={{
                    display: 'flex',
                    overflowX: 'auto', // Allow horizontal scrolling
                    scrollBehavior: 'smooth',
                    padding: '20px',
                    whiteSpace: 'nowrap',
                    cursor: isDragging ? 'grabbing' : 'grab', // Change cursor on drag
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {data.map((itemCard, index) => (
                    <div className='CardContainer' key={index}>
                        {Creators && (
                            <CardComponent
                                data={itemCard}
                                chat={chat}
                                subscrib={subscrib}
                                CardpersonalInfo={CardpersonalInfo}
                                Subscribe={Subscribe}
                            />
                        )}
                        {Bundles && (
                            <Cardbundle data={itemCard} />
                        )}
                        {Marketplace && (
                            <CardMarketplace data={itemCard} />
                        )}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button onClick={handleScrollRight} className='next-arrow'>
                <AiOutlineArrowRight size={50} />
            </button>
        </div>
    );
};

export default SectionCard;