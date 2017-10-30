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
            console.log(req.body);
            collection.find({}).toArray(function (mongoError, data) {
                if (mongoError) throw mongoError;
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    if (data[i]['id'] === req.body.id) {
                        return res.send({
                            title: 'Не жульничай. Голосовать можно только 1 раз. :)'
                        });
                    }
                }
                if(req.body.answers[0] === '1-3' && req.body.answers[1] === '2-1' && req.body.answers[2] === '3-2' && req.body.answers[3] === '4-4'&&
                    req.body.answers[4] === '5-1' && req.body.answers[5] === '6-3' && req.body.answers[6] === '7-2' && req.body.answers[7] === '8-2' &&
                    req.body.answers[8] === '9-1' && req.body.answers[9] === '10-1') {

                    collection.insert({
                        id: req.body.id,
                        pass: 1
                    });
                    return res.send({
                        title: 'success'
                    });
                } else {
                    collection.insert({
                        id: req.body.id,
                        pass: 0
                    });
                    return res.send({
                        title: 'success!'
                    });
                }

            });
        });

});

var server = app.listen(port, function () {
    console.log('Server running at http://localhost:' + server.address().port);
});