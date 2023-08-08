import styled from 'styled-components';
import sanitizeHtml from 'sanitize-html'; // string 값을 마크업 언어로 변환해주는 라이브러리

//type
import { FestivalDetailType } from 'types/api/detail';
import { SanitizeHtmlOptions } from 'types/festival/festivalInfo';

interface FestivalCoverProps {
  detailList: FestivalDetailType;
}
const FestivalInfo: React.FC<FestivalCoverProps> = ({ detailList }) => {
  /**2023.07.25 허용한 마크업 태그만 html 변환 - by mscojl24 */
  const safelySanitizeHtml = (htmlString: string): string => {
    const sanitizeOptions: SanitizeHtmlOptions = {
      allowedTags: ['br', 'b'], //작성된 태그만 허용하도록 설정
      allowedAttributes: {}, // 위의 태그 제외 모든 속성 허용하지않음
    };

    return sanitizeHtml(htmlString, sanitizeOptions);
  };

  return (
    <>
      <InfoContainer>
        <h2>행사 소개</h2>
        <p
          className="mobile-fontsize"
          dangerouslySetInnerHTML={{ __html: safelySanitizeHtml(detailList.overview) }}></p>
        {
          <FestivalContact>
            <p className="mobile-fontsize">행사 연락처</p>
            <span className="mobile-fontsize">{detailList.tel ? detailList.tel : '정보제공 X'}</span>
          </FestivalContact>
        }
        {detailList.eventplace ? (
          <FestivalContact>
            <p className="mobile-fontsize">행사위치</p>
            <span
              className="mobile-fontsize"
              dangerouslySetInnerHTML={{ __html: safelySanitizeHtml(detailList.eventplace) }}></span>
          </FestivalContact>
        ) : (
          <FestivalContact>
            <p className="mobile-fontsize">행사위치</p>
            <span className="mobile-fontsize">정보제공 X</span>
          </FestivalContact>
        )}
        {detailList.price ? (
          <FestivalContact>
            <p className="mobile-fontsize">이용료</p>
            <span
              className="mobile-fontsize"
              dangerouslySetInnerHTML={{ __html: safelySanitizeHtml(detailList.price) }}></span>
          </FestivalContact>
        ) : (
          <FestivalContact>
            <p className="mobile-fontsize">이용료</p>
            <span className="mobile-fontsize">정보제공 X</span>
          </FestivalContact>
        )}
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
