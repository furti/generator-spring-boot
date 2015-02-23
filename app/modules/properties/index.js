/**
 * Created by Daniel on 22.02.2015.
 */

function PropsModule() {
}

PropsModule.prototype.init = function (generator) {
  //Nothing to do here
};

PropsModule.prototype.prompts = function (generator) {
  return [{
    type: 'input',
    name: 'serverPort',
    message: 'Server port',
    default: '8080'
  }];
};

PropsModule.prototype.answer = function (props, generator) {
  generator.serverProps = {
    port: props.serverPort
  };
};

PropsModule.prototype.configure = function (generator) {
  //Nothing to do here
};

PropsModule.prototype.write = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('application.properties'),
    generator.mainResourcePath('config/application.properties'),
    {server: generator.serverProps}
  );
};

PropsModule.prototype.install = function (generator) {
  //Nothing to do here
};

PropsModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new PropsModule();
