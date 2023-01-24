import { constants, reservedWords, keywords, operators, delimeters, brackets, specialCharacters } from "./tokens";

// Check if a character is a letter
function isLetter(char) {
    const letters = /[a-zA-Z]/;
    return letters.test(char);
  }
  
  // Check if a character is a number
  function isNumber(char) {
    const negativeInteger = /^-\d+$/;
    const negativeDecimal = /^-\d+\.\d+$/;
    const integer = /^\d+$/;
    const decimal = /^\d+\.\d+$/;
    return negativeInteger.test(char) || negativeDecimal.test(char) || integer.test(char) || decimal.test(char);
  }
  
  // Check if a token is a keyword
  function isKeyword(token) {
    return keywords.has(token);
  }
  
  function isConstant (token) {
    return constants.has(token);
  }
  
  // Check if a token is a reserved word
  function isReservedWord(token) {
    return reservedWords.has(token);
  }
  
  // Check if a token is a symbol
  function isSymbol(token) {
    return 0;
  }
  
  // Check if a token is a arithmetic operator
  function isArithmeticOperator(token) {
    return operators.has(token);
  }
  
  // Check if a token is a logical operator
  function isLogicalOperator(token) {
    return operators.has(token);
  }
  
  // Check if a token is a relational operator
  function isRelationalOperator(token) {
    return operators.has(token);
  }
  
  // Check if a token is an assignment operator
  function isAssignmentOperator(token) {
    return operators.has(token);
  }
  
  // Check if a token is a delimeter
  function isDelimeter(token) {
    return delimeters.get(token);
  }
  
  // Check if a token is a bracket
  function isBracket(token) {
    return brackets.has(token);
  }
  
  // Check if a token is a ternary operator
  function isTernaryOperator(token) {
    return operators.has(token);
  }
  
  // Check if a token is a special character
  function isSpecialCharacter(token) {
    return specialCharacters.has(token);
  }
  
  // Check if a token is an identifier
  function isIdentifier(token) {
    // check if the token starts with a letter or underscore
    if (!/^[a-zA-Z_]/.test(token)) {
      return false;
    }
    // check if the token contains any special characters except underscore
    if (/[^a-zA-Z_0-9]/.test(token)) {
      return false;
    }
    // check if the token is not a keyword or reserved word
    if (isKeyword(token) || isReservedWord(token) ) {
      return false;
    }
    return true;
  }
  
  function isInvalidIdentifier(token) {
  
    // check if the token starts with a digit
    if (/^[0-9]/.test(token)) {
      return true;
    }
  
    // check if the token starts with a letter or underscore
    if (!/^[a-zA-Z_]/.test(token)) {
      return true;
    }
    // check if the token contains any special characters except underscore
    if (/[^a-zA-Z_0-9]/.test(token)) {
      return true;
    }
    // check if the token is not a keyword or reserved word
    if (isKeyword(token) || isReservedWord(token)) {
      return true;
    }
    return false;
  
  }
  
  // Check if a token is an increment operator
  function isIncrement(token) {
    return operators.has(token);
  }
  
  // Check if a token is an decrement operator
  function isDecrement(token) {
    return operators.has(token);
  }
  
  function ReservedWord(token) {
    return reservedWords.get(token);
  }
  
  function Keyword(token) {
    return keywords.get(token);
  }
  
  function Operator(token) {
    return operators.get(token);
  }
  
  function SpecialCharacter(token) {
    return specialCharacters.get(token);
  }
  
  function Delimeter(token) {
    return delimeters.get(token)
  }
  
  function Bracket(token) {
    return brackets.get(token)
  }
  
  function Constants(token) {
    return constants.get(token)
  }
  
  function checkConsecutive(tokens) {
    let previousType = null;
    let num = 0;
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (previousType && previousType.includes("KEYWORD") && isKeyword(token.token)) {
        token.type = "RESERVED_WORD";
      } else if (previousType && previousType.includes("_WORD") && isKeyword(token.token)) {
        token.type = "RESERVED_WORD";
      } else if (previousType && previousType.includes("NUMBER") && isNumber(token.token)) {
        token.type = "INVALID";
      } else if (previousType === "IDENTIFIER" && isIdentifier(token.token)) {
        token.type = "INVALID";
      } else if (previousType === "INVALID" && isIdentifier(token.token)) {
        token.type = "INVALID";
      } else if (previousType === "INVALID" && operators.has(token.token)) {
        token.type = "INVALID";
      } else if (previousType && previousType.includes("_OPERATOR") && operators.has(token.token)) {
        token.type = "INVALID";
      } else if (previousType && previousType.includes("CONSTANT") && isKeyword(token.token) && token.type.includes("DATATYPE")){
        num = 1;
      } else if (previousType && previousType.includes("DATATYPE") && isIdentifier(token.token) && num == 1){
        token.type = "CONSTANT_IDENTIFIER";
        num = 0;
      }
      previousType = token.type;
    }
    return tokens;
  }