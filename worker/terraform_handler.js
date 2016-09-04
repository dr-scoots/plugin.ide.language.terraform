define(function(require, exports, module) {
  var baseHandler = require("plugins/c9.ide.language/base_handler");
  var handler = module.exports = Object.create(baseHandler);

  console.log('Got Here 1');

  handler.languages = ["terraform"];
  handler.extensions = ["tf"];

  handler.handlesLanguage = function(language) {
    console.log('Got Here 2', language, this);
    return language === 'Terraform' || language === 'plugins/plugin.ide.language.terraform/mode/terraform';
  };

  handler.onDocumentOpen = function(path, doc, oldPath, callback) {
    console.log(path, doc);
  };

  handler.analyze = function(value, ast, callback) {
    console.log('Got Here 3');
    if (ast) {
      callback(null, [{
        pos: { sl: 0, el: 0, sc: 0, ec: 0 },
        type: "info",
        message: "Hey there! I'm an info marker"
      }]);
    } else {
      callback(null);
    }
  };
});