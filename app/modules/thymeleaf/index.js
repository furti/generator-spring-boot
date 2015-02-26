/**
 * Created by Daniel on 22.02.2015.
 */
function ThymeleafModule() {

}

ThymeleafModule.prototype.init = function (generator) {
};

ThymeleafModule.prototype.prompts = function (generator) {
  return [];
};

ThymeleafModule.prototype.answer = function (props, generator) {
};

ThymeleafModule.prototype.configure = function (generator) {
  generator.htmlFilePath = generator.mainResourcePath('templates/');
};

ThymeleafModule.prototype.write = function (generator) {
  generator.fs.copyTpl(
    generator.templatePath('/thymeleaf/TemplateController.java'),
    generator.mainPackagePath('TemplateController.java'),
    {
      basePackage: generator.basePackage
    }
  );
};

ThymeleafModule.prototype.install = function (generator) {
  //Nothing to do here
};

ThymeleafModule.prototype.end = function (generator) {
  //Nothing to do here
};

module.exports = new ThymeleafModule();
