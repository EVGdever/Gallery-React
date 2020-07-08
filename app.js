const express = require('express');
const config = require('./config/config');

const app = express();

app.use(express.static('uploads'));
app.use('/upload', require('./routes/upload.routes'));
app.use('/images', require('./routes/image.routes'));

const APP_PORT = config.port || 5000;

function start() {
    try {
        app.listen(APP_PORT, () => console.log(`Server listen port: ${APP_PORT}...`));
    } catch (e) {
        console.log(`Server error: ${e.message}`);
        process.exit(1);
    }
}

start();
