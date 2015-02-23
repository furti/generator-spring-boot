/**
 * Created by Daniel on 22.02.2015.
 */

function MavenModule() {
}

MavenModule.prototype.init = function (generator) {
  //Nothing to do here
};

MavenModule.prototype.prompts = function (generator) {
  return [];
};

MavenModule.prototype.answer = function (props, generator) {

};

MavenModule.prototype.configure = function (generator) {
  //nothing to do here
};

MavenModule.prototype.write = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('pom.xml'),
    generator.destinationPath('pom.xml'),
    {
      app: generator.app,
      springVersion: generator.springVersion,
      javaVersion: generator.javaVersion,
      useLogback: generator.useLogback,
      startClass: generator.basePackage + '.' + generator.capitalize(generator.app.name) + 'Application'
    }
  );
};

MavenModule.prototype.install = function (generator) {
  //Nothing to do here
};

MavenModule.prototype.end = function (generator) {
  //Nothing to cleanup
};

module.exports = new MavenModule();
