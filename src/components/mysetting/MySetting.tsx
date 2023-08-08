// import instance from '@api/axiosInstance';
import styled from 'styled-components';

import { settingData } from '@data/settingData';

const MySetting = () => {
  return (
    <SettingBox>
      {Object.entries(settingData).map(([category, items]) => (
        <li key={category}>
          <div className="setting-title flex-h-center">{category}</div>
          {items.map((item, index) => (
            <span
              className="setting-option flex-h-center"
              key={index}
              onClick={() => {
                handelMembershipSetting(item.name);
              }}>
              <p>{item.name}</p>
              <p> {item.subtext} </p>
            </span>
          ))}
        </li>
      ))}
    </SettingBox>
  );
};

export default MySetting;

const SettingBox = styled.ul`
  width: 100%;
  height: calc(100% - 50px);
  background-color: var(--color-light);

  li:nth-child(1) > div {
    border-top: 0px;
  }
  .setting-title {
    width: 100%;
    height: 50px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
    padding: 0px 20px;
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--color-main);
  }

  .setting-option {
    width: 100%;
    height: 50px;
    justify-content: space-between;
    padding: 0px 20px;
    font-size: 1.4rem;
    color: var(--color-dark);
    cursor: pointer;

    :hover {
      color: var(--color-main);
    }
    :nth-child(2) {
      color: #ccc;
    }
  }
`;
