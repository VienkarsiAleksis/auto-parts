const puppeteer = require('puppeteer-extra');
const randomUserAgent = () => {
    const userAgents = [
        // Add your user agents here
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeTrodo = async (browser, searchTerm) => {
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.trodo.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('form > div.input-block > input[type=text]', { timeout: 10000 });
    await page.type('form > div.input-block > input[type=text]', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.product-list-type .product', { timeout: 30000 });

    const items = await page.$$('.product-list-type .product');
    const results = [];

    for (const item of items) {
        const desc = await item.$eval('.product-title > h2', el => el.textContent.trim());
        const link = await item.$eval('.product-image > a', el => el.getAttribute('href'));
        const price = await item.$eval('.price', el => el.textContent.trim());
        const img = await item.$eval('div.product-image > a > span > img', el => el.getAttribute('src'));

        results.push({ website: "trodo", desc, link, price, img });
    }

    await page.close();
    return results;
};

module.exports = scrapeTrodo;
