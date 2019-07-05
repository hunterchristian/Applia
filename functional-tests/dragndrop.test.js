const startApp = require('./util/startApp');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const elementExists = elem => !!elem.value;

describe('Application launch', () => {
  beforeAll(async () => {
    this.app = await startApp();
  });
  afterAll(async () => {
     if (this.app && this.app.isRunning()) {
        await this.app.stop();
     }
  });

  it('should drag and element from the palette and drop it on the canvas', async () => {
    const dab = await this.app.client.element('.palette-element');
    const canvas = await this.app.client.element('.node');

    await this.app.client.moveToObject('.palette-element');
    await this.app.client.buttonDown(0);
    await this.app.client.moveToObject('.node');
    await this.app.client.buttonUp(0);
    await sleep(2000);
    const elem = await this.app.client.element('.node > .node');
    expect(elementExists(elem)).toBe(true);
  });
});
