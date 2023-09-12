import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCategoryTabStore } from '@store/useCategoryTabStore';

//icon
import { FaRunning, FaWineGlassAlt, FaCross, FaLightbulb } from 'react-icons/fa';
import { MdPalette, MdMovie, MdPeopleAlt, MdFastfood } from 'react-icons/md';
import { RiGlobalLine, RiMusic2Fill, RiBookMarkFill } from 'react-icons/ri';
import { GiTwirlyFlower, GiMechaMask } from 'react-icons/gi';

const tabicon = [
  { filtername: '음악', filtericon: <RiMusic2Fill /> },
  { filtername: '미술', filtericon: <MdPalette /> },
  { filtername: '영화', filtericon: <MdMovie /> },
  { filtername: '문화', filtericon: <MdPeopleAlt /> },
  { filtername: '국제', filtericon: <RiGlobalLine /> },
  { filtername: '역사', filtericon: <RiBookMarkFill /> },
  { filtername: '과학', filtericon: <FaLightbulb /> },
  { filtername: '스포츠', filtericon: <FaRunning /> },
  { filtername: '요리', filtericon: <MdFastfood /> },
  { filtername: '주류', filtericon: <FaWineGlassAlt /> },
  { filtername: '정원', filtericon: <GiTwirlyFlower /> },
  { filtername: '종교', filtericon: <FaCross /> },
  { filtername: '전통', filtericon: <GiMechaMask /> },
  { filtername: '전체', filtericon: 'ALL' },
];

const CategoryIcon = () => {
  const { setCategoryTab } = useCategoryTabStore();
  const navigate = useNavigate();

  /** 2023.07.23 아이콘 클릭시 관련 카테고리 탭으로 라우팅 - by mscojl24 */
  const handleRouting = (tab: string) => {
    navigate(`/festival`);
    setCategoryTab(tab);
  };

  return (
    <CategoryContainer>
      {tabicon.map((icons, index) => (
        <li
          className="category-box"
          key={`icons${index}`}
          onClick={() => {
            handleRouting(`${icons.filtername}`);
          }}>
          <div className="category-icon">{icons.filtericon}</div>
          <p className="category-name">{icons.filtername}</p>
        </li>
      ))}
    </CategoryContainer>
  );
};

export default CategoryIcon;

const CategoryContainer = styled.ul`
  display: flex;
  padding: 20px;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  .category-box {
    display: flex;
    width: calc(100% / 7);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;

    :nth-last-child(1) .category-icon {
      font-size: 12px;
      font-weight: 700;
    }

    :hover .category-icon {
      background-color: #eaf0ff;
      color: var(--color-main);
    }

    :hover .category-name {
      color: var(--color-main);
    }

    > * {
      margin: 3px;
    }
    > .category-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
      border-radius: 5px;
      background-color: #f0f0f0;
      color: var(--color-dark-gray);
      font-size: 1.6rem;
      font-weight: 600;
      :nth-last-child(1) {
        font-size: 2.3rem;
      }
    }
    > .category-name {
      white-space: nowrap;
      font-size: 1.5rem;
      color: var(--color-dark);
    }

    @media (max-width: 400px) {
      > * {
        margin: 3px;
      }
    }
  }
`;
