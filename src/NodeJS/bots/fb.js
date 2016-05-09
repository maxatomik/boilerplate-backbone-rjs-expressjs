var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var request = require('request');
mongoose.createConnection(process.env.MONGOLAB_URI);

var Post =require('../models/post');
var User =require('../models/user');

var verify_token = process.env.VERIFY_TOKEN;
var token = process.env.TOKEN;

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('Facebook Bot index page');
});

app.get('/webhook', function (req, res) {
    if (req.query['hub.verify_token'] === verify_token) {
        res.send(req.query['hub.challenge']);
    }
    res.send('Error, wrong validation token');
});



app.post('/webhook', function (req, res) {
    var message = {};
    var extra = {};
    var messaging_events = req.body.entry[0].messaging;
    for (var i = 0; i < messaging_events.length; i++) {
        var event = req.body.entry[0].messaging[i];
        var sender = event.sender.id;
        if(event.message !== undefined) {
            message.text = "Coucou";
            sendTextMessage(event.sender.id, message);
        } 
    }
    res.sendStatus(200);
});

app.listen(process.env.PORT, function () {
    console.log('Facebook Messenger on port ' + process.env.PORT);
});
    
function sendTextMessage(recipient_id, message) {
   request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: token},
        method: 'POST',
        json: {
            recipient: { id: recipient_id },
            message : message
        }
    }, function (error, response) {

        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        } else {
            console.log('message sent')
        }

    });
}