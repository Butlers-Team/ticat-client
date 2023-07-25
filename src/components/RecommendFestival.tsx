import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  /**2023.07.11 error image 기본이미지로 교체 - by mscojl24 */
  const handleImageError = (index: number) => {
    setImageErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };

  const routingDetailPage = (cardId: string) => {
    navigate(`/detail/${cardId}`);
    window.location.reload();

    /**  기존의 <RecommendCard href={card.festivalId.toString()}> 코드의 경우
     * main 에서 라우팅할때 detail 페이지로 라우팅하지 못하는 bug 발생.
     * navigate 함수로 변경 후 같은 detail 경로에서 param 만 변경하니
     * 새로고침이 되지않는 현상이 발견되어 임의로 새로고침이 가능하도록 구현.
     * 차후 임의로 수정해주시기 바랍니다. -by mscojl24 */
  };

  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {fastivaldata.map((card, index) => (
          <SwiperSlide key={card.festivalId}>
            <RecommendCard
              onClick={() => {
                routingDetailPage(`${card.festivalId}`);
              }}>
              <div className="card-image">
                {imageErrors[index] ? (
                  <img src="/assets/images/ticat-cover-image.png" alt="fastival image" />
                ) : (
                  <img src={card.image} onError={() => handleImageError(index)} alt="fastival image" />
                )}
              </div>
              <div className="card-text">
                <div>{card.title}</div>
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
    div {
      max-width: 100%;
      font-size: 1.6rem;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    p {
      margin-top: 3px;
      font-size: 1.2rem;
    }
  }
`;
