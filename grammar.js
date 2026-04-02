/**
 * @file Snake grammar for tree-sitter
 * @author Neven Johnson <neven@umich.edu>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "snake",

  rules: {
    source_file: $ => choice(
      seq(
        $.externs,
        $.main,
      ),
      $.main,
    ),

    main: $ => seq(
      "def",
      "main",
      "(",
      $.identifier,
      ")",
      ":",
      $.expr
    ),

    extern: $ => seq(
      "extern",
      field("name", $.identifier),
      "(",
      $.ids,
      ")",
    ),

    externs: $ => choice(
      $.extern,
      seq(
        $.extern,
        $.externs,
      ),
    ),

    expr: $ => choice(
      seq(
        "let",
        $.bindings,
        "in",
        $.expr,
      ),
      seq(
        "if",
        $.expr,
        ":",
        $.expr,
        "else",
        ":",
        $.expr,
      ),
      seq(
        $.decls,
        "in",
        $.expr,
      ),
      $.binop_expr,
      $.array,
      prec.right(9,
          seq(
          $.expr,
          "[",
          $.expr,
          "]",
        ),
      ),
      prec.right(9,
        seq(
          $.expr,
          "[",
          $.expr,
          "]",
          ":=",
          $.expr,
        ),
      ),
    ),

    bindings: $ => choice(
      seq(
        $.identifier,
        "=",
        $.expr,
      ),
      seq(
        $.identifier,
        "=",
        $.expr,
        ",",
        $.bindings,
      ),
    ),

    binop_expr: $ => choice(
      $.number,
      $.identifier,
      "true",
      "false",
      prec(8,
        seq(
          "!",
          $.binop_expr,
        ),
      ),
      prec.left(1,
        seq(
          $.expr,
          $.prim2,
          $.expr,
        ),
      ),
      seq(
        $.prim1,
        "(",
        $.expr,
        ")",
      ),
      field("call", seq(
        $.identifier,
        "(",
        ")",
      )),
      field("call", seq(
        $.identifier,
        "(",
        $.exprs,
        ")",
      )),
      seq(
        "(",
        $.expr,
        ")",
      ),
    ),

    prim1: $ => choice(
      "add1",
      "sub1",
      "newArray",
      "length",
      "isBool",
      "isInt",
      "isArray"
    ),

    prim2: $ => choice(
      prec(7, "*"),
      prec(6, "+"),
      prec(6, "-"),
      prec(5, ">"),
      prec(5, "<"),
      prec(5, ">="),
      prec(5, "<="),
      prec(4, "=="),
      prec(4, "!="),
      prec(3, "&&"),
      prec(2, "||"),
    ),

    decls: $ => choice(
      seq(
        $.decls,
        "and",
        $.decl,
      ),
      $.decl,
    ),

    decl: $ => choice(
      seq(
        "def",
        field("name", $.identifier),
        "(",
        $.ids,
        ")",
        ":",
        $.expr,
      ),
      seq(
        "def",
        field("name", $.identifier),
        "(",
        ")",
        ":",
        $.expr,
      ),
    ),

    ids: $ => choice(
      $.identifier,
      seq(
        $.identifier,
        ",",
        $.ids,
      ),
    ),

    exprs: $ => choice(
      $.expr,
      seq(
        $.expr,
        ",",
        $.exprs,
      ),
    ),

    array: $ => choice(
      seq(
        "[",
        "]",
      ),
      seq(
        "[",
        $.exprs,
        "]",
      ),
    ),

    identifier: $ => /[a-zA-Z][a-zA-Z0-9_]*/,

    number: $ => /[+-]?[0-9]+/,
  }
});
