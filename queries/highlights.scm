[
 "def"
 "let"
 "in"
 "extern"
 ] @keyword
[
 "true"
 "false"
 ] @Boolean
[
 "if"
 "else"
 ] @keyword.conditional
(number) @number
(identifier) @variable
"main" @function
(extern name: (identifier) @function)
(decl name: (identifier) @function)
(ids (identifier) @variable.parameter)
(binop_expr call: (identifier) @function)
[
 (prim1)
 ] @function.builtin
[
  (prim2)
  "="
  ":="
 ] @operator
(main (identifier) @variable.parameter)
