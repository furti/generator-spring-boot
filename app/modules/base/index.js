/**
 * Created by Daniel on 22.02.2015.
 */

var path = require('path');
var fs = require('fs-extra');

function BaseModule() {

}

BaseModule.prototype.init = function (generator) {
  generator.mainPackagePath = function (subPath) {
    return this.destinationPath(path.join('src/main/java', generator.basePackage.replace(/\./g, '/'), subPath));
  };

  generator.mainResourcePath = function (subPath) {
    return this.destinationPath(path.join('src/main/resources', subPath));
  };

  generator.testPackagePath = function (subPath) {
    return this.destinationPath(path.join('src/test/java', generator.basePackage.replace(/\./g, '/'), subPath));
  };

  generator.testResourcePath = function (subPath) {
    return this.destinationPath(path.join('src/test/resources', subPath));
  };

  generator.notBlank = function (value) {
    if (!value || value.trim().length === 0) {
      return 'Entered value must not be blank';
    }

    return true;
  }

  generator.javaVersion = generator.config.get('javaVersion');
  generator.basePackage = generator.config.get('basePackage');
};

BaseModule.prototype.prompts = function (generator) {
  return [{
    type: 'input',
    name: 'javaVersion',
    message: 'The Java version to use',
    choices: ['1.6', '1.7', '1.8'],
    default: '1.8'
  }, {
    type: 'input',
    name: 'basePackage',
    message: 'The base package for your app',
    default: generator.basePackage,
    validate: generator.notBlank
  }, {
    type: 'input',
    name: 'springVersion',
    message: 'The spring boot version to use',
    default: '1.2.1.RELEASE'
  }];
};

BaseModule.prototype.answer = function (props, generator) {
  generator.springVersion = props.springVersion;
  generator.basePackage = props.basePackage;
  generator.javaVersion = props.javaVersion;
};

BaseModule.prototype.configure = function (generator) {
//Create the .editorconfig
  generator.fs.copy(
    generator.templatePath('editorconfig'),
    generator.destinationPath('.editorconfig')
  );

  generator.config.set('javaVersion', generator.javaVersion);
  generator.config.set('basePackage', generator.basePackage);
};

BaseModule.prototype.write = function (generator) {
  var mainPackage = generator.mainPackagePath(''),
    mainResource = generator.mainResourcePath(''),
    testPackage = generator.testPackagePath(''),
    testResource = generator.testResourcePath('');

  //Create the required folders
  fs.mkdirsSync(mainPackage);
  fs.mkdirsSync(mainResource);
  fs.mkdirsSync(testPackage);
  fs.mkdirsSync(testResource);
};

BaseModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new BaseModule();
