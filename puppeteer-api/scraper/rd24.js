const puppeteer = require('puppeteer-extra');
const randomUserAgent = () => {
    const userAgents = [
        // Add your user agents here
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeRD24 = async (browser, searchTerm) => {
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.rezervesdalas24.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('div.header-middle__input > form > input[type=text]', { timeout: 10000 });
    await page.type('div.header-middle__input > form > input[type=text]', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.listing-wrapper .product-card', { timeout: 30000 });

    const items = await page.$$('.listing-wrapper .product-card');
    const results = [];

    for (const item of items) {
        const link = await item.$eval('.product-card__title-link', el => el.getAttribute('href'));
        const price = await item.$eval('.product-card__new-price', el => el.textContent.trim());
        const img = await item.$eval('div.product-card__pictures > div.product-card__image > span > img', el => el.getAttribute('src'));

        results.push({ website: "RezervesDaļas24", link, price, img });
    }

    await page.close();
    return results;
};

module.exports = scrapeRD24;
