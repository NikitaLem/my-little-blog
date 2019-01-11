var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(express.static(__dirname + '/dist'));
app.listen(3000, function () { return console.log('Server running...'); });
