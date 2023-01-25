

const reservedWords = new Map();
reservedWords.set("null", "NULL_RESERVED_WORD");
reservedWords.set("True", "TRUE_RESERVED_WORD");
reservedWords.set("False", "FALSE_RESERVED_WORD");
reservedWords.set("key", "KEY_RESERVED_WORD");

const constants = new Map();
constants.set("fixed", "FIXED_CONSTANT");

const keywords = new Map();
keywords.set("int", "INTEGER_DATATYPE_KEYWORD");
keywords.set("char", "CHARACTER_DATATYPE_KEYWORD");
keywords.set("str", "STRING_DATATYPE_KEYWORD");
keywords.set("dec", "DECIMAL_DATATYPE_KEYWORD");
keywords.set("boolean", "BOOLEAN_DATATYPE_KEYWORD");
keywords.set("bool", "BOOLEAN_DATATYPE_KEYWORD");
keywords.set("in", "IN_KEYWORD");
keywords.set("if", "IF_KEYWORD");
keywords.set("else", "ELSE_KEYWORD");
keywords.set("match", "MATCH_KEYWORD");
keywords.set("for", "FOR_KEYWORD");
keywords.set("find", "FIND_KEYWORD");
keywords.set("job", "JOB_FUNCTION_KEYWORD");
keywords.set("main", "MAIN_FUNCTION_DECLARATION");
keywords.set("skip", "SKIP_KEYWORD");
keywords.set("stop", "STOP_KEYWORD");
keywords.set("continue", "CONTINUE_KEYWORD");
keywords.set("forward", "FORWARD_JUMP_KEYWORD");
keywords.set("backward", "BACKWARD_JUMP_KEYWORD");
keywords.set("show", "SHOW_KEYWORD");
keywords.set("enter", "ENTER_KEYWORD");

const operators = new Map();
operators.set("+", "ADDITION_OPERATOR");
operators.set("-", "SUBTRACTION_OPERATOR");
operators.set("*", "MULTIPLICATION_OPERATOR");
operators.set("/", "DIVISION_OPERATOR");
operators.set("%", "MODULUS_OPERATOR");
operators.set("&&", "LOGICAL_AND_OPERATOR");
operators.set("||", "LOGICAL_OR_OPERATOR");
operators.set("!", "LOGICAL_NOT_OPERATOR");
operators.set(">", "GREATER_THAN_OPERATOR");
operators.set("==", "EQUALITY_OPERATOR");
operators.set("<=", "LESS_THAN_OR_EQUAL_OPERATOR");
operators.set(">=", "GREATER_THAN_OR_EQUAL_OPERATOR");
operators.set("!=", "NOT_EQUAL_OPERATOR");
operators.set("=", "ASSIGNMENT_OPERATOR");
operators.set("+=", "ADDITION_ASSIGNMENT_OPERATOR");
operators.set("-=", "SUBTRACTION_ASSIGNMENT_OPERATOR");
operators.set("*=", "MULTIPLICATION_ASSIGNMENT_OPERATOR");
operators.set("/=", "DIVISION_ASSIGNMENT_OPERATOR");
operators.set("%=", "MODULUS_ASSIGNMENT_OPERATOR");
operators.set("?", "TERNARY_OPERATOR");
operators.set("...", "TERNARY_OPERATOR");
operators.set("~", "TERNARY_OPERATOR");

const operator = new Map();
operator.set("++", "INCREMENT_OPERATOR");
operator.set("--", "DECREMENT_OPERATOR");

const delimeters = new Map();
delimeters.set(",", "COMMA_DELIMETER");
delimeters.set(";", "SEMICOLON_DELIMETER");

const brackets = new Map();
brackets.set("{", "OPEN_CURLY_BRACKET");
brackets.set("}", "CLOSE_CURLY_BRACKET");
brackets.set("[", "OPEN_SQUARE_BRACKET");
brackets.set("]", "CLOSE_SQUARE_BRACKET");
brackets.set("(", "OPEN_PARENTHESIS_BRACKET");
brackets.set(")", "CLOSE_PARENTHESIS_BRACKET");


const specialCharacters = new Map();
specialCharacters.set("!", "exclamation_mark");
specialCharacters.set("@", "at_symbol");
specialCharacters.set("#", "number_sign_symbol");
specialCharacters.set("$", "dollar_symbol");
specialCharacters.set("%", "percentage_symbol");
specialCharacters.set("^", "caret_symbol");
specialCharacters.set("&", "ampersand_symbol");
specialCharacters.set("*", "asterisk_symbol");
specialCharacters.set("(", "open_round_bracket");
specialCharacters.set(")", "close_round_bracket");
specialCharacters.set("-", "dash_symbol");
specialCharacters.set("_", "underscore_symbol");
specialCharacters.set("+", "plus_symbol");
specialCharacters.set("=", "equal_symbol");
specialCharacters.set(",", "comma_symbol");
specialCharacters.set(".", "period_symbol");
specialCharacters.set("<", "less_than_symbol");
specialCharacters.set(">", "greater_than_symbol");
specialCharacters.set("?", "question_mark_symbol");
specialCharacters.set("/", "forward_slash_symbol");
specialCharacters.set(":", "colon_symbol");
specialCharacters.set(";", "semicolon_symbol");
specialCharacters.set("'", "single_quote_symbol");
specialCharacters.set("\"", "double_quote_symbol");
specialCharacters.set("|", "pipe_symbol");
specialCharacters.set("\\", "backslash_symbol");
specialCharacters.set("[", "open_square_bracket");
specialCharacters.set("]", "close_square_bracket");
specialCharacters.set("{", "open_curly_bracket");
specialCharacters.set("}", "close_curly_bracket");
specialCharacters.set("`", "backtick_symbol");
specialCharacters.set("~", "tilde_symbol");


export {constants, reservedWords, keywords, operator, operators, delimeters, brackets, specialCharacters };