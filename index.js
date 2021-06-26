const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT;
const HOST = 'localhost';
const SENDGRID_URL = 'https://sendgrid.net';

app.use(morgan('dev'));

app.use('/', createProxyMiddleware({
    target: SENDGRID_URL,
    changeOrigin: true,
    secure: false,
    headers: {
        'Host': 'url1234.yourdomain.com'
    }
}));

app.listen(port, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${port}`);
    console.log(`posting env: ${JSON.stringify(process.env, null, 2)}`);
});
