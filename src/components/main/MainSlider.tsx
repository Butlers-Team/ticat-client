import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useState, useEffect } from 'react';

//type
import { MainSwiperOptions } from 'types/swiper/swiperOptions';
import { FestivalListType } from 'types/api/festival';
//icon
import { TiLocation } from 'react-icons/ti';
import { BiSun } from 'react-icons/bi';

//swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

//utils
import { truncatedText } from '@utils/truncatedText';
import { formatDate } from '@utils/formatDate';

interface BgImage {
  backqroundimage: string;
}

const RecommendFestival = () => {
  const [FestivalData, setFestivalData] = useState<FestivalListType[]>([]);

  /** 2023.07.05 데이터 요청 test 차후 인스턴스 사용예정 - by mscojl24 */
  useEffect(() => {
    axios
      .get(`https://a1fe-124-111-225-247.ngrok-free.app/festivals/banner`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': '69420',
        },
      })
      .then(res => {
        setFestivalData(res.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  /** 2023.07.05 main banner swiper options - by mscojl24 */
  const swiperOptions: MainSwiperOptions = {
    spaceBetween: 30,
    effect: 'fade',
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    modules: [Autoplay, EffectFade],
  };

  return (
    <Swiper {...swiperOptions} className="mySwiper">
      {FestivalData.map(festival => (
        <SwiperSlide key={festival.festivalId}>
          <SliderContainer backqroundimage={`url(${festival.image})`}>
            <div className="wather-info flex-all-center">
              <span>축제날씨</span>
              <span className="wather-icon flex-all-center">
                <BiSun />
              </span>
            </div>
            <div className="festival-info">
              <p>
                {formatDate(festival.eventstartdate)} - {formatDate(festival.eventenddate)}
              </p>
              <h2>{truncatedText(festival.title, 15)}</h2>
              <span>
                <TiLocation /> {festival.area}
              </span>
            </div>
          </SliderContainer>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendFestival;

const SliderContainer = styled.article<BgImage>`
  position: relative;
  background-image: linear-gradient(rgba(104, 104, 104, 0.6) 60%, rgba(0, 0, 0, 0.6)), ${props => props.backqroundimage};
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  height: 300px;
  font-size: 1.5rem;
  color: #fff;
  z-index: 1;
  text-shadow: 0px 0px 10px rgb(0, 0, 0, 0.3);

  &.bg-color {
    background-color: #ccc;
  }

  > .wather-info {
    position: absolute;
    top: 20px;
    right: 20px;

    .wather-icon {
      width: 30px;
      height: 30px;
      margin-left: 5px;
      font-size: 2.5rem;
    }
  }

  > .festival-info {
    width: 100%;
    position: absolute;
    bottom: 60px;
    left: 20px;

    > * {
      margin-bottom: 10px;
    }

    > h2 {
      font-size: 24px;
      font-weight: 700;
    }
  }
`;
