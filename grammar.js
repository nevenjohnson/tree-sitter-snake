/**
 * @file Snake grammar for tree-sitter
 * @author Neven Johnson <neven@umich.edu>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "boa",

  rules: {
    source_file: $ => seq(
      "def",
      "main",
      "(",
      $.identifier,
      ")",
      ":",
      $.expr
    ),

    // let_expr: $ => seq(
    //   "let",
    //   $.bindings,
    //   "in",
    //   $.expr,
    // ),
    //
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

    identifier: $ => /[a-zA-Z][a-zA-Z0-9]*/,

    number: $ => /[+-]?[0-9]+/,
  }
});
