class DeleteCommentUseCase {
    constructor({ threadRepository, commentRepository }) {
      this._threadRepository = threadRepository;
      this._commentRepository = commentRepository;
    }
  
    async execute(useCasePayload) {
      this._validatePayload(useCasePayload);
      const { thread, comment, owner } = useCasePayload;
      await this._threadRepository.checkAvailabilityThread(thread);
      await this._commentRepository.checkAvailabilityComment(comment);
      await this._commentRepository.verifyCommentOwner(comment, owner);
      await this._commentRepository.deleteComment(comment);
    }
  
    _validatePayload(payload) {
      const { thread, comment, owner } = payload;
  
      if (!thread || !comment || !owner) {
        throw new Error('DELETE_COMMENT_USE_CASE.NOT_CONTAIN_VALID_PAYLOAD');
      }
  
      if (typeof thread !== 'string' || typeof comment !== 'string' || typeof owner !== 'string') {
        throw new Error('DELETE_COMMENT_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION');
      }
    }
  }
  
  module.exports = DeleteCommentUseCase;