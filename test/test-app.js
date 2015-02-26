'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var extend = require('extend');

function escapeRegExp(string) {
  return new RegExp(string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1"));
}

function xmlTagRegex(tagname, content) {
  var regex = '<' + tagname + '>' + content + '</' + tagname + '>';

  return escapeRegExp(regex);
}

describe('spring-boot:app', function () {
  var tmpDir = path.join(os.tmpdir(), './spring-boot-test');

  var baseAnswers = {
    groupId: 'at.test',
    artifactId: 'boot',
    version: '1.0.0',
    name: 'boottest',
    description: 'Some description',
    javaVersion: '1.8',
    springVersion: '1.2.2',
    basePackage: 'at.test.boot'
  };

  describe('with defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tmpDir)
        .withPrompts(baseAnswers)
        .on('end', function () {
          done();
        });
    });

    it('files created', function () {
      assert.file([
        '.editorconfig',
        'pom.xml',
        'src/main/java',
        'src/main/resources',
        'src/test/java',
        'src/test/resources',
        'src/main/java/at/test/boot/BoottestApplication.java',
        'src/main/java/at/test/boot/BoottestConfig.java',
        'src/main/java/at/test/boot/util/DateUtils.java',
        'src/main/java/at/test/boot/util/LocalDateSerializer.java',
        'src/main/java/at/test/boot/util/LocalDateTimeSerializer.java',
        'src/main/java/at/test/boot/util/LocalDateDeserializer.java',
        'src/main/java/at/test/boot/util/LocalDateTimeDeserializer.java',
        'src/main/resources/logback.xml',
        'src/main/resources/config/application.properties',
        'src/main/resources/templates/index.html',
        'src/main/java/at/test/boot/TemplateController.java'
      ]);
    });

    it('pom.xml', function () {
      assert.fileContent([
        ['pom.xml', xmlTagRegex('groupId', 'at.test')],
        ['pom.xml', xmlTagRegex('artifactId', 'boot')],
        ['pom.xml', xmlTagRegex('version', '1.0.0')],
        ['pom.xml', xmlTagRegex('name', 'boottest')],
        ['pom.xml', xmlTagRegex('description', 'Some description')],
        ['pom.xml', xmlTagRegex('java.version', '1.8')],
        ['pom.xml', xmlTagRegex('start-class', 'at.test.boot.BoottestApplication')],
        ['pom.xml', xmlTagRegex('version', '1.2.2')],
        ['pom.xml', xmlTagRegex('groupId', 'ch.qos.logback')],
        ['pom.xml', xmlTagRegex('artifactId', 'logback-classic')]
      ]);
    });

    it('BoottestApplication.java', function () {
      var file = 'src/main/java/at/test/boot/BoottestApplication.java';
      assert.fileContent([
        [file, escapeRegExp('package at.test.boot')],
        [file, escapeRegExp('import org.springframework.boot.SpringApplication;')],
        [file, escapeRegExp('import org.springframework.context.annotation.Configuration;')],
        [file, escapeRegExp('import org.springframework.context.annotation.Import;')],
        [file, escapeRegExp('@Import(BoottestConfig.class)')],
        [file, escapeRegExp('public class BoottestApplication {')],
        [file, escapeRegExp('SpringApplication.run(BoottestApplication.class, args);')]
      ]);
    });

    it('BoottestConfig.java', function () {
      var file = 'src/main/java/at/test/boot/BoottestConfig.java';
      assert.fileContent([
        [file, escapeRegExp('package at.test.boot')],
        [file, escapeRegExp('import org.springframework.boot.autoconfigure.SpringBootApplication;')],
        [file, escapeRegExp('import org.springframework.context.annotation.Bean;')],
        [file, escapeRegExp('import java.time.LocalDate;')],
        [file, escapeRegExp('import java.time.LocalDateTime;')],
        [file, escapeRegExp('import at.test.boot.util.LocalDateDeserializer;')],
        [file, escapeRegExp('import at.test.boot.util.LocalDateSerializer;')],
        [file, escapeRegExp('import at.test.boot.util.LocalDateTimeDeserializer;')],
        [file, escapeRegExp('import at.test.boot.util.LocalDateTimeSerializer;')],
        [file, escapeRegExp('import com.fasterxml.jackson.core.Version;')],
        [file, escapeRegExp('import com.fasterxml.jackson.databind.Module;')],
        [file, escapeRegExp('import com.fasterxml.jackson.databind.module.SimpleModule;')],
        [file, escapeRegExp('public class BoottestConfig {')],
        [file, escapeRegExp('public Module dateModule() {')]
      ]);
    });

    it('application.properties', function () {
      var file = 'src/main/resources/config/application.properties';
      assert.fileContent([
        [file, escapeRegExp('server.port=8080')]
      ]);
    });

    it('index.html', function () {
      var file = 'src/main/resources/templates/index.html';
      assert.fileContent([
        [file, xmlTagRegex('title', 'boottest')],
        [file, xmlTagRegex('h1', 'Hello, boottest!')]
      ]);
    });

    it('TemplateController.java', function () {
      var file = 'src/main/java/at/test/boot/TemplateController.java';
      assert.fileContent([
        [file, escapeRegExp('package at.test.boot;')]
      ]);
    });
  });

  describe('no logback', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tmpDir)
        .withPrompts(extend({
          useLogback: false
        }, baseAnswers)
      ).on('end', function () {
          done();
        });
    });

    it('no logback.xml', function () {
      assert.noFile('src/main/resources/logback.xml');
    });

    it('pom.xml', function () {
      assert.noFileContent([
        ['pom.xml', xmlTagRegex('groupId', 'ch.qos.logback')],
        ['pom.xml', xmlTagRegex('artifactId', 'logback-classic')]
      ]);
    });
  });

  describe('no isodate', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(tmpDir)
        .withPrompts(extend({
          enableISODate: false
        }, baseAnswers)
      ).on('end', function () {
          done();
        });
    });

    it('no DateUtils', function () {
      assert.noFile([
        'src/main/java/at/test/boot/util/DateUtils.java',
        'src/main/java/at/test/boot/util/LocalDateSerializer.java',
        'src/main/java/at/test/boot/util/LocalDateTimeSerializer.java',
        'src/main/java/at/test/boot/util/LocalDateDeserializer.java',
        'src/main/java/at/test/boot/util/LocalDateTimeDeserializer.java'
      ]);
    });

    it('BoottestConfig.java', function () {
      var file = 'src/main/java/at/test/boot/BoottestConfig.java';
      assert.noFileContent([
        [file, escapeRegExp('public Module dateModule() {')]
      ]);
    });
  });
});
