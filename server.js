const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/run', (req, res) => {
    const code = req.body.code;
    exec(`node -e "${code}"`, (error, stdout, stderr) => {
        if (error) {
            return res.json({ error: stderr });
        }
        res.json({ result: stdout });
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));