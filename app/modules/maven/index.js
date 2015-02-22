/**
 * Created by Daniel on 22.02.2015.
 */

function MavenModule() {
}

MavenModule.prototype.init = function (generator) {
  //Nothing to do here
};

MavenModule.prototype.prompts = function (generator) {
  return [{
    type: 'input',
    name: 'groupId',
    message: 'The maven group id for this application',
    validate: generator.notBlank
  }, {
    type: 'input',
    name: 'artifactId',
    message: 'The maven artifact id for this application',
    validate: generator.notBlank
  }, {
    type: 'input',
    name: 'version',
    message: 'The maven version for this application',
    default: '0.0.1-SNAPSHOT'
  }];
};

MavenModule.prototype.answer = function (props, generator) {
  generator.app = {
    groupId: props.groupId,
    artifactId: props.artifactId,
    version: props.version
  };
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
      useLogback: generator.useLogback
    }
  );
};

MavenModule.prototype.end = function (generator) {
  //Nothing to cleanup
};

module.exports = new MavenModule();
