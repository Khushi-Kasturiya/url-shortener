const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortURL.js');
const validUrl = require('valid-url');
const shortId = require('shortid');
const QRCode = require('qrcode');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI);

app.post('/api/shorten', async (req, res) => {
    const { originalUrl, customAlias } = req.body;
    const baseUrl = process.env.BASE_URL;

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    if (validUrl.isUri(originalUrl)) {
        try {
            let urlCode = customAlias ? customAlias : shortId.generate();
            if(customAlias){
                const existingUrl = await ShortUrl.findOne({ urlCode: customAlias });
                if(existingUrl){
                    return res.status(409).json('Alias already exists');
                }
            }
            let shortUrl = await ShortUrl.findOne({ originalUrl });

            if (shortUrl) {
                const qrCodeDataURL = await QRCode.toDataURL(shortUrl.shortBaseUrl);
                res.json({ ...shortUrl.toObject(), qrCodeDataURL });
            } else {
                const shortBaseUrl = `${baseUrl}/${urlCode}`;
                shortUrl = new ShortUrl({
                    originalUrl,
                    shortBaseUrl,
                    urlCode,
                    date: new Date(),
                });
                await shortUrl.save();
                const qrCodeDataURL = await QRCode.toDataURL(shortBaseUrl);
                res.json({ ...shortUrl.toObject(), qrCodeDataURL });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid original URL');
    }
});

app.get('/:code', async (req, res) => {
    try {
        const urlCode = req.params.code;
        const url = await ShortUrl.findOne({ urlCode });

        if (url) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));