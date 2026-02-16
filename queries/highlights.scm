[
 "def"
 "let"
 "in"
 ] @keyword
[
 "if"
 "else"
 ] @keyword.conditional
(number) @number
(identifier) @variable
"main" @function
(decl name: (identifier) @function)
(ids (identifier) @variable.parameter)
(binop_expr call: (identifier) @function)
[
 "add1"
 "sub1"
 ] @function.builtin
[
  (prim2)
  "="
 ] @operator
(source_file (identifier) @variable.parameter)
