"def" @keyword
"let" @keyword
"in" @keyword
(number) @number
(identifier) @variable
"main" @function
[
  "+"
  "-"
  "*"
  "="
 ] @operator
(source_file (identifier) @variable.parameter)
