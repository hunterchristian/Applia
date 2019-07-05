const Application = require('spectron').Application;
module.exports = async () => {
  const app = new Application({
    path: './out/mac/Applia.app/Contents/MacOS/Applia',
    requireName: 'electronRequire',
  });
  try {
    await app.start();
  } catch (err) {
    console.error(`Could not start application, failed with error: ${ JSON.stringify(err) }`);
    process.exit(1);
  }

  return app;
};