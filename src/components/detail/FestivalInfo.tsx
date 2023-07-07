import styled from 'styled-components';
const FestivalInfo = () => {
  return (
    <>
      <InfoContainer>
        <h2>행사 소개</h2>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </p>
        <FestivalContact>
          <p className="contact-title">행사 연락처</p>
          <span>070-1234-4567</span>
        </FestivalContact>
        <FestivalContact>
          <p className="contact-title">홈페이지</p>
          <span>www.ticat.com</span>
        </FestivalContact>
        <FestivalContact>
          <p className="contact-title">행사위치</p>
          <span>서울시 관악구 봉천동</span>
        </FestivalContact>
        <FestivalContact>
          <p className="contact-title">이용료</p>
          <span>무료</span>
        </FestivalContact>
      </InfoContainer>
    </>
  );
};

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3rem 2rem;
  > h2 {
    color: var(--color-dark);
    font-size: 24px;
    font-weight: bold;
  }
  > p {
    font-size: 16px;
    color: var(--color-dark);
    margin-top: 2rem;
    margin-bottom: 6rem;
    font-weight: 400;
    letter-spacing: 1px;
    line-height: 25px;
  }
`;

const FestivalContact = styled.div`
  border-top: 1px solid var(--color-light-gray);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6rem;
  :nth-last-child(1) {
    border-bottom: 1px solid var(--color-light-gray);
  }

  > .contact-title {
    width: 15rem;
    font-size: 16px;
    font-weight: bold;
    margin: 2rem;
    color: var(--color-sub);
  }
  > span {
    width: 100%;
    font-size: 16px;
    font-weight: 400px;
    margin: 2rem;
    color: var(--color-dark);
  }
`;

export default FestivalInfo;
