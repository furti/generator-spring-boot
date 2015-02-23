/**
 * Created by Daniel on 22.02.2015.
 */

function LogbackModule() {
}

LogbackModule.prototype.init = function (generator) {
  //Nothing to do here
};

LogbackModule.prototype.prompts = function (generator) {
  return [{
    type: 'confirm',
    name: 'useLogback',
    message: 'Add logback for logging',
    default: true
  }];
};

LogbackModule.prototype.answer = function (props, generator) {
  generator.useLogback = props.useLogback;
};

LogbackModule.prototype.configure = function (generator) {
};

LogbackModule.prototype.write = function (generator) {
  if (generator.useLogback) {
    generator.fs.copy(
      generator.templatePath("logging/logback.xml"),
      generator.mainResourcePath('logback.xml')
    );
  }
};

LogbackModule.prototype.install = function (generator) {
  //Nothing to do here
};

LogbackModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new LogbackModule();
