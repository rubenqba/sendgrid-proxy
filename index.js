const express = require('express');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const port = process.env.PORT;
const host = process.env.HOSTNAME;
const redirect = process.env.REDIRECT;
const SENDGRID_URL = 'https://sendgrid.net';

app.use(morgan('dev'));

app.use('/', createProxyMiddleware({
    target: SENDGRID_URL,
    changeOrigin: true,
    secure: false,
    headers: {
        'Host': `${redirect}`
    }
}));

app.listen(port, host, () => {
    console.log(`Starting Proxy at ${host}:${port}`);
    console.log(`posting env: ${JSON.stringify(process.env, null, 2)}`);
});
