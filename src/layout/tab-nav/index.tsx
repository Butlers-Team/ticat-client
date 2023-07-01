import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { IoMapOutline } from 'react-icons/io5';
import { BsCardList, BsPerson } from 'react-icons/bs';
import { RxCalendar } from 'react-icons/rx';

const tabMenulist = [
  { icon: <AiOutlineHome />, name: '홈', link: 'null' },
  { icon: <IoMapOutline />, name: '지도', link: 'null' },
  { icon: <BsCardList />, name: '축제목록', link: 'null' },
  { icon: <RxCalendar />, name: '캘린더', link: 'null' },
  { icon: <BsPerson />, name: '내정보', link: 'null' },
];

const TabNav = () => {
  const [selectMenu, setSelectMenu] = useState<number>(0);

  return (
    <nav>
      {tabMenulist.map((menu, index) => (
        <Link to={menu.link} key={index}>
          <NavIconbox
            className={index === selectMenu ? 'over-tab' : 'null'}
            onClick={() => {
              setSelectMenu(index);
            }}>
            <div>{menu.icon}</div>
            <p>{menu.name}</p>
          </NavIconbox>
        </Link>
      ))}
    </nav>
  );
};

export default TabNav;

/** 2023.07.01 탭메뉴 개별 컴포넌트 - by mscoojl24 */
const NavIconbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70px;
  height: 70px;
  color: #a5a5a5;
  font-family: 'Orbit', sans-serif;

  > div {
    font-size: 2.3rem;
    height: 28px;
  }
  > P {
    font-size: 1.2rem;
  }
  &.over-tab {
    color: var(--color-main);
    font-weight: 800;
    animation: iconSelection 0.5s forwards;
  }

  @keyframes iconSelection {
    0% {
      border-radius: 100%;
      background-color: #fff;
    }
    50% {
      background-color: #eaf0ff;
    }
  }
`;
