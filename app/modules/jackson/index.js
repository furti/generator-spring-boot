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
  //Dateserializer is based on LocalDate so we need at least java 1.8
  if (generator.javaVersion === '1.6' || generator.javaVersion === '1.7') {
    return;
  }

  var package = generator.mainPackagePath('util');

  generator.fs.copyTpl(
    generator.templatePath('classes/util/DateUtils.java'),
    package + '/DateUtils.java',
    {
      basePackage: generator.basePackage
    }
  );

  generator.fs.copyTpl(
    generator.templatePath('classes/util/LocalDateSerializer.java'),
    package + '/LocalDateSerializer.java',
    {
      basePackage: generator.basePackage
    }
  );

  generator.fs.copyTpl(
    generator.templatePath('classes/util/LocalDateTimeSerializer.java'),
    package + '/LocalDateTimeSerializer.java',
    {
      basePackage: generator.basePackage
    }
  );

  generator.fs.copyTpl(
    generator.templatePath('classes/util/LocalDateDeserializer.java'),
    package + '/LocalDateDeserializer.java',
    {
      basePackage: generator.basePackage
    }
  );

  generator.fs.copyTpl(
    generator.templatePath('classes/util/LocalDateTimeDeserializer.java'),
    package + '/LocalDateTimeDeserializer.java',
    {
      basePackage: generator.basePackage
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
