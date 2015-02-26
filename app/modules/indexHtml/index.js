/**
 * Created by Daniel on 22.02.2015.
 */
function IndexModule() {

}

IndexModule.prototype.init = function (generator) {
};

IndexModule.prototype.prompts = function (generator) {
  return [];
};

IndexModule.prototype.answer = function (props, generator) {
};

IndexModule.prototype.configure = function (generator) {
};

IndexModule.prototype.write = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('index.html'),
    generator.htmlFilePath + 'index.html', {
      app: generator.app
    }
  );
};

IndexModule.prototype.install = function (generator) {
  //Nothing to do here
};

IndexModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new IndexModule();
