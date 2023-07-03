import styled from 'styled-components';

//icon
import { FaRunning, FaWineGlassAlt, FaCross, FaLightbulb } from 'react-icons/fa';
import { MdPalette, MdMovie, MdPeopleAlt, MdFastfood } from 'react-icons/md';
import { RiGlobalLine, RiMusic2Fill, RiBookMarkFill } from 'react-icons/ri';
import { GiTwirlyFlower, GiMechaMask } from 'react-icons/gi';

const tabfilter = [
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
  return (
    <CategoryContainer>
      {tabfilter.map((icons, index) => (
        <li className="category-box" key={`icons${index}`}>
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
    margin-bottom: 15px;

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
      width: 30px;
      height: 30px;
      border-radius: 5px;
      background-color: var(--color-light-gray);
      color: var(--color-dark-gray);
      font-size: 22px;
    }
    > .category-name {
      font-size: 14px;
      color: var(--color-dark);
    }
  }
`;
