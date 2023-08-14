//react
import { FormEventHandler, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//api

//types
import { ApiCreateReviewRequest, MyReviewResponse, ReviewResponse } from 'types/api';

//install library
import styled from 'styled-components';

//icon
import { BsStarFill, BsStar } from 'react-icons/bs';
import { AiOutlinePicture } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

//components

//hooks
import { useCreateReview, useUpdateReview } from '@hooks/query';
import useResizeTextarea from '@hooks/useResizeTextArea';
import useCustomToast from '@hooks/useCustomToast';
import { useMemberStore } from '@store/useMemberStore';

interface Props {
  festivalId: number;
  review?: ReviewResponse | MyReviewResponse;
  isEditMode?: boolean;
  onCancel?: () => void;
  onSubmit?: (updatedContent: string) => void;
}

/** 2023/07/21- 리뷰 Editor - by leekoby */
const ReviewEditor: React.FC<Props> = ({ festivalId, review, isEditMode, onCancel, onSubmit }): JSX.Element => {
  const { member } = useMemberStore();
  const toast = useCustomToast();

  //리뷰 등록할때 TextArea /n 태그를 <br>로 바꾸는 함수
  const convertNewLinesToBr = (content: string): string => {
    return content.replace(/\n/g, '<br>');
  };

  //리뷰 수정할때 <br> 태그를 TextArea /n 으로 바꾸는 함수
  const contentBrtoNewLines = (content?: string): string => {
    if (!content) return '';

    return content.replace(/<br\s*\/?>/g, '\n');
  };

  const [rating, setRating] = useState<number | undefined>(isEditMode ? review?.rating : 0);
  const [content, setContent] = useState<string | undefined>(isEditMode ? contentBrtoNewLines(review?.content) : '');

  const [existingImages, setExistingImages] = useState<string[] | undefined>(review?.pictures); // 기존의 사진

  const [updateImages, setUpdateImages] = useState<File[]>([]); // update 사진

  const [selectedImages, setSelectedImages] = useState<File[]>([]); // new 사진

  /** 2023/07/21- textarea 리사이징 - by leekoby */
  const [textareaRef, handleResizeHeight] = useResizeTextarea();

  useEffect(() => {
    if (isEditMode && handleResizeHeight) {
      handleResizeHeight();
    }
  }, [isEditMode, handleResizeHeight]);

  const [isFocused, setIsFocused] = useState(false);

  const handleReset = async () => {
    await handleResizeHeight();
    setRating(0);
    setContent('');
    setExistingImages([]);
    setSelectedImages([]);
  };

  const createReviewMutation = useCreateReview({ festivalId, handleReset });
  const updateReviewMutation = useUpdateReview({ festivalId, reviewId: review?.reviewId, handleReset });
  /** 이미지 업로드 유효성 검사 */
  const validateImageFile = (file: File): boolean => {
    const acceptedImageFormats = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.svg|\.webp)$/i;
    const maxSize = 5 * 1024 * 1024; //5mb

    if (!file || !file.type.startsWith('image/')) {
      toast({ title: '이미지 파일만 업로드할 수 있습니다.', status: 'error' });
      return false;
    }

    if (!acceptedImageFormats.exec(file.name)) {
      toast({
        title: '지원되는 이미지 형식이 아닙니다. .jpg, .jpeg, .png, .gif, .bmp, .svg 또는 .webp 파일을 사용하세요.',
        status: 'error',
      });

      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: '파일 크기는 5MB를 초과할 수 없습니다.',
        status: 'error',
      });

      return false;
    }

    return true;
  };

  // 리뷰 작성 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileList = Array.from(files || []).filter(file => validateImageFile(file as File));

    if (selectedImages.length + fileList.length > 4) {
      return toast({ title: '파일은 최대 4개까지 추가 가능합니다.', status: 'error' });
    }

    if (fileList.length > 0) {
      setSelectedImages((prevImages: File[]) => [...prevImages, ...fileList]);
    }

    e.target.value = '';
  };

  // 리뷰 수정 이미지 업로드
  const handleImageUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const fileList = Array.from(files || []).filter(file => validateImageFile(file as File));

    if (updateImages.length + fileList.length > 4) {
      return toast({ title: '파일은 최대 4개까지 추가 가능합니다.', status: 'error' });
    }

    if (fileList.length > 0) {
      setUpdateImages((prevImages: File[]) => [...prevImages, ...fileList]);
    }

    e.target.value = '';
  };

  const handleImageRemove = (idx: number) => {
    if (isEditMode) {
      setUpdateImages(prevImages => prevImages.filter((_, i) => i !== idx));
    } else setSelectedImages(prevImages => prevImages.filter((_, i) => i !== idx));
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();

    if (!member) return toast({ title: '로그인후에 접근해주세요!', status: 'error' });

    if (!content && !rating) {
      return toast({ title: '리뷰 내용과 별점을 모두 입력해주세요.', status: 'warning' });
    } else if (!content?.trim().length) return toast({ title: '리뷰 내용을 입력해주세요.', status: 'warning' });
    else if (!rating) {
      return toast({ title: '별점을 선택해주세요.', status: 'warning' });
    }
    const convertedContent = convertNewLinesToBr(content);

    // 리뷰수정
    if (isEditMode && review?.reviewId) {
      if (content === review.content && rating === review.rating && updateImages.length === 0)
        return toast({ title: '리뷰 수정 후 다시 시도해주세요.', status: 'error' });

      updateReviewMutation.mutate({
        reviewId: review.reviewId,
        review: {
          content: convertedContent,
          rating,
        },
        reviewImages: updateImages,
      });

      onSubmit && onSubmit(convertedContent);
      return;
    }
    // 리뷰등록

    createReviewMutation.mutate({
      festivalId,
      review: {
        content: convertedContent,
        rating,
      },
      reviewImages: selectedImages,
    });
  };

  return (
    <>
      <ReviewEditContaienr className="main">
        <ReviewFormBox isFocused={isFocused}>
          <form onSubmit={handleSubmit}>
            <div className="review-rating">
              {[...Array(5)].map((_, idx) => (
                <button type="button" key={idx} onClick={() => setRating(idx + 1)}>
                  {rating && rating >= idx + 1 ? (
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={e => {
                    setContent(e.target.value);
                    setTimeout(() => handleResizeHeight(), 0);
                  }}
                  placeholder="리뷰를 입력해주세요."
                />
              </div>
            </ReviewContentBox>
            <ReviewContentBox>
              <div className="content-bottom">
                <p>부적절한 내용은 삭제될 수 있습니다.</p>
                <div className="content-button">
                  {isEditMode ? (
                    <>
                      <label htmlFor="file-update" className="img-update-btn">
                        <AiOutlinePicture size="3rem" color="var(--color-dark)" />
                      </label>
                      <input
                        id="file-update"
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/svg+xml, image/webp"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleImageUpdate}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="file-upload" className="img-upload-btn">
                        <AiOutlinePicture size="3rem" color="var(--color-dark)" />
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg, image/png, image/gif, image/bmp, image/svg+xml, image/webp"
                        style={{ display: 'none' }}
                        multiple
                        onChange={handleImageUpload}
                      />
                    </>
                  )}

                  <button className="post-button"> {isEditMode ? '리뷰 수정' : '리뷰 등록'}</button>
                  {isEditMode ? (
                    <button type="button" className="post-button" onClick={onCancel}>
                      취소
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </ReviewContentBox>
          </form>
        </ReviewFormBox>
        <ReviewContentBox>
          <div className="file-box">
            {isEditMode
              ? updateImages.length === 0
                ? existingImages?.map((imgUrl, idx) => (
                    <div className="img-box" key={idx}>
                      <img src={imgUrl} alt={`existing image ${idx}`} />
                    </div>
                  ))
                : updateImages.map((img, idx) => (
                    <div className="img-box" key={idx + updateImages.length}>
                      <img src={URL.createObjectURL(img)} alt={`image upload ${idx}`} />
                      <button className="delete-button" type="button" onClick={() => handleImageRemove(idx)}>
                        <TiDeleteOutline size={30} color="red" />
                      </button>
                    </div>
                  ))
              : selectedImages.map((img, idx) => (
                  <div className="img-box" key={idx + selectedImages.length}>
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
const ReviewFormBox = styled.div<{ isFocused: boolean }>`
  border: 1px solid ${({ isFocused }) => (isFocused ? 'var(--color-sub)' : 'var(--color-light-gray)')};
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
      resize: none;
      margin-bottom: 1rem;
      border: none;
      width: 100%;
      outline: none;
    }
  }
  .content-bottom {
    padding: 0.5rem;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: end;
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
        white-space: nowrap;

        height: 28px;
        border-radius: 0.5rem;
        padding: 0px 1.2rem;
        font-size: 1.4rem;
        font-weight: bold;
        color: var(--color-light);
        background-color: var(--color-main);

        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: var(--color-sub);
        }
        &:active {
          background-color: var(--color-sub);
        }
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
