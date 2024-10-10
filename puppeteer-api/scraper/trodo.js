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

const scrapeTrodo = async (browser, searchTerm) => {
    const results = []; // Initialize results array
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());
    await page.goto('https://www.trodo.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });
    
    await page.waitForSelector('form > div.input-block > input[type=text]', { timeout: 10000 });
    await page.type('form > div.input-block > input[type=text]', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.product-list-type .product', { timeout: 30000 });

    // Scrape results from the first page
    await scrapePageResults(page, results);
    const currentUrl = page.url();
    // Loop to scrape additional pages (up to 5 pages)
    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        const nextPageUrl = `${currentUrl}&p=${pageNum}`; // Append the ?p={pageNum} parameter
        
        await page.goto(nextPageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for results to load
        await page.waitForSelector('.product-list-type .product', { timeout: 30000 });

        // Scrape results from the current page
        await scrapePageResults(page, results);
    }

    await page.close();
    return results;
};

// Helper function to scrape results from the current page
const scrapePageResults = async (page, results) => {
    const items = await page.$$('.product-list-type .product'); // Use the correct selector

    for (const item of items) {
        const desc = await item.$eval('.product-title > h2', el => el.textContent.trim());
        const link = await item.$eval('.product-image > a', el => el.getAttribute('href'));
        const price = await item.$eval('.price', el => el.textContent.trim());
        const img = await item.$eval('div.product-image > a > span > img', el => el.getAttribute('src'));

        results.push({ website: "trodo", desc, link, price, img });
    }
};

module.exports = scrapeTrodo;
