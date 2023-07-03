import styled from 'styled-components';
import { TiDeleteOutline } from 'react-icons/ti';
import { AiOutlineEye, AiFillEyeInvisible } from 'react-icons/ai';

interface Props {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClear: () => void;
  isShow: boolean;
  onToggleShow?: () => void;
}

/** 2023/06/29 - 로그인/회원가입 입력창 컴포넌트 - by leekoby */
const SignInput: React.FC<Props> = ({ type, isShow, placeholder, name, value, onChange, onClear, onToggleShow }) => {
  return (
    <InputContainer>
      <InputBox
        type={type === 'password' ? (isShow ? 'text' : 'password') : type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      <ButtonWrapper>
        {type === 'password' && name === 'password' && (
          <>
            <IconButton onClick={onToggleShow}>
              {isShow ? (
                <AiOutlineEye size={20} style={{ color: 'gray', opacity: 0.7 }} />
              ) : (
                <AiFillEyeInvisible size={20} style={{ color: 'gray', opacity: 0.7 }} />
              )}
            </IconButton>
          </>
        )}
        {value && (
          <IconButton onClick={onClear}>
            <TiDeleteOutline size={20} style={{ color: 'Crimson', opacity: 0.7 }} />
          </IconButton>
        )}
      </ButtonWrapper>
    </InputContainer>
  );
};

export default SignInput;

const IconButton = styled.button`
  padding: 0;
  outline: none;
  border: none;
  background-color: transparent;
`;

const InputContainer = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 10px;
  display: flex;
  justify-content: end;
  align-items: center;
  flex-direction: rows;
  margin-bottom: 5px;
`;

/** 2023/06/29 - 인풋창 컴포넌트 - by leekoby */
const InputBox = styled.input`
  border-radius: 5px;

  width: 100%;
  height: 4.5rem;
  margin-bottom: 10px;
  padding: 2px 5px;
  border: 1px solid #a5a5a5;

  ::placeholder {
    color: rgba(130, 129, 129, 0.6);
  }
  &:focus {
    outline: none;
    border: 2px solid var(--color-sub);
    ::placeholder {
      opacity: 0;
    }
  }
`;
