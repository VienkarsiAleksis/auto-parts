const fs = require('fs');
const path = require('path');

const scrapeTrodo = async (page, searchTerm) => {
    const cookies = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../cookies/trodoCookies.json'), 'utf8'));
    await page.setCookie(...cookies);

    // Now navigate to the Trodo homepage with cookies applied
    await page.goto('https://www.trodo.lv/', { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for the search input to appear and enter the search term
    await page.waitForSelector('form > div.input-block > input[type=text]', { timeout: 10000 });
    await page.type('form > div.input-block > input[type=text]', searchTerm);

    // Press 'Enter' to start the search
    await page.keyboard.press('Enter');
    
    // Wait for search results to load
    await page.waitForSelector('.product-list-type .product', { timeout: 30000 });

    // Initialize an empty array to store results
    let results = [];
    results = results.concat(await scrapePageResults(page));

    const currentUrl = page.url();  // Capture the current URL for pagination

    // Loop to scrape additional pages (up to 5 pages)
    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        try {
            const nextPageUrl = `${currentUrl}&p=${pageNum}`;
            await page.goto(nextPageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
            await page.waitForSelector('.product-list-type .product', { timeout: 30000 });
            results = results.concat(await scrapePageResults(page));  // Append results from the current page
        } catch (error) {
            console.error(`Error scraping page ${pageNum}:`, error.message);
            // Optionally break the loop if the error is critical
            break;
        }
    }

    return results;  // Return all scraped results
};

// Helper function to scrape results from the current page
const scrapePageResults = async (page) => {
    const items = await page.$$('.product-list-type .product');  // Select all products
    const pageResults = [];
    
    for (const item of items) {
        try {
            // Extract necessary product details
            const desc = await item.$eval('.product-title > h2', el => el.textContent.trim());
            const link = await item.$eval('.product-image > a', el => el.getAttribute('href'));
            const price = await item.$eval('.price', el => el.textContent.trim());
            const img = await item.$eval('div.product-image > a > span > img', el => el.getAttribute('src'));

            // Push the scraped data into the results array for the current page
            pageResults.push({ website: "trodo", desc, link, price, img });
        } catch (error) {
            console.error('Error scraping item:', error.message, ' in trodo');
        }
    }
    
    return pageResults;  // Return the scraped results for the current page
};

module.exports = scrapeTrodo;
