const express = require('express');

const app = express();
const PORT = 5000;
const fs = require('fs');



app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'https://editor.riinavi.now.sh/');
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


let rawdata = fs.readFileSync('./pacanam.json');
let data = JSON.parse(rawdata);


app.get('/api', (req, res)=>{
    try {
        res.status(200).json({data})
    } catch (e) {
        console.log(e.message)
        res.status(500)
    }
})

app.listen(PORT, () => {
    console.log(`App had been started on port ${PORT}`)
});
