'use strict';

var express = require('express'),
	path = require('path'),
    router = express.Router(),
    jsonfile = require('jsonfile');
 

module.exports = function(models) {
	router.post('/edit', function(req, res) {
        if(req.user) {
            if(req.user.id_str == '149622994') {
            var file = path.join(__dirname, '/../../db/collection.json');
                jsonfile.readFile(file, function(err, obj) {
                    obj[req.body.path][req.body.id] = req.body.value
                    jsonfile.writeFile(file, obj, { spaces:2, mode:0o777 },function(){
                        res.send({code:200, message:'saved collection.json'});
                    })
                })
            } else {
                res.send({ code:401, message:'not authorized'} );
            }
        } else {
            res.send({ code:402, message:'not authentificated'} );
        }
    });
    router.post('/fileupload', function(req, res) {
        console.log(req)
        res.send(req)
    });

    router.get('/edit/is_authorized', function(req, res) {
        if(req.user) {
            res.json(req.user);
        } else {
            res.json({});
        }
    });
  return router;
};

