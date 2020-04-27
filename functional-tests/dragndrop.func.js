const { BrowserWindow, app } = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');
const path = require('path');
const url = require('url');

const triggerDragAndDropFunc = require('./util/triggerDragAndDrop');

const main = async () => {
  await pie.initialize(app);
  const browser = await pie.connect(app, puppeteer);

  const window = new BrowserWindow();
  await window.loadURL(
    url.format({
      pathname: path.join(__dirname, '../dist/index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  const page = await pie.getPage(browser, window);
  // Inject function into page
  await page.evaluate(triggerDragAndDropFunc);
  const isElementInCanvas = await page.evaluate(() => {
    triggerDragAndDrop('.palette-element', '.node');
    var elementInCanvas = document.querySelector('.node > .node');
    return Promise.resolve(!!elementInCanvas);
  });

  if (!isElementInCanvas) {
    console.log('test failed: could not find dropped element in canvas');
    window.destroy();
  }

  console.log('all tests passed');
  window.destroy();
};

main();
