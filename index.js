const express = require('express');

const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});

app.get('/', (req, res) => {
    res.json({
        hello: 'world'
    })
})

app.use((req, res) => {
    res.json({
        not_found: true
    })
})