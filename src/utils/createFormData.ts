import { ApiCreateReviewRequest, ApiUpdateReviewRequest } from 'types/api';

interface Options {
  request: ApiCreateReviewRequest | ApiUpdateReviewRequest;
}
/** 2023/07/21- 리뷰 FormData 생성 유틸 - by leekoby */
export const createFormData = ({ request }: Options): FormData => {
  const formData = new FormData();

  const reviewJSON = JSON.stringify(request.review);
  const reviewBlob = new Blob([reviewJSON], { type: 'application/json' });

  formData.append('review', reviewBlob);
  if (request.reviewImages) {
    request.reviewImages.forEach(image => {
      formData.append(`reviewImage`, image, image.name);
    });
  }
  //TODO: Form 데이터 확인용
  // const readReviewBlob = formData.get('review');

  // if (readReviewBlob instanceof Blob) {
  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     console.log('review content:', fileReader.result);
  //   };
  //   fileReader.readAsText(reviewBlob);
  // }

  return formData;
};
