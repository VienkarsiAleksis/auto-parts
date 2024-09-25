const puppeteer = require('puppeteer-extra');
const randomUserAgent = () => {
    const userAgents = [
        // Add your user agents here
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeIC = async (browser, searchTerm) => {
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.ic24.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('#main_search_gc', { timeout: 10000 });
    await page.type('#main_search_gc', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.container-baner-fo-js', { timeout: 30000 });

    const items = await page.$$('.container-baner-fo-js');
    const results = [];

    for (const item of items) {
        const desc = await item.$eval('.description', el => el.textContent.trim());
        const link = await item.$eval('.open-card', el => el.getAttribute('href'));
        const price = await item.$eval('.price_gross_2', el => el.textContent.trim());
        const img = await item.$eval('div.imageplace.clearfix > img', el => el.getAttribute('src'));

        results.push({ website: "Inter Cars", desc, link, price, img });
    }

    await page.close();
    return results;
};

module.exports = scrapeIC;
