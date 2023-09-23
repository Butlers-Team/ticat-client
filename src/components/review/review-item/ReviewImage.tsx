//react
import React, { useState } from 'react';
//style
import styled from 'styled-components';

interface Props {
  pictures: string[];
}
/** 2023/07/22- 리뷰 이미지 - by leekoby */
/** 2023/08/14- 리뷰 이미지 모달 로직 추가 - by leekoby */
const ReviewImage: React.FC<Props> = ({ pictures }): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleImageClick = (imageUrl: string, index: number) => {
    setSelectedImageUrl(imageUrl);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const navigateImages = (offset: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = (selectedImageIndex + offset + pictures.length) % pictures.length;
    setSelectedImageIndex(newIndex);
    setSelectedImageUrl(pictures[newIndex]);
  };

  return (
    <>
      <ImageContainer>
        {pictures?.map((imgUrl, idx) => (
          <img
            src={imgUrl}
            key={imgUrl + idx}
            alt={`comment image ${idx}`}
            onClick={() => handleImageClick(imgUrl, idx)}
          />
        ))}
      </ImageContainer>
      {isModalOpen && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <img src={selectedImageUrl} alt="selected" />
            <LeftArea onClick={(e: React.MouseEvent) => navigateImages(-1, e)} />
            <RightArea onClick={(e: React.MouseEvent) => navigateImages(1, e)} />
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default ReviewImage;

const ImageContainer = styled.div`
  height: 7rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 2rem;
  margin: auto;
  img {
    width: 20%;
    height: 100%;
    cursor: pointer;
    object-fit: cover;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 80%;
  max-height: 80%;
  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
  }
`;

const LeftArea = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
`;

const RightArea = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 50%;
  height: 100%;
  cursor: pointer;
`;
