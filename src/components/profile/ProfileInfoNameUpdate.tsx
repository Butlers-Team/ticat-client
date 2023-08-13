import { useState } from 'react';
import styled from 'styled-components';

interface ProfileInfoNameProps {
  name: string;
  email: string;
}

/** 2023/08/12 - 프로필 회원정보 업데이트 컴포넌트 - by sineTlsl */
const ProfileInfoNameUpdate = ({ name, email }: ProfileInfoNameProps) => {
  const [memberName, setMemberName] = useState(name);

  return (
    <ProfileInfoNameContainer>
      <div className="name-wrap">
        <input className="name-text" value={memberName} onChange={e => setMemberName(e.target.value)} />
      </div>
      <p className="email-text">{email}</p>
    </ProfileInfoNameContainer>
  );
};

export default ProfileInfoNameUpdate;

// 회원 닉네임 및 이메일 정보
const ProfileInfoNameContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding-top: 3rem;

  > .name-wrap {
    display: flex;
    justify-content: flex-start;
  }
  > .name-wrap > .name-text {
    width: 100%;
    outline: none;
    box-shadow: none;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    padding: 0.4rem 0.8rem;
    color: var(--color-dark);
    font-size: 18px;
    font-weight: 700;

    &:active,
    &:focus {
      border-color: var(--color-dark);
    }
  }
  > .email-text {
    width: 100%;
    color: var(--color-dark-gray);
    font-weight: 400;
    font-size: 14px;
  }
`;
