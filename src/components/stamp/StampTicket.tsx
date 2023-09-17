import styled from 'styled-components';
import { StampType } from 'types/api/stamp';

// icons
import { MdPlace } from 'react-icons/md';
import { IoLogoOctocat } from 'react-icons/io';

// utils
import { formatDate } from '@utils/formatDate';
import { splitAddress } from '@utils/address';

interface StampTicketProps {
  stampList: StampType[];
}
interface StampTicketBg {
  background: string;
}

/**  2023/06/30 - 스탬프 티켓 컴포넌트 - by sineTlsl */
const StampTicket = ({ stampList }: StampTicketProps) => {
  const colorBg = ['var(--color-main)', 'var(--color-sub)', '#FF6B6B'];

  return (
    <StampTicketContainer>
      {stampList.length !== 0 ? (
        stampList.map((item, idx) => (
          <TicketItemWrap key={idx} background={colorBg[idx % colorBg.length]}>
            <ItemText>
              <h4 className="item-title">{item.title}</h4>
              <p className="item-place">
                <MdPlace size="13px" color="var(--color-light)" />
                <span>{splitAddress(item.address)}</span>
              </p>
              <p className="item-date">
                {formatDate(item.eventStartDate)} ~ {formatDate(item.eventEndDate)}
              </p>
            </ItemText>
            <ItemPhoto>
              <IoLogoOctocat size="50px" color="var(--color-light)" />
            </ItemPhoto>
          </TicketItemWrap>
        ))
      ) : (
        <UndefinedData>
          <img src="/assets/images/ticat-logo-icon-undefined.png" alt="ticat-logo-icon-undefined" />
          <p className="undefined-stamp-data">저장된 나의 티캣스탬프가 없어요</p>
        </UndefinedData>
      )}
    </StampTicketContainer>
  );
};
export default StampTicket;

/** 2023/06/30 - 스탬프 티켓 컨테이너 - by sineTlsl  */
const StampTicketContainer = styled.div`
  margin: 3rem 0 5rem 0;
  width: calc(100% - 4rem);
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
`;

/** 2023/06/30 - 스탬프 티켓(item) 박스- by sineTlsl  */
const TicketItemWrap = styled.div<StampTicketBg>`
  width: 100%;
  height: 10rem;
  flex-shrink: 0;
  border-radius: 10px;
  background: ${({ background }) => background};
  padding: 1.5rem 0;
  color: var(--color-light);
  display: flex;
`;

/** 2023/06/30 - 스탬프 티켓(item) 텍스트 - by sineTlsl  */
const ItemText = styled.div`
  width: 70%;
  flex-direction: column;
  display: flex;
  gap: 0.3rem;
  padding: 0 2rem;

  > .item-title {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
  }
  > .item-place {
    padding-top: 0.2rem;
    font-size: 12px;
    display: flex;
    align-items: center;
    font-weight: 400;
  }
  > .item-date {
    font-size: 12px;
    font-weight: 400;
  }
`;

/** 2023/06/30 - 스탬프 티켓(item) 이미지 or 아이콘 - by sineTlsl  */
const ItemPhoto = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px dashed var(--color-light);
`;

/** 2023/08/28 - 데이터 정보가 없을 때 - by sineTlsl  */
const UndefinedData = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 150px;
    height: 150px;
    opacity: 0.1;
  }

  > .undefined-stamp-data {
    font-size: 2rem;
    font-weight: 700;
    color: var(--color-dark-gray);
  }
`;
