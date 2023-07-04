import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Options {
  spaceBetween: number;
  effect: string;
  navigation: boolean;
  pagination: { clickable: boolean };
  modules: (typeof EffectFade | typeof Navigation | typeof Pagination)[];
}

const RecommendFestival = () => {
  const swiperOptions: Options = {
    spaceBetween: 30,
    effect: 'fade',
    navigation: true,
    pagination: {
      clickable: true,
    },
    modules: [EffectFade, Navigation, Pagination],
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
        <SwiperSlide></SwiperSlide>
      </Swiper>
    </>
  );
};

export default RecommendFestival;
