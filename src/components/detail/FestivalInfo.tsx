import styled from 'styled-components';
import { FestivalDetailType } from 'types/api/detail';
interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const FestivalInfo: React.FC<FestivalCoverProps> = ({ detailList }) => {
  return (
    <>
      <InfoContainer>
        <h2>행사 소개</h2>
        <p>{detailList.overview}</p>
        <FestivalContact>
          <p className="contact-title">행사 연락처</p>
          <span>{detailList.tel}</span>
        </FestivalContact>
        <FestivalContact>
          <p className="contact-title">행사위치</p>
          <span>{detailList.eventplace}</span>
        </FestivalContact>
        <FestivalContact>
          <p className="contact-title">이용료</p>
          <span>{detailList.price.slice(0, detailList.price.indexOf('('))}</span>
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
