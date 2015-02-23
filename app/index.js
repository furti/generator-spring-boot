'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    //Setup all modules
    var modules = this.fs.readJSON(path.join(this.resolved, '../modules/modules.json'));
    this.modules = [];
    var generator = this;

    modules.forEach(function (module) {
      var module = require('./modules/' + module);
      module.init(generator);

      generator.modules.push(module);
    });
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(
      'Welcome to ' + chalk.green('SpringBoot') + ' generator! \n Answer a few questions and you project will be set up in a couple of seconds.\n'
    );

    var prompts = [],
      generator = this;

    this.modules.forEach(function (module) {
      prompts = prompts.concat(module.prompts(generator));
    });


    this.prompt(prompts, function (props) {
      this.modules.forEach(function (module) {
        module.answer(props, generator);
      });
      done();
    }.bind(this));
  },

  configuring: function () {
    var generator = this;

    this.modules.forEach(function (module) {
      module.configure(generator);
    });
  },

  writing: function () {
    var generator = this;

    this.modules.forEach(function (module) {
      module.write(generator);
    });
  },
  install: function () {
    var generator = this;

    this.modules.forEach(function (module) {
      module.install(generator);
    });

    //this.spawnCommand('git', ['init']);
  },
  end: function () {
    var generator = this;

    this.modules.forEach(function (module) {
      module.end(generator);
    });

    this.log('You application is set up now. Have fun using it!');
  }
});
