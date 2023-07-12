import { Autoplay, EffectFade } from 'swiper/modules';

export interface MainSwiperOptions {
  spaceBetween: number;
  effect: string;
  loop: boolean;
  grabCursor: boolean;
  autoplay: { delay: number; disableOnInteraction: boolean };
  modules: (typeof Autoplay | typeof EffectFade)[];
}

export interface RecommendSwiperOptions {
  spaceBetween: number;
  slidesPerView: number;
  grabCursor: boolean;
  loop: boolean;
}
