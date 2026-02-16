/**
 * @file Snake grammar for tree-sitter
 * @author Neven Johnson <neven@umich.edu>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "adder",

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

    expr: $ => choice(
      seq(
        "let",
        $.bindings,
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
      prec(2, "+"),
      prec(2, "-"),
      prec(3, "*"),
    ),

    identifier: $ => /[a-zA-Z][a-zA-Z0-9]*/,

    number: $ => /[+-]?[0-9]+/,
  }
});
