const puppeteer = require('puppeteer-extra');
const randomUserAgent = () => {
    const userAgents = [
        // Add your user agents here
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeAutodoc = async (browser, searchTerm) => {
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.autodoc.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('.form-input', { timeout: 10000 });
    await page.type('.form-input', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.listing-list .listing-item', { timeout: 30000 });

    const items = await page.$$('.listing-list .listing-item');
    const results = [];

    for (const item of items) {
        const desc = await item.$eval('.listing-item__name', el => el.textContent.trim());
        const link = await item.$eval('.listing-item__name', el => el.getAttribute('href'));
        const price = await item.$eval('.listing-item__price-new', el => el.textContent.trim());
        const img = await item.$eval('div.listing-item__wrap > div.listing-item__image > a > img', el => el.getAttribute('src'));

        results.push({ website: "autodoc", desc, link, price, img });
    }

    await page.close();
    return results;
};

module.exports = scrapeAutodoc;
