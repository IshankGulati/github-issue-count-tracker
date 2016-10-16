var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'dist')));


app.set('port', (process.env.PORT || '3000'));
app.listen(app.get('port'));

module.exports = app;