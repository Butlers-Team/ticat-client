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
        <p className="mobile-fontsize">{detailList.overview.replaceAll(/(<([^>]+)>)/gi, ' ')}</p>
        <FestivalContact>
          <p className="mobile-fontsize">행사 연락처</p>
          <span className="mobile-fontsize">{detailList.tel}</span>
        </FestivalContact>
        <FestivalContact>
          <p className="mobile-fontsize">행사위치</p>
          <span className="mobile-fontsize">{detailList.eventplace.replaceAll(/(<([^>]+)>)/gi, ' ')}</span>
        </FestivalContact>
        <FestivalContact>
          <p className="mobile-fontsize">이용료</p>
          <span className="mobile-fontsize">{detailList.price.replaceAll(/(<([^>]+)>)/gi, ' ')}</span>
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
  @media (max-width: 420px) {
    .mobile-fontsize {
      font-size: 14px;
    }
  }
  div:nth-last-child(1) {
    border-bottom: 1px solid var(--color-light-gray);
  }

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
    line-height: 25px;
  }
`;

const FestivalContact = styled.div`
  border-top: 1px solid var(--color-light-gray);
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (max-width: 420px) {
    .mobile-fontsize {
      font-size: 14px;
    }
  }
  > p {
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
