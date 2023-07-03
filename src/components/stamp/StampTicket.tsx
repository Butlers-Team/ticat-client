import styled from 'styled-components';

import { MdPlace } from 'react-icons/md';
import { IoLogoOctocat } from 'react-icons/io';

interface StampTicketBg {
  background: string;
}

/**  2023/06/30 - 스탬프 티켓 컴포넌트 - by sineTlsl */
const StampTicket = () => {
  const colorBg = ['var(--color-main)', 'var(--color-sub)', '#FF6B6B'];
  const items = Array.from({ length: 9 }); // 예시로 9개 아이템 생성

  return (
    <StampTicketContainer>
      {items.map((_, idx) => (
        <TicketItemWrap key={idx} background={colorBg[idx % colorBg.length]}>
          <ItemText>
            <h4 className="item-title">축제 이름</h4>
            <p className="item-place">
              <MdPlace size="13px" color="var(--color-light)" />
              <span>울산광역시 북구</span>
            </p>
            <p className="item-date">2023.06.23 ~ 2023.06.25</p>
          </ItemText>
          <ItemPhoto>
            <IoLogoOctocat size="50px" color="var(--color-light)" />
          </ItemPhoto>
        </TicketItemWrap>
      ))}
    </StampTicketContainer>
  );
};
export default StampTicket;

/** 2023/06/30 - 스탬프 티켓 컨테이너 - by sineTlsl  */
const StampTicketContainer = styled.div`
  margin: 5rem 0;
  width: calc(100% - 4rem);
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
  flex: 0 1 70%;
  flex-direction: column;
  display: flex;
  gap: 0.6rem;
  padding: 1rem 2rem;

  > .item-title {
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
  flex: 0 1 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px dashed var(--color-light);
`;
