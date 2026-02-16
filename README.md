# Overview

This repo provides a tree-sitter grammar for the Snake language used in EECS 483 at the University of Michigan. It supports multiple versions of the language (Adder, Boa). As of now, there are 2 versions of the grammar for Adder and Boa that can be found by tag. However, since Boa is a superset of the Adder functionality, it should suffice to only use the Boa grammar.

# Installation

To install this grammar with neovim, first ensure you have [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter) installed. Then add something like
```lua
local parser_config = require('nvim-treesitter.parsers').get_parser_configs()
parser_config.snake = {
  install_info = {
    url = 'https://github.com/nevenjohnson/tree-sitter-snake/',
    branch = 'main',
    files = { 'src/parser.c' },
    generate = false,
    queries = 'queries/neovim',
  },
}
```
to your config. Also, make sure you add filetype support for the Snake language with something like
```lua
vim.filetype.add({
    extension = {
	adder = "snake",
	boa = "snake",
    }
})
```
Then, you should be able to install the Snake parser using `:TSInstall snake`. Unfortunately nvim-treesitter will not install tree-sitter queries by default. So to get full syntax highlighting support, you manually need to add the `queries/highlights.scm` file to your neovim queries (e.g. put this file in `~/.config/nvim/queries/snake/highlights.scm`). This should allow you to see syntax highlighting when you open files with the extension `.adder` or `.boa`.
