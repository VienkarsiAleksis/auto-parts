const puppeteer = require('puppeteer-extra');

const randomUserAgent = () => {
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
        "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:89.0) Gecko/20100101 Firefox/89.0",
    ];
    return userAgents[Math.floor(Math.random() * userAgents.length)];
};

const scrapeAutodoc = async (browser, searchTerm) => {
    const results = [];
    const page = await browser.newPage();
    await page.setUserAgent(randomUserAgent());

    // Go to the main website
    await page.goto('https://www.autodoc.lv/', { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Wait for the search input and type the search term
    await page.waitForSelector('.form-input', { timeout: 10000 });
    await page.type('.form-input', searchTerm);
    await page.keyboard.press('Enter');

    // Wait for results to load
    await page.waitForSelector('.listing-list .listing-item', { timeout: 30000 });
    await scrapePageResults(page, results);

    // Scrape results from the first page
    await scrapePageResults(page, results);
    const currentUrl = page.url(); // Get the current URL
    // Loop to get the pagination links dynamically
    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        const nextPageUrl = `${currentUrl}&page=${pageNum}`;
        paginationPromises.push(scrapePaginationPage(browser, nextPageUrl, results));
    }

    await Promise.all(paginationPromises);
    await page.close();
    return results;
};

// Helper function to scrape results from the current page
const scrapePageResults = async (page, results) => {
    const items = await page.$$('.listing-list .listing-item');

    for (const item of items) {
        const desc = await item.$eval('.listing-item__name', el => el.textContent.trim());
        const link = await item.$eval('.listing-item__name', el => el.getAttribute('href'));
        const price = await item.$eval('.listing-item__price-new', el => el.textContent.trim());
        const img = await item.$eval('div.listing-item__wrap > div.listing-item__image > a > img', el => el.getAttribute('src'));

        results.push({ website: "autodoc", desc, link, price, img });
    }
};

module.exports = scrapeAutodoc;
