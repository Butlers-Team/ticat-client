import styled, { keyframes } from 'styled-components';
import { CalendarListType } from 'types/api/calendar';

// icons
import { MdPlace } from 'react-icons/md';

interface TicketStampingProps {
  item: CalendarListType;
}

/**  2023/09/17 - 스탬프 찍을 축제 상세 컴포넌트 - by sineTlsl */
const TicketStamping = ({ item }: TicketStampingProps) => {
  return (
    <TicketStampingContainer>
      <ItemImage>
        <img src={item.image} />
      </ItemImage>
      <ItemText>
        <p className="item-title">{item.title}</p>
        <div className="item-area-wrap">
          <div className="area-icon">
            <MdPlace size="16px" color="var(--color-dark)" />
          </div>
          <p className="item-area">{item.address}</p>
        </div>
      </ItemText>
    </TicketStampingContainer>
  );
};

export default TicketStamping;

const TicketStampingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ItemImage = styled.div`
  width: 250px;
  height: 250px;
  animation: ${fadeIn} 2s;

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const ItemText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-dark);
  padding-top: 1rem;
  width: 90%;

  > .item-title {
    font-size: 20px;
    font-weight: 700;
    padding: 0.3rem 0;
  }
  > .item-area-wrap {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    width: 90%;
  }
  > .item-area-wrap > .area-icon {
    padding-top: 0.4rem;
  }
  > .item-area-wrap > .item-area {
    font-size: 14px;
    font-weight: 300;
  }
`;
