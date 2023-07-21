import styled from 'styled-components';
import { Link } from 'react-router-dom';

//component
import Festival from '@components/festival/Festival';

const data = [
  {
    festivalId: 2994708,
    status: 'PLANNED',
    title: '시흥시민축구단 워터 페스티벌',
    image: 'http://tong.visitkorea.or.kr/cms/resource/94/2994694_image2_1.png',
    address: '경기도 시흥시 역전로 2 시흥시 육상경기장',
    category: '스포츠',
    eventstartdate: '20230826',
    eventenddate: '20230826',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 1,
    area: '경기도 시흥시',
    mapx: 126.7555254859,
    mapy: 37.3388100506,
  },
  {
    festivalId: 2993908,
    status: 'PLANNED',
    title: '숲속 퍼펫 파크축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/05/2993905_image2_1.jpg',
    address: '경기도 수원시 권선구 서둔로 166',
    category: '스포츠',
    eventstartdate: '20230729',
    eventenddate: '20230729',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 1,
    area: '경기도 수원시',
    mapx: 126.9811903187,
    mapy: 37.2665807612,
  },
  {
    festivalId: 142197,
    status: 'PLANNED',
    title: '시흥갯골축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/90/2961890_image2_1.jpg',
    address: '경기도 시흥시 동서로 287 갯골생태공원',
    category: '스포츠',
    eventstartdate: '20230922',
    eventenddate: '20230924',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경기도 시흥시',
    mapx: 126.7812550601,
    mapy: 37.3898240311,
  },
  {
    festivalId: 526648,
    status: 'COMPLETED',
    title: '청도 소싸움축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/16/2953116_image2_1.JPG',
    address: '경상북도 청도군 화양읍 남성현로 348',
    category: '스포츠',
    eventstartdate: '20230414',
    eventenddate: '20230416',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경상북도 청도군',
    mapx: 128.7236148031,
    mapy: 35.6875318667,
  },
  {
    festivalId: 526648,
    status: 'COMPLETED',
    title: '청도 소싸움축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/16/2953116_image2_1.JPG',
    address: '경상북도 청도군 화양읍 남성현로 348',
    category: '스포츠',
    eventstartdate: '20230414',
    eventenddate: '20230416',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경상북도 청도군',
    mapx: 128.7236148031,
    mapy: 35.6875318667,
  },
  {
    festivalId: 526648,
    status: 'COMPLETED',
    title: '청도 소싸움축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/16/2953116_image2_1.JPG',
    address: '경상북도 청도군 화양읍 남성현로 348',
    category: '스포츠',
    eventstartdate: '20230414',
    eventenddate: '20230416',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경상북도 청도군',
    mapx: 128.7236148031,
    mapy: 35.6875318667,
  },
  {
    festivalId: 526648,
    status: 'COMPLETED',
    title: '청도 소싸움축제',
    image: 'http://tong.visitkorea.or.kr/cms/resource/16/2953116_image2_1.JPG',
    address: '경상북도 청도군 화양읍 남성현로 348',
    category: '스포츠',
    eventstartdate: '20230414',
    eventenddate: '20230416',
    reviewRating: 0.0,
    reviewCount: 0,
    likeCount: 0,
    area: '경상북도 청도군',
    mapx: 128.7236148031,
    mapy: 35.6875318667,
  },
];

const FastivalList = () => {
  return (
    <FastivalListBox>
      {data.map(list => (
        <Link to={`/detail/${list.festivalId}`}>
          <Festival item={list} />
        </Link>
      ))}
    </FastivalListBox>
  );
};

export default FastivalList;

const FastivalListBox = styled.article`
  width: 100%;
  height: calc(100% - 100px);
  padding: 30px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
