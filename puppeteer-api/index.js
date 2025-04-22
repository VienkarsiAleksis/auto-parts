const express = require('express');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');
const cors = require('cors');

const scrapeAutodoc = require('./scraper/autodoc');
const scrapeIC = require('./scraper/ic24');
const scrapeRD24 = require('./scraper/rd24');
const scrapeTrodo = require('./scraper/trodo');
const scrapeTOP = require('./scraper/top');

// Iestata Puppeteer spraudņus
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

const app = express();
const port = 6969;

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Scraping API maršruts
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

        const scrapers = [scrapeAutodoc, scrapeIC, scrapeRD24, scrapeTrodo, scrapeTOP];
        const successfulResults = [];

        // Izpilda scraping katrai vietnei
        const scrapePromises = scrapers.map(async (scraper) => {
            const page = await browser.newPage();
            try {
                const result = await scraper(page, searchTerm);
                successfulResults.push(...result);
            } catch (err) {
                console.error(`Neizdevās nokasīt: ${scraper.name}`, err.message);
            } finally {
                await page.close();
            }
        });

        await Promise.allSettled(scrapePromises);
        await browser.close();

        res.json(successfulResults);
    } catch (error) {
        console.error('Kļūda, startējot pārlūku vai nokasot datus:', error);
        res.status(500).json({ error: 'Iekšējā servera kļūda' });
    }
});

// Startē serveri
app.listen(port, () => {
    console.log(`Serveris darbojas: http://localhost:${port}`);
});