//react
import React from 'react';
//style
import styled from 'styled-components';
import 'swiper/css';

//type
import { blogSwiperOptions } from 'types/swiper/swiperOptions';
import { ApiBlogPostsResponse } from 'types/api';

// Import Swiper
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

//utils
import sanitizeHtml from 'sanitize-html';
import { SanitizeHtmlOptions } from 'types/festival/festivalInfo';
import { formatDate } from '@utils/formatDate';

interface Props {
  BlogPosts: ApiBlogPostsResponse;
}

/** 2023/07/21 - Blog 게시글 슬라이드 - by leekoby */
const BlogSwiper: React.FC<Props> = ({ BlogPosts }) => {
  if (!BlogPosts) return null;

  /** 2023.07.05 추천 축제 배너 옵션 - by mscojl24 */
  const swiperOptions: blogSwiperOptions = {
    modules: [Autoplay],
    spaceBetween: 10,
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 3000, // 각 슬라이드 간의 딜레이 (밀리초 단위)
      disableOnInteraction: false, // 사용자 인터랙션 후에도 자동 슬라이드 유지
    },
  };

  const safelySanitizeHtml = (htmlString: string): string => {
    const sanitizeOptions: SanitizeHtmlOptions = {
      allowedTags: ['b'], //작성된 태그만 허용하도록 설정
      allowedAttributes: {}, // 위의 태그 제외 모든 속성 허용하지않음
    };

    return sanitizeHtml(htmlString, sanitizeOptions);
  };

  const redirectToBlog = (link: string) => {
    window.open(link);
  };
  return (
    <>
      <Swiper {...swiperOptions} className="mySwiper">
        {BlogPosts.map((post, index) => (
          <SwiperSlide key={`card-${index + 1}`}>
            <BlogCard onClick={() => redirectToBlog(post.link)}>
              <div className="card-text">
                <h3 dangerouslySetInnerHTML={{ __html: safelySanitizeHtml(post.title) }}></h3>

                <PostInfo>
                  <span>{post.bloggername}</span>
                  <span>{formatDate(post.postdate)}</span>
                </PostInfo>
                <div className="show-btn">블로그 후기보기</div>
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
  position: relative;
  background: #1e9cf9;
  color: #fff;
  padding: 1.8rem;
  border-radius: 10px;

  .card-text {
    min-height: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;

    .show-btn {
      position: absolute;
      bottom: 1.8rem;
      right: 1.8rem;
      padding: 3px 10px;
      background-color: #fff;
      color: var(--color-main);
      border-radius: 50px;
      font-size: 1.3rem;
      font-weight: 700;
    }
    h3 {
      width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 2rem;
      font-weight: 500;
    }
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: calc(100% - 150px);
      font-size: 1.3rem;
      margin-top: -2px;
    }
  }
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
`;
