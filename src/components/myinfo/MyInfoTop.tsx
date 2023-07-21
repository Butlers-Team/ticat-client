import styled from 'styled-components';

// components
import MyInfoDescription from '@components/myinfo/MyInfoDescription';
import MyInfoTabNav from '@components/myinfo/MyInfoTabNav';

/** 2023/07/21 - 마이 페이지 상단 회원정보 컴포넌트 - by sineTlsl */
const MyInfoTop = () => {
  return (
    <MyInfoTopContainer>
      <MyInfoDescription />
      <MyInfoTabNav />
    </MyInfoTopContainer>
  );
};

export default MyInfoTop;

const MyInfoTopContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 100%;
  border-bottom: 1px solid var(--color-light-gray);
`;
