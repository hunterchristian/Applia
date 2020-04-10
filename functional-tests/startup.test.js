const config = require('./config');

const Application = require('spectron').Application;

describe('Application launch', () => {
  beforeAll(async () => {
     this.app = new Application({
        path: config.appPath,
     });

     await this.app.start();
  });
  afterAll(async () => {
     if (this.app && this.app.isRunning()) {
        await this.app.stop();
     }
  });

  it('should show a browser window', async () => {
    await expect(this.app.browserWindow.isVisible()).resolves.toBe(true);
  });
  it('should show a title for the application', async () => {
    await expect(this.app.browserWindow.getTitle()).resolves.toBe('Applia');
  });
});
