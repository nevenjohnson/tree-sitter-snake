/**
 * @file Adder grammar for tree-sitter
 * @author Neven Johnson <neven@umich.edu>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

export default grammar({
  name: "adder",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello",
  }
});
