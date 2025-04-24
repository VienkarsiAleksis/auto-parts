const fs = require('fs');
const path = require('path');


const scrapeAutodoc = async (page, searchTerm) => {

    const cookies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../cookies/autodocCookies.json'), 'utf8'));
    await page.setCookie(...cookies);
    
    await page.goto('https://www.autodoc.lv/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('.form-input', { timeout: 10000 });
    await page.type('.form-input', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.listing-list .listing-item', { timeout: 30000 });

    let results = await scrapePageResults(page);
    const currentUrl = page.url();

    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        try {
            const nextPageUrl = `${currentUrl}&page=${pageNum}`;
            await page.goto(nextPageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForSelector('.listing-list .listing-item', { timeout: 30000 });
            results = results.concat(await scrapePageResults(page));
        } catch (error) {
            console.error(`Error scraping page ${pageNum}:`, error.message);
            break;
        }
    }

    return results;
};

const scrapePageResults = async (page) => {
    const items = await page.$$('.listing-list .listing-item');
    const pageResults = [];

    for (const item of items) {
        try {
            const desc = await item.$eval('.listing-item__name', el => el.textContent.trim());
            const link = await item.$eval('.listing-item__name', el => el.getAttribute('href'));
            const price = await item.$eval('.listing-item__price-new', el => el.textContent.trim());
            const img = await item.$eval('div.listing-item__wrap > div.listing-item__image > a > img', el => el.getAttribute('src'));
            pageResults.push({ website: "autodoc", desc, link, price, img });
        } catch (error) {
            console.error('Error scraping item:', error.message, ' in autodoc');
        }
    }

    return pageResults;
};

module.exports = scrapeAutodoc;