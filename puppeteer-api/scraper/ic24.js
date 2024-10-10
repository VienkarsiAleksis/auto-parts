const puppeteer = require('puppeteer-extra');
const randomUserAgent = () => {
    const userAgents = [
        // Add your user agents here
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeIC = async (browser, searchTerm) => {
    const results = [];
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());

    // Go to the main website
    await page.goto('https://www.ic24.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for the search input and type the search term
    await page.waitForSelector('#main_search_gc', { timeout: 10000 });
    await page.type('#main_search_gc', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.container-baner-fo-js', { timeout: 30000 });

    // Scrape results from the first page
    await scrapePageResults(page, results);
    const currentUrl = page.url();

    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        const nextPageUrl = `${currentUrl}&page=${pageNum}`; // Append the page parameter
        await page.goto(nextPageUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        
        // Wait for results to load
        await page.waitForSelector('.container-baner-fo-js', { timeout: 30000 });

        // Scrape results from the current page
        await scrapePageResults(page, results);
    }

    await page.close();
    return results;
};

// Helper function to scrape results from the current page
const scrapePageResults = async (page, results) => {
    const items = await page.$$('.container-baner-fo-js');
    
    for (const item of items) {
        const desc = await item.$eval('.description', el => el.textContent.trim());
        const link = await item.$eval('.open-card', el => el.getAttribute('href'));
        const price = await item.$eval('.price_gross_2', el => el.textContent.trim());
        const img = await item.$eval('div.imageplace.clearfix > img', el => el.getAttribute('src'));

        results.push({ website: "Inter Cars", desc, link: `https://www.ic24.lv${link}`, price, img });
    }
};

module.exports = scrapeIC;
