const fs = require('fs');
const path = require('path');

const convertCookies = (cookieArray) => {
    return cookieArray.map(cookie => {
        if (cookie.expires && cookie.expires !== "Session") {
            cookie.expires = Math.floor(new Date(cookie.expires).getTime() / 1000);
        } else {
            delete cookie.expires;
        }
        return cookie;
    });
};

const scrapeIC24 = async (page, searchTerm) => {

    const cookiesPath = path.resolve(__dirname, '../cookies/intercarCookies.json');
    const cookies = convertCookies(JSON.parse(fs.readFileSync(cookiesPath, 'utf8')));
    await page.setCookie(...cookies);

    await page.goto('https://www.ic24.lv/', { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForSelector('#main_search_gc', { timeout: 30000 });
    await page.type('#main_search_gc', searchTerm);
    await page.keyboard.press('Enter');

    await page.waitForSelector('.container-baner-fo-js', { timeout: 30000 });
    let results = await scrapePageResults(page);

    const currentUrl = page.url();
    const pagePromises = [];

    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        try {
            const nextPageUrl = `${currentUrl}&page=${pageNum}`;
            await page.goto(nextPageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForSelector('.container-baner-fo-js', { timeout: 30000 });
            results = results.concat(await scrapePageResults(page));
        } catch (error) {
            console.error(`Error scraping page ${pageNum}:`, error.message);
            break;
        }
    }

    const additionalResults = await Promise.all(pagePromises);
    results = results.concat(...additionalResults);

    await page.close();
    return results;
};

const scrapePageResults = async (page) => {
    const items = await page.$$('.container-baner-fo-js');
    const pageResults = [];

    for (const item of items) {
        try {
            const desc = await item.$eval('.description', el => el.textContent.trim());
            const link = await item.$eval('.open-card', el => el.getAttribute('href'));
            const price = await item.$eval('.price_gross_2', el => el.textContent.trim());
            const img = await item.$eval('div.imageplace.clearfix > img', el => el.getAttribute('src'));

            pageResults.push({ website: "Inter Cars", desc, link: `https://www.ic24.lv${link}`, price, img });
        } catch (error) {
            console.error('Error scraping item:', error.message, ' in Inter Cars');
        }
    }

    return pageResults;
};

module.exports = scrapeIC24;
