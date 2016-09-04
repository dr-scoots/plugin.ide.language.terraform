define(function(require, exports, module) {
  main.consumes = [
    "Plugin", "language", "jsonalyzer", "ace"
  ];
  main.provides = ["language.terraform"];
  return main;

  function main(options, imports, register) {
    var Plugin = imports.Plugin;
    var language = imports.language;
    var ja = imports.jasonanalyzer;
    var ace = imports.ace;

    ace.defineSyntax({
      id: 'terraform',
      name: 'plugins/plugin.ide.language.terraform/mode/terraform',
      caption: 'Terraform',
      extensions: 'tf'
    });

    var plugin = new Plugin("language.terraform.org", main.consumes);
    // var emit = plugin.getEmitter();

    plugin.on("load", function () {
      language.registerLanguageHandler(
        "plugins/plugin.ide.language.terraform/worker/terraform_handler",
        function(err, handler) {
          if (err) return console.error(err);
        },
        plugin
      );
    });

    register(null, {
      "language.terraform": plugin
    });
  }
});