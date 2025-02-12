const scrapeRD24 = async (page, searchTerm) => {
    const results = [];

    await page.goto('https://www.rezervesdalas24.lv/', { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForSelector('div.header-middle__input > form > input[type=text]', { timeout: 10000 });
    await page.type('div.header-middle__input > form > input[type=text]', searchTerm);
    await page.keyboard.press('Enter');
    await page.waitForSelector('.listing-wrapper .product-card', { timeout: 30000 });

    // Scrape results from the first page
    await scrapePageResults(page, results);
    const currentUrl = page.url();
    // Loop to scrape additional pages (up to 5 pages)
    for (let pageNum = 2; pageNum <= 5; pageNum++) {
        const nextPageUrl = `${currentUrl}&pg=${pageNum}`; // Append the ?pg={pageNum} parameter
        
        await page.goto(nextPageUrl, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.waitForSelector('.listing-wrapper .product-card', { timeout: 30000 });

        await page.solveRecaptchas();
        // Scrape results from the current page
        await scrapePageResults(page, results);
    }

    await page.close();
    return results;
};

// Helper function to scrape results from the current page
const scrapePageResults = async (page, results) => {
    const items = await page.$$('.listing-wrapper .product-card'); // Use correct selector

    for (const item of items) {
        const link = await item.$eval('.product-card__title-link', el => el.getAttribute('href'));
        
        const desc = await item.$eval('.product-card__title-link', el => {
            const mainText = el.childNodes[0].textContent.trim();
            const highlightedText = el.querySelector('.highlight')?.textContent.trim() || '';
            const subtitle = el.querySelector('.product-card__subtitle')?.textContent.trim() || '';
            return `${mainText}${highlightedText} ${subtitle}`.trim();
        });
        const price = await item.$eval('.product-card__new-price', el => el.textContent.trim());
        const img = await item.$eval('div.product-card__pictures > div.product-card__image > span > img', el => el.getAttribute('src'));
        results.push({ website: "RezervesDaļas24", link, desc, price, img });
    }
};

module.exports = scrapeRD24;
