import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { styled } from '@tanstack/react-query-devtools/build/lib/utils';

interface Options {
  spaceBetween: number;
  slidesPerView: number;
}

const RecommendFestival = () => {
  const swiperOptions: Options = {
    spaceBetween: 20,
    slidesPerView: 3,
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        <SwiperSlide>
          <RecommendCard>
          </RecommendCard>
        </SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
      </Swiper>
    </>
  );
};

export default RecommendFestival;

const RecommendCard = styled.
   