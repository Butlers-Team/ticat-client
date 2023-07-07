import styled from 'styled-components';
import axios from 'axios';
const Recommend = () => {
  return (
    <>
      <RecommendContainer>
        <h2>추천 축제</h2>
        <RecommendSection>
          <RecommendContents>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZrGNSpgXQvTd91j7uwPTEAi6a0rQ2CBE-_A&usqp=CAU"></img>
            <span>축제이름</span>
            <p>서울특별시 강남</p>
          </RecommendContents>
          <RecommendContents>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZrGNSpgXQvTd91j7uwPTEAi6a0rQ2CBE-_A&usqp=CAU"></img>
            <span>축제이름</span>
            <p>서울특별시 강남</p>
          </RecommendContents>
        </RecommendSection>
      </RecommendContainer>
    </>
  );
};

const RecommendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2rem;
  > h2 {
    color: var(--color-dark);
    font-size: 24px;
    font-weight: bold;
  }
`;

const RecommendSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const RecommendContents = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    font-size: 14px;
    color: var(--color-dark);

    font-weight: bold;
    letter-spacing: 1px;
    line-height: 25px;
  }
  > p {
    font-size: 12px;
    color: var(--color-dark);
    margin-bottom: 2rem;
    font-weight: 400;
  }
  > img {
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
    width: 80%;
    height: 10rem;
  }
`;
export default Recommend;
