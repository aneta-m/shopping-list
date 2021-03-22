const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(cors({ origin: true, }));
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json({ strict: true, }));
app.use((req, res, next) => {

    next();
});

/**
 * This is just a helper that reads files content and transforms them to json object
 */
const readFile = async (filePath) => {
    try {
        console.warn(filePath);
        const normalizedPath = path.join(__dirname, ...filePath.split(/^[a-z0-9\-]/gim));
        const fileContent = await fs.readFile(normalizedPath, 'utf-8');
        console.log('Reading file:', normalizedPath);
        console.log('File content:', fileContent);

        return JSON.parse(fileContent);
    } catch (error) {
        console.error('Read file error:', error);
        return null;
    }
};

/**
 * Optional wrapper (classic closure) that returns reqest handler with readFile functionality and build in error handler
 * @param {string} filePath path to file relative to index.js
 * @example './models/your-file.json'
 * @returns {Function} async request handler callback that is consumed by `app`'s method like `.get`, `.post` etc.
 */
const withFile = (filePath, write) => async (req, res) => {
    let file = null;
    console.warn('BODY:', req.body);
    console.log('QUERY', req.query);
    console.log('URL PARAMS', req.params);
    if (write) {
        const result = await fs.writeFile(
            path.join(__dirname, 'saved', ...filePath.split(/^[a-z0-9\-]/gim)),
            JSON.stringify(req.body)
        );



        return res.json(req.body);
    } else {
        file = await readFile(filePath);
    }

    if (file) {
        res.send(file);
    } else {
        res.status(404).send({ message: `File not found or invalid json format: ${filePath}` });
    }
};

/**
 * Start here adding your custom routes
 */
app.get('/', withFile('./models/dupa.json'));
app.get('/api/v1/dupa', withFile('./models/dupa.json'));
app.post('/dupa/:id', withFile('./models/dupa.json', true));
app.get('/manual', async (req, res) => {
    if (req.originalUrl) {
        console.log('original request url', req.originalUrl);
        return res.json({
            other: '123'
        });
    } else {
        // example how to set error
        res.status(400).json({ message: "Bad request" });
    }
});

// Init server
app.listen(4200, () => {
    console.log(`Server running on port 4200`);
});