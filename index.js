// index.js
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 8080;

app.get('/data', async (req, res) => {
    const { n, m } = req.query;

    try {
        const filePath = `/tmp/data/${n}.txt`;
        const fileContent = await fs.readFile(filePath, 'utf-8');

        if (m) {
            const lines = fileContent.split('\n');
            const lineNumber = parseInt(m, 10);
            const requestedLine = lines[lineNumber - 1];
            res.send(requestedLine);
        } else {
            res.send(fileContent);
        }
    } catch (error) {
        res.status(404).send('File not found.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
