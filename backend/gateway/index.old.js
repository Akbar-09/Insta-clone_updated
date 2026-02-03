const express = require('express');
const app = express();

app.get('/health', (req, res) => res.send('HEALTH OK'));

app.use((req, res) => {
    res.status(404).send(`Catch All: ${req.method} ${req.url}`);
});

app.listen(5000, () => console.log('Minimal Gateway on 5000'));
