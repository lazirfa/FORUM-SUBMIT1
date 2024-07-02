const UsersHandler = require('./handler');
const routes = require('./routes');
 
module.exports = {
  name: 'comments',
  version: '1.0.0',
  register: async (server, { container }) => {
    const commentsHandler = new UsersHandler(container);
    server.route(routes(commentsHandler));
  },
}