import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';

//type
import { RecommendSwiperOptions } from 'types/swiper/swiperOptions';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ApiBlogPostsResponse } from 'types/api';

//utils
import { truncatedText } from '@utils/truncatedText';
import { formatDate } from '@utils/formatDate';
import { Link } from 'react-router-dom';

interface Props {
  BlogPosts: ApiBlogPostsResponse;
}

/** 2023/07/21 - Blog 게시글 슬라이드 - by leekoby */
const BlogSwiper: React.FC<Props> = ({ BlogPosts }) => {
  if (!BlogPosts) return null;

  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);

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

  const TruncatedTitle = ({ text, maxLength }: { text: string; maxLength: number }) => {
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return <h3 dangerouslySetInnerHTML={{ __html: truncated }} />;
  };
  const TruncatedText = ({ text, maxLength }: { text: string; maxLength: number }) => {
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return <span dangerouslySetInnerHTML={{ __html: truncated }} />;
  };

  // 임시 배경색
  const popularColors = [
    '#f1c40f', // 노란색
    '#8e44ad', // 보라색
    '#3498db', // 파란
    '#16a085', // 녹색
    '#e74c3c', // 빨간색
    '#95a5a6', // 회색
  ];

  //랜덤 배경색 선택
  const randomPopularColor = () => {
    const randomIndex = Math.floor(Math.random() * popularColors.length);
    return popularColors[randomIndex];
  };

  const redirectToBlog = (link: string) => {
    window.open(link);
  };
  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {BlogPosts.map((post, index) => (
          <SwiperSlide key={`card-${index + 1}`} style={{ backgroundColor: randomPopularColor() }}>
            <BlogCard onClick={() => redirectToBlog(post.link)}>
              <div className="card-text">
                <TruncatedTitle text={post.title} maxLength={20} />
                <PostInfo>
                  <span>{truncatedText(post.bloggername, 10)}</span>
                  <span>{formatDate(post.postdate)}</span>
                </PostInfo>
              </div>
            </BlogCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default BlogSwiper;

const BlogCard = styled.section`
  color: var(--color-dark);
  padding: 0.5rem;
  min-height: 105px;
  .card-text {
    min-height: 100px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between; // 공간 조정
    h3 {
      font-size: 1.5rem;
      font-weight: bold;
    }
    span {
      font-size: 1.1rem;
    }
    p {
      margin-top: 5px;
      font-size: 1.2rem;
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
