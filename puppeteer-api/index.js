const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');
const { Cluster } = require('puppeteer-cluster');

const scrapeAutodoc = require('./scraper/autodoc');
const scrapeIC = require('./scraper/ic24');
const scrapeRD24 = require('./scraper/rd24');
const scrapeTrodo = require('./scraper/trodo');
const scrapeTOP = require('./scraper/top');

puppeteer.use(StealthPlugin());

const app = express();
const port = 6969;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/scrape', async (req, res) => {
    const searchTerm = req.query.q;

    // Immediately respond to the client without waiting for scraping
    // res.json({ status: 'scraping started for: ' + searchTerm });

    (async () => {
        try {
            const browser = await puppeteer.launch({
                headless: false, // Use headless mode
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--disable-infobars',
                    '--disable-web-security',
                    '--disable-features=IsolateOrigins,site-per-process',
                    '--window-size=1200x,800',
                ]
            });

            const scrapers = [
                scrapeAutodoc,
                scrapeTrodo,
                scrapeIC,
                scrapeRD24,
                scrapeTOP,
            ];

            const scrapePromises = scrapers.map(scraper => 
                scraper(browser, searchTerm).catch(err => {
                    console.error(`Failed to scrape: ${scraper.name}`, err.message);
                    return []; // Return empty array on failure
                })
            );

            // Wait for all scraping promises to settle
            const results = await Promise.allSettled(scrapePromises);

            // Flatten results, keeping only successful ones
            const combinedResults = results.flatMap(result => 
                result.status === 'fulfilled' ? result.value : []
            );

            await browser.close();

            // You can log the results or save them to a database here if needed
            res.json(combinedResults);
        } catch (error) {
            console.error('Error launching browser or scraping data:', error);
        }
    })();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
