const Hapi = require("@hapi/hapi");
const routes = require("./src/Routes");

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: "localhost",
  });
  let data = [1, 1, 1, 3, 1, 3];
  server.route(routes);
  await server.start();
  console.log(`Server start at ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();
