const puppeteer = require('puppeteer-extra');

// Function to get a random user agent
const randomUserAgent = () => {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
        // Add more user agents if needed
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeTOP = async (browser, searchTerm) => {
    const results = []; // Initialize results array
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.toprezervesdalas.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    await page.waitForSelector('.input-search', { timeout: 10000 });
    await page.type('.input-search', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.listing-list-view__item', { timeout: 30000 });

    // Scrape results from the first page
    const items = await page.$$('.listing-list-view__item'); // Use correct selector

    for (const item of items) {
        const desc = await item.$eval('.title', el => el.textContent.trim());
        const link = await item.$eval('.ga-click', el => el.getAttribute('href'));
        const price = await item.$eval('.product-info__price-current', el => el.textContent.trim());
        const img = await item.$eval('div.product-image > div.image > a > img', el => el.getAttribute('src'));

        results.push({ website: "Toprezervesdalas.lv", desc, link, price, img });
    }

    await page.close();
    return results;
};

module.exports = scrapeTOP;
