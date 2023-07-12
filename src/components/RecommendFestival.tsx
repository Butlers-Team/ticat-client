import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

//type
import { RecommendSwiperOptions } from 'types/swiper/swiperOptions';
import { FestivalListType } from 'types/api/festival';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface RecommendFestivalProps {
  fastivaldata: FestivalListType[];
}

const RecommendFestival: React.FC<RecommendFestivalProps> = ({ fastivaldata }) => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [imageErrors, setImageErrors] = useState(Array(fastivaldata.length).fill(false));

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    // window width 값이 변화할때 배너 갯수 변경
    if (windowWidth >= 430) {
      setSlidesPerView(3);
    } else {
      setSlidesPerView(2);
    }
  }, [windowWidth]);

  /** 2023.07.05 추천 축제 배너 옵션 - by mscojl24 */
  const swiperOptions: RecommendSwiperOptions = {
    spaceBetween: 10,
    slidesPerView: slidesPerView,
    grabCursor: true,
    loop: true,
  };

  /**2023.07.11 배너 타이틀 길이 조정 함수 - by mscojl24 */
  const TitleCutLengt = (title: string) => {
    if (title.length >= 8) {
      return `${title.slice(0, 8)}...`;
    } else {
      return title;
    }
  };

  /**2023.07.11 배너 타이틀 길이 조정 함수 - by mscojl24 */
  const handleImageError = (index: number) => {
    setImageErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {fastivaldata.map((card, index) => (
          <SwiperSlide key={`card-${index + 1}`}>
            <RecommendCard>
              <div className="card-image">
                {imageErrors[index] ? (
                  <img src="/assets/images/ticat-cover-image.png" alt="fastival image" />
                ) : (
                  <img src={card.image} onError={() => handleImageError(index)} alt="fastival image" />
                )}
              </div>
              <div className="card-text">
                <span>{TitleCutLengt(card.title)}</span>
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
    overflow: hidden;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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
