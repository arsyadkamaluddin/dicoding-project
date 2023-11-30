const Hapi = require('@hapi/hapi');
const routes = require('./src/Routes');

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
  });
  server.route(routes);
  await server.start();
};
process.on('unhandledRejection', () => {
  process.exit(1);
});
init();
