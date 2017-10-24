var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var Joi = require('joi');
var assert = require('assert');
var cors = require('cors');

var app = express();

var url = 'mongodb://generatorr:IamVladik1994@ds231315.mlab.com:31315/rapnewstest';
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var schema = Joi.object().keys({
    name: Joi.any(),
    score: Joi.number().integer().required()
});

app.get('/', function (req, res) {
    //
    // MongoClient.connect(url, function(err, database) {
    //     assert.equal(null, err);
    //     var collection = database.collection('gameScore');
    //     collection.find().sort({score: 1}).toArray(function (mongoError, data) {
    //         if(mongoError) throw mongoError;
    //         res.send({
    //             title: data
    //         });
    //     });
    // })
});

app.post('/', function (req, res) {

    MongoClient.connect(url, function(err, database) {
        var collection = database.collection('results');
        assert.equal(null, err);
        collection.insert({
            name: req.body.name || 'Unknown player',
            score: req.body.score
        });
    });

    res.send({
        title: 'Success'
    });

});

var server = app.listen(port, function () {
    console.log('Server running at http://localhost:' + server.address().port);
});