/**
 * Created by Daniel on 22.02.2015.
 */

function AppModule() {
}

AppModule.prototype.init = function (generator) {
  //Nothing to do here
};

AppModule.prototype.prompts = function (generator) {
  return [];
};

AppModule.prototype.answer = function (props, generator) {
  //Nothing to do here
};

AppModule.prototype.configure = function (generator) {
  //Nothing to do here
};

AppModule.prototype.write = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('classes/Application.java'),
    generator.mainPackagePath('Application.java'),
    {basePackage: generator.basePackage}
  );
};

AppModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new AppModule();
