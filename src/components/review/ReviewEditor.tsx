//react
import { FormEventHandler, useState } from 'react';
import { useParams } from 'react-router-dom';
//types

//install library
import styled from 'styled-components';

//icon
import { BsStarFill, BsStar } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

//components

//hooks
import useResizeTextarea from '@hooks/useResizeTextArea';
import useCustomToast from '@hooks/useCustomToast';
import { useCreateComment } from '@hooks/query';
import { ApiCreateCommentRequest } from 'types/api';

interface Props {}

/** 2023/07/21- 댓글 Editor - by leekoby */
const ReviewEditor: React.FC<Props> = (): JSX.Element => {
  const { id } = useParams();
  const festivalId = parseInt(id as string, 10);
  const commentMutation = useCreateComment();
  const toast = useCustomToast();

  const [rating, setRating] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const [existingImages, setExistingImages] = useState<string[]>([]); // 기존의 사진
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // new 사진

  /** 2023/07/21- textarea 리사이징 - by leekoby */
  const [textareaRef, handleResizeHeight] = useResizeTextarea();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileList = Array.from(files || []);

    if (selectedImages.length + fileList.length > 4) {
      toast({ title: '파일은 최대 4개까지 추가 가능합니다.', status: 'error' });
      return;
    }
    if (fileList.length > 0) {
      setSelectedImages(prevImages => [...prevImages, ...fileList]);
    }
    e.target.value = '';
  };

  const handleImageRemove = (idx: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, i) => i !== idx));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!content || !rating) {
      toast({ title: '후기 내용을 모두 입력해주세요.', status: 'warning' });
      return;
    }

    const data: ApiCreateCommentRequest = {
      festivalId,
      review: {
        content,
        rating,
      },
      reviewImages: selectedImages,
    };
    commentMutation.mutate(data);
  };
  return (
    <>
      <ReviewEditContaienr className="main">
        <ReviewFormBox>
          <form onSubmit={handleSubmit}>
            <div className="review-rating">
              {[...Array(5)].map((_, idx) => (
                <button type="button" key={idx} onClick={() => setRating(idx + 1)}>
                  {rating >= idx + 1 ? (
                    <BsStarFill size="16" color="var(--color-main)" />
                  ) : (
                    <BsStar size="16" color="var(--color-main)" />
                  )}
                </button>
              ))}
            </div>
            <ReviewContentBox>
              <div className="content-input">
                <textarea
                  ref={textareaRef}
                  value={content}
                  onChange={e => {
                    setContent(e.target.value);
                    handleResizeHeight();
                  }}
                />
              </div>
            </ReviewContentBox>
            <ReviewContentBox>
              <div className="content-bottom">
                <p>축제와 관계 없는 내용은 삭제될 수 있습니다.</p>
                <div className="content-button">
                  <label htmlFor="file-upload" className="img-upload-btn">
                    <AiOutlinePicture size="34" color="var(--color-dark)" />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    multiple
                    onChange={handleImageUpload}
                  />
                  <button className="post-button">작성</button>
                </div>
              </div>
            </ReviewContentBox>
          </form>
        </ReviewFormBox>
        <ReviewContentBox>
          <div className="file-box">
            {selectedImages.length === 0
              ? existingImages.map((imgUrl, idx) => (
                  <div className="img-box" key={idx}>
                    <img src={imgUrl} alt={`existing image ${idx}`} />
                  </div>
                ))
              : selectedImages.map((img, idx) => (
                  <div className="img-box" key={idx + existingImages.length}>
                    <img src={URL.createObjectURL(img)} alt={`image upload ${idx}`} />
                    <button className="delete-button" type="button" onClick={() => handleImageRemove(idx)}>
                      <TiDeleteOutline size={30} color="red" />
                    </button>
                  </div>
                ))}
          </div>
        </ReviewContentBox>
      </ReviewEditContaienr>
    </>
  );
};

export default ReviewEditor;
const ReviewEditContaienr = styled.section`
  height: 100%;
  width: 100%;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;
const ReviewFormBox = styled.div`
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
const ReviewContentBox = styled.div`
  .content-input {
    textarea {
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
  .file-box {
    justify-content: space-around;
    width: 100%;
    margin-top: 10px;
    display: flex;
    gap: 1rem;
  }

  .img-box {
    position: relative; /* 삭제 버튼 위치를 상대적으로 설정하기 위해 추가 */
    margin-bottom: 2.5rem; /* 기존 마진값보다 삭제 버튼 높이만큼 더 추가 */
  }

  .file-box img {
    padding: 1px;
    border: 1px solid var(--color-sub);
    width: 7rem;
    height: 7rem;
    object-fit: cover;
    border-radius: 0.8rem;
  }

  .delete-button {
    outline: none;
    border: none;
    background: transparent;
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
