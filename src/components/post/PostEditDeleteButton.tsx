import styled from 'styled-components';

interface Props {
  onEditClick: () => void;
  onDeleteClick: () => void;
  fontSize?: string;
  fontWeight?: string;
}

/** 2023/10/16- 수정삭제 버튼 재사용 컴포넌트- by leekoby */

const PostEditDeleteButton: React.FC<Props> = ({ onEditClick, onDeleteClick, fontSize, fontWeight }): JSX.Element => {
  return (
    <ButtonWrapper fontSize={fontSize} fontWeight={fontWeight}>
      <button onClick={onEditClick}>수정</button>|<button onClick={onDeleteClick}>삭제</button>
    </ButtonWrapper>
  );
};

export default PostEditDeleteButton;

interface ButtonWrapperProps extends Partial<Props> {}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  color: var(--color-sub);
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 0.5rem;
  button {
    font-size: ${({ fontSize }) => (fontSize ? fontSize : '1.4rem')};
    font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 'bold')};
    color: var(--color-main);

    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    outline: none;

    &:hover {
      color: var(--color-sub);
    }
  }
`;
