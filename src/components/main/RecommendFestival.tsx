import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

//type
import { RecommendSwiperOptions } from 'types/swiper/swiperOptions';
import { FestivalListType } from 'types/api/catergory';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const RecommendFestival: React.FC<FestivalListType[]> = fastivaldata => {
  /** 2023.07.05 recommend banner swiper options - by mscojl24 */
  const swiperOptions: RecommendSwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 2,
    grabCursor: true,
    loop: true,
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {fastivaldata.map((card, index) => (
          <SwiperSlide key={`card-${index + 1}`}>
            <RecommendCard>
              <div className="card-image"></div>
              <div className="card-text">
                <span>{card.title}</span>
                <p>{card.area}</p>
              </div>
            </RecommendCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default RecommendFestival;

const RecommendCard = styled.div`
  /* width: 180px;
  height: 200px; */
  color: var(--color-dark);

  .card-image {
    /* width: 100px; */
    height: 13rem;
    border-radius: 10px;
    background: var(--color-light-gray);
    margin-bottom: 10px;
  }

  .card-text {
    span {
      font-size: 1.5rem;
      font-weight: 700;
    }
    p {
      margin-top: 5px;
      font-size: 1.2rem;
    }
  }
`;
