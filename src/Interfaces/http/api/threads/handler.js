const AddThreadUseCase = require('../../../../Applications/use_case/AddThreadUseCase');
const DetailThreadUseCase = require('../../../../Applications/use_case/DetailThreadUseCase');

class ThreadsHandler {
    constructor(container) {
        this._container = container;
        this.postThreadHandler = this.postThreadHandler.bind(this);
    }

    async postThreadHandler(request, h) {
        const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
        const addedThread = await addThreadUseCase.execute(request.payload);
        const response = h.response({
            status: 'success',
            data: {
                addedThread,
            },
        });
        response.code(201);
        return response;
    }

    async getDetailThreadHandler(request, h) {
        const detailThreadUseCase = this._container.getInstance(DetailThreadUseCase.name);
        const { threadId } = request.params;
        const thread = await detailThreadUseCase.execute(threadId);
        const response = h.response({
            status: 'success',
            data: {
                thread,
            },
        });
        response.code(200);
        return response;
    }
}

module.exports = ThreadsHandler;