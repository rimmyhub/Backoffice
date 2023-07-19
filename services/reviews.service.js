// reviews.service.js
const ReviewsRepository = require('../repositories/reviews.repository');

class ReviewsService {
  reviewsRepository = new ReviewsRepository();

  //-- 리뷰 작성 --//
  createReview = async (Order_id, Client_id, content, rating) => {
    return await this.reviewsRepository.createReview(Order_id, Client_id, content, rating);
  };

  //-- 리뷰 보기 --//
  getReviews = async (Restaurant_id, Client_id, content, rating) => {
    try {
      const reviewData = await this.reviewsRepository.getReviews(
        Restaurant_id,
        Client_id,
        content,
        rating
      );
      return reviewData;
    } catch (err) {
      console.error(err.stack);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  //-- 리뷰 수정 --//
  modifyReview = async (Client_id, content, rating) => {
    // 유효성 검사
    if (!content || !rating) {
      return res.status(400).json({
        errorMessage: '수정 데이터.',
      });
    }

    // 유효성 검사
    if (content === '') {
      return res.status(400).json({
        errorMessage: '댓글 내용을 입력해주세요.',
      });
    }

    return this.CommentsRepository.updateComments(postId, commentId, title, content);
  };
}

module.exports = ReviewsService;
