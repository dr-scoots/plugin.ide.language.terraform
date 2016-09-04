/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(function(require, exports, module) {
'use strict';

  // var keywordMapper = this.createKeywordMapper({
  //         "variable.language":
  //           "base64decode|base64encode|base64sha256|sha256|cidrhost|cidrnetmask|cidrsubnet|coalesce|compact|concat|distinct|element|file|format|" +
  //           "formatlist|index|join|jsonencode|keys|length|list|lookup|lower|map|merge|md5|replace|sha1|signum|sort|split|trimspace|upper|uuid|values",
  //         "keyword":
  //             "provider|resource|data",
  //         "storage.type":
  //             "vars|var|variable",
  //         "constant.language":
  //             "null|Infinity|NaN|undefined",
  //         "support.function":
  //             "alert",
  //         "constant.language.boolean": "true|false"
  //     }, "identifier");

  // var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";

  var TerraformHighlightRules = function() {

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.getRules = function() {
      return {
        "start" : [
          {
            token : ["text", "comment"],
            regex : /(^|\s)(#.*)$/
          }, {
            token : ["text", "comment"],
            regex : /(^|\s)(\/\/.*)$/
          }, {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
          }, {
            token : "keyword",
            regex : "\\b(?:provider|data|resource|variable|output|module)\\b",
            next : "tftype_start"
          }, {
            token : "keyword.other",
            regex : "EOF",
          }
        ],
        "def_start" : [
          {
            token : "variable", // single line
            regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)'
          }, {
            token : "keyword.operator", // single line
            regex : '=',
          }, {
            token : "keyword.other",
            regex : "EOF",
          }, {
            token : "string", // single line
            regex : '"',
            next  : "string"
          }, {
            token : "constant.numeric", // hex
            regex : "0[xX][0-9a-fA-F]+\\b"
          }, {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
          }, {
            token : "constant.language.boolean",
            regex : "(?:true|false)\\b"
          }, {
            token : "paren.lparen",
            regex : "[[({]"
          }, {
            token : "paren.rparen",
            regex : /^\}/,
            next  : "start"
          }, {
            token : "paren.rparen",
            regex : "[\\])}]"
          }, {
            token : "text",
            regex : "\\s+"
          }
        ],
        "tftype_start" : [
          {
            token : "text",
            regex : "\\s+"
          }, {
            token : "string",
            regex : '"',
          }, {
            token : "support.variable",
            regex : /[^"]+/,
            next  : "tftype_end"
          },
        ],
        "tftype_end" : [
          {
            token : "string",
            regex : '"',
            next  : "tfname_start"
          }
        ],
        "tfname_start" : [
          {
            token : "text",
            regex : /\s+/
          },{
            token : "paren.lparen",
            regex : "{",
            next  : "def_start"
          }, {
            token : "string",
            regex : '"',
          }, {
            token : "entity.name",
            regex : /[^"]+/,
            next  : "tfname_end"
          }
        ],
        "tfname_end" : [
          {
            token : "string",
            regex : '"',
            next  : "def_start"
          }
        ],
        "string" : [
          {
            token : "constant.language.escape",
            regex : /\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|["\\\/bfnrt])/
          }, {
            token : "keyword.control",
            regex : /\$\{/,
            next  : "reference"
          }, {
            token : "string",
            regex : '[^"\\\\]+'
          }, {
            token : "string",
            regex : '"',
            next  : "def_start"
          }
        ],
        "reference" : [
          {
            token : "entity.name",
            regex : /[^\}]+/,
          }, {
            token : "keyword.control",
            regex : /\}/,
            next : "string"
          }
        ],
        "comment" : [
          {
            token : "comment",
            regex : "\\*\\/",
            next : "start"
          },
          {
            defaultToken : "comment",
            caseInsensitive: true
          }
        ]
      };
    };
  };

  TerraformHighlightRules.getRules = function() {
    return TerraformHighlightRules.$rules;
  };

  exports.TerraformHighlightRules = TerraformHighlightRules;
});