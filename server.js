#!/usr/bin/env node
'use strict';
const app = require('express')();
const params = require('./src/params');
const compress = require('./src/compress');

const PORT = process.env.PORT || 8080;

app.get('/', params, compress);
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
