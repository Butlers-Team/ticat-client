// import instance from '@api/axiosInstance';
import styled from 'styled-components';

import { settingData } from '@data/settingData';
import { useMemberStore } from '@store/useMemberStore';
import { useTokenStore } from '@store/useTokenStore';
import { useExpStore } from '@store/useExpStore';

const MySetting = () => {
  const { clearMember } = useMemberStore();
  const { clearTokens } = useTokenStore();
  const { clearExp } = useExpStore();
  const handelMembershipSetting = (item: string) => {
    if (item === '로그아웃') {
      clearMember();
      clearTokens();
      clearExp();

      alert('로그아웃이 완료되었습니다');
      window.location.href = '/';
    }

    if (item === '회원탈퇴') {
      /** 2023/08/08 회원탈퇴 요청 - by mscojl24 */
      // console.log('회원탈퇴 요청좀 도와주실분~');
    }
  };

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
