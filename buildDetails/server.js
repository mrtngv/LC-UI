const express = require('express');
const app = express();

const port = 8080;

app.use(express.static(__dirname));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(function (req, res, next) {
    res.setHeader("Strict-Transport-Security", "max-age=31536000");
    next();
});

app.listen(port, () => console.log(`Server running on $(port)!`));