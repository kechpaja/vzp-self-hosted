" Vim syntax file
" Language: 	VZP
" Maintainer: 	Kelvin Jackson (kechpaja)
" Last Change: 	13 Sept 2020
" Version: 0

if exists("b:current_syntax")
  finish
endif

" ############
" # Comments #
" ############

syn region vzpComment 	start="/\*" end="\*/" contains=vzpTodo
syn keyword vzpTodo		TODO XXX


" #############
" # Constants #
" #############

" Strings
syn region vzpString start=+\z(["]\)+ end="\z1"

" ##############
" # Statements #
" ##############

syn keyword vzpBoolean          true false
syn keyword vzpConditional      if then else
syn keyword vzpException        throw
syn keyword vzpImport           import as
syn keyword vzpKeyword          let
syn keyword vzpReservedWord     recur self print

" Identifiers
syn match vzpIdentifier "[a-zA-Z_][a-zA-Z0-9_]*"

" Numbers 
syn match vzpNumber "\d\d*"
"syn match vzpNumber "[0-9]+[.][0-9]*"


highlight link vzpBoolean       Boolean
highlight link vzpComment       Comment
highlight link vzpConditional   Conditional
highlight link vzpException     Exception
highlight link vzpImport        PreProc
highlight link vzpKeyword       Keyword
highlight link vzpNumber        Number
highlight link vzpReservedWord  Identifier
highlight link vzpString        String
highlight link vzpTodo          Todo

let b:current_syntax = "vzp"
