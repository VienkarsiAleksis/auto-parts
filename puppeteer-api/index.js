const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const cors = require('cors');

// Importing scrapers
const scrapeAutodoc = require('./scraper/autodoc');
const scrapeIC = require('./scraper/ic24');
const scrapeRD24 = require('./scraper/rd24');
const scrapeTrodo = require('./scraper/trodo');
const scrapeTOP = require('./scraper/top');

// Setting up Puppeteer plugins
puppeteer.use(StealthPlugin());
puppeteer.use(
    RecaptchaPlugin({
        provider: {
            id: '2captcha',
            token: '52b55d2eae04bbb6370ad1e6a593bfe3',
        },
        visualFeedback: true,
    })
);

// Express application setup
const app = express();
const port = 6969;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Scraping endpoint
app.get('/scrape', async (req, res) => {
    const searchTerm = req.query.q;

    try {
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
            scrapeIC,
            scrapeRD24,
            scrapeTrodo,
            scrapeTOP,
        ];

        const successfulResults = [];

        // Scraping each website using Promises
        const scrapePromises = scrapers.map(async (scraper) => {
            const page = await browser.newPage();
            try {
                const result = await scraper(page, searchTerm);
                successfulResults.push(...result);
            } catch (err) {
                console.error(`Failed to scrape: ${scraper.name}`, err.message);
            } finally {
                await page.close();
            }
        });

        // Wait for all scraping promises to settle
        await Promise.allSettled(scrapePromises);

        await browser.close();

        res.json(successfulResults);
    } catch (error) {
        console.error('Error launching browser or scraping data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
