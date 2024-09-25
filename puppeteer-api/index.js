const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cors = require('cors');

const scrapeAutodoc = require('./scraper/autodoc');
const scrapeIC = require('./scraper/ic24');
const scrapeRD24 = require('./scraper/rd24');
const scrapeTrodo = require('./scraper/trodo');

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
    try {
        const searchTerm = req.query.q;

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-infobars',
                '--disable-web-security',
                '--disable-features=IsolateOrigins,site-per-process',
                '--window-size=1200,800',
            ]
        });

        const scrapers = [
            scrapeAutodoc,
            scrapeTrodo,
            scrapeIC,
            scrapeRD24
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
        res.json(combinedResults);
    } catch (error) {
        console.error('Error launching browser or scraping data:', error);
        res.status(500).json({ error: 'Failed to scrape data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
