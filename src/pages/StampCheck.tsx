import styled from 'styled-components';

const StampCheck = () => {
  return <StampCheckContainter>test 중</StampCheckContainter>;
};

const StampCheckContainter = styled.section`
  max-width: 100vw;
  width: 100%;
  background: black;
  color: #fff;
  font-size: 14px;
`;

export default StampCheck;
