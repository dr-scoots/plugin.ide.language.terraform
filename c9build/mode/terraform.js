define(function(require, exports, module) {
  "use strict";

  var oop = require("ace/lib/oop");
  var JsonMode = require("ace/mode/json").Mode;
  var TerraformHighlightRules = require("./terraform_highlight_rules").TerraformHighlightRules;

  var Mode = function() {
    JsonMode.call(this);
    this.HighlightRules = TerraformHighlightRules;
  };
  oop.inherits(Mode, JsonMode);

  (function() {
    this.createWorker = function(session) {
      return null;
    };

    this.$id = "ace/mode/tarraform";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});