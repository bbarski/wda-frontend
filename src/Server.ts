
export const express = require('express');
export const path = require('path');
export const cors = require('cors');

export const app = express();

app.use(cors({
    origin: "*",
    allowedHeaders: "Content-type",
    methods: "GET,POST,PUT,DELETE,OPTIONS" }));

app.use(function(req:any, res:any, next:any) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('/', function(req:any, res:any) {res.sendFile(path.join(__dirname, '../build', 'index.html'));});

app.listen(80, () => console.log("Started"));