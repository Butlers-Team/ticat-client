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

  function TruncatedTitle({ text, maxLength }: { text: string; maxLength: number }) {
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return <h3 dangerouslySetInnerHTML={{ __html: truncated }} />;
  }
  function TruncatedText({ text, maxLength }: { text: string; maxLength: number }) {
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    return <span dangerouslySetInnerHTML={{ __html: truncated }} />;
  }

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
  function randomPopularColor() {
    const randomIndex = Math.floor(Math.random() * popularColors.length);
    return popularColors[randomIndex];
  }
  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {BlogPosts.map((post, index) => (
          <SwiperSlide key={`card-${index + 1}`} style={{ backgroundColor: randomPopularColor() }}>
            <BlogCard>
              <div className="card-text">
                <TruncatedTitle text={post.title} maxLength={13} />
                <PostInfo>
                  <span>{truncatedText(post.bloggername, 13)}</span>
                  <span>{formatDate(post.postdate)}</span>
                </PostInfo>
                <TruncatedText text={post.description} maxLength={50} />
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
  margin-bottom: 2rem;
  width: 140px;
  height: 120px;
  color: var(--color-dark);
  padding: 0.5rem;
  .card-text {
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
