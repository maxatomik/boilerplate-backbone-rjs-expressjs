'use strict';
const exec = require('child_process').exec;
var prompt = require('prompt');
  prompt.start();
  prompt.get(['repository'], function (err, result) {
    exec('git remote remove origin', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      } else {
        process.env.REPO = result.repository;
        exec('git remote add origin ' + result.repository, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          } else {
          }
      });
        console.log('repository: ' + process.env.REPO);
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });
    
});

