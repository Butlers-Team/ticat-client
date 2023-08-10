//react
import { FormEventHandler, useEffect, useState } from 'react';
//api
//types
import { ApiCreateCommentRequest } from 'types/api';
//install library
import styled from 'styled-components';
//icon
//components
//hooks
import useResizeTextarea from '@hooks/useResizeTextArea';
import useCustomToast from '@hooks/useCustomToast';
import { useCreateComment } from '@hooks/query/useCreateComment';

//store
import { useMemberStore } from '@store/useMemberStore';

/** 2023/08/06- 댓글 작성 폼 - by leekoby */

interface Props {
  reviewId: number;
  show: boolean;
}
const CommentForm: React.FC<Props> = ({ reviewId, show }): JSX.Element => {
  const { member } = useMemberStore();
  const toast = useCustomToast();
  const [content, setContent] = useState<string>('');

  const [textareaRef, handleResizeHeight] = useResizeTextarea();

  const handleReset = () => {
    setContent('');
  };

  const commentMutation = useCreateComment({ reviewId, handleReset });

  const convertNewLinesToBr = (content: string): string => {
    return content.replace(/\n/g, '<br>');
  };

  /** 2023/08/07 - 댓글 등록 - by leekoby */
  const onSubmitComment: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!member) return toast({ title: '로그인후에 접근해주세요!', status: 'error' });
    if (!content.trim().length) return toast({ title: '답글을 입력해주세요!', status: 'warning' });

    const convertedContent = convertNewLinesToBr(content);

    const data: ApiCreateCommentRequest = {
      reviewId,
      content: convertedContent,
    };
    commentMutation.mutate(data);
  };

  return (
    <CommentFormContainer show={show}>
      <CommentFormBox>
        <form onSubmit={onSubmitComment}>
          <CommentContentBox>
            <div className="content-input">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={e => {
                  setContent(e.target.value);
                  handleResizeHeight();
                }}
                placeholder="댓글을 입력해주세요."
              />
            </div>
            <CommentContentBox>
              <div className="content-bottom">
                <p>부적절한 내용은 삭제될 수 있습니다.</p>
                <div className="content-button">
                  <button type="submit" className="post-button">
                    댓글 등록
                  </button>
                </div>
              </div>
            </CommentContentBox>
          </CommentContentBox>
        </form>
      </CommentFormBox>
    </CommentFormContainer>
  );
};

export default CommentForm;

const CommentFormContainer = styled.section<{ show: boolean }>`
  height: 100%;
  width: 100%;
  opacity: ${({ show }: { show: boolean }) => (show ? 1 : 0)};
  max-height: ${({ show }: { show: boolean }) => (show ? '500px' : '0')};
  overflow: hidden;
  transition: all 0.5s ease-in-out;
`;
const CommentFormBox = styled.div`
  border: 1px solid var(--color-dark-gray);
  border-radius: 1.2rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 15px;

  .review-rating {
    padding: 0.5rem;
    display: flex;
    gap: 3px;

    > button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
    }
  }
`;
const CommentContentBox = styled.div`
  .content-input {
    textarea {
      resize: none;
      margin-bottom: 1rem;
      border: none;
      width: 100%;
      outline: none;
    }
  }
  .content-bottom {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 1rem;
      color: var(--color-dark-gray);
    }
    .content-button {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      label {
        cursor: pointer;
        padding: 0;
        margin: 0;
      }
      button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        outline: none;
      }
      .post-button {
        height: 28px;
        border-radius: 0.5rem;
        padding: 0px 1.2rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-light);
        background-color: var(--color-sub);
      }
    }
  }
`;
