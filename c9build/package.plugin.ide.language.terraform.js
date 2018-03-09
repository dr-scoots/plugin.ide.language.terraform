define("plugins/plugin.ide.language.terraform/package.plugin.ide.language.terraform", [], {
    "name": "plugin.ide.language.terraform",
    "description": "Cloud9 language support for Terraform",
    "version": "0.1.0",
    "author": "Aaron Bawcom",
    "contributors": [
        {
            "name": "Aaron Bawcom",
            "email": "abawcom@gmail.com"
        }
    ],
    "permissions": "world",
    "engines": {
        "c9": ">=3.0.0"
    },
    "repository": {
        "type": "git",
        "url": "http://github.com/clearly/plugin.ide.language.terraform.git"
    },
    "categories": [
        "language"
    ],
    "licenses": [
        "MIT"
    ],
    "c9": {
        "plugins": [
            {
                "packagePath": "plugins/plugin.ide.language.terraform/plugin.ide.language.terraform"
            }
        ]
    }
});

define("plugins/plugin.ide.language.terraform/plugin.ide.language.terraform",[], function(require, exports, module) {
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
