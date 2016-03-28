var pkgjson = require('./package.json');
var path = require('path');
var fs = require('fs-extra');
const exec = require('child_process').exec;
module.exports = function(grunt) {

    var config = {
        pkg: pkgjson,
        baseUrl: '.'
    };

    grunt.initConfig({
        config: config,
        pkg: config.pkg

    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('project', 'Project Manager', function(action, value) {
      if (arguments.length === 0) {
        grunt.log.writeln(this.name + ", no args");
      } else {
        if(action == "express") {
          var done = this.async();
          vag = shell_cmd('vagrant up');
          vag.on('exit',done)
        }
      }
    });
};
function shell_cmd(cmd){
    return exec(cmd, (error, stdout, stderr) => {
        if (error !== null) {
            console.log(`exec error: ${error}`);
        }
    });
}

function generatePortNumber(){
    return Math.floor((Math.random() * 99999) + 1000);
}