import styled from 'styled-components';

// components
import MyInfoTop from '@components/myinfo/MyInfoTop';

/** 2023/07/21 - 마이 페이지 - by sineTlsl */
const MyPage = () => {
  return (
    <MyPageContainer>
      <MyInfoTop />
    </MyPageContainer>
  );
};

export default MyPage;

// 마이페이지 컨테이너
const MyPageContainer = styled.section`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;
