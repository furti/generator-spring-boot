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
  var className = generator.capitalize(generator.app.name);

  generator.fs.copyTpl(
    generator.templatePath('classes/Application.java'),
    generator.mainPackagePath(className + 'Application.java'),
    {
      basePackage: generator.basePackage,
      appClass: className
    }
  );

  generator.fs.copyTpl(
    generator.templatePath('classes/AppConfig.java'),
    generator.mainPackagePath(className + 'Config.java'),
    {
      basePackage: generator.basePackage,
      appClass: className,
      registerJacksonDateModule: generator.javaVersion === '1.8'
    }
  );
};

AppModule.prototype.install = function (generator) {
  //Nothing to do here
};

AppModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new AppModule();
