
export const express = require('express');
export const path = require('path');

export const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.get('/', function(req:any, res:any) {res.sendFile(path.join(__dirname, '/build', 'index.html'));});

app.listen(9000);