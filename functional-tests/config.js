const pathToApp = {
  linux: './out/linux-unpacked/applia',
  darwin: './out/mac/Applia.app/Contents/MacOS/Applia',
  win32: '',
};

const appPath = pathToApp[process.platform];
if (!appPath) {
  console.error(`Path to application not found for: ${process.platform}`);
  process.exit(1);
}

module.exports = { appPath };