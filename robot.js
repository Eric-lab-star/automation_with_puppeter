import "dotenv/config";
import puppeteer from "puppeteer";
const BASEURL = process.env.BASEURL;
const video = process.env.COURSE_URL;
const userID = process.env.ID;
const password = process.env.PASSWORD;
(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(BASEURL);
  const nav = await page.$(`nav.relative > div.hidden a `);
  await nav.click();
  await page.keyboard.type(userID, { delay: 100 });
  await page.keyboard.press("Tab");
  await page.keyboard.type(password, { delay: 100 });
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.waitForSelector(`form.p-4`, { hidden: true, timeout: 5000 });
  await page.goto(video);
  let counter = 0;
  const videos = await page.$$(`a.mt-1[href^="/courses/tower-defense/videos"]`);
  while (counter < videos.length) {
    await videos[counter].click();
    await page.waitForTimeout(3000);
    const downloadLink = await page.$(
      `a.mt-2[href^="https://player.vimeo.com"]`
    );
    await downloadLink.click();
    await page.waitForTimeout(3000);
    counter = counter + 1;
    console.log(counter);
    if (counter === videos.length) console.log("complete!");
  }
})();
