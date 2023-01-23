// Variables
// Set of keywords




const keywords = new Set([
  "int",
  "char",
  "str",
  "dec",
  "boolean",
  "bool",
  "list",
  "dictionary",
  "dict",
  "is",
  "in",
  "to",
  "if",
  "else if",
  "else",
  "match",
  "default",
  "for",
  "find",
  "job",
  "not",
  "or",
  "and",
  "skip",
  "stop",
  "continue",
  "forward",
  "backward",
  "show",
  "enter",
]);
// Set of reserved words
const reservedWords = new Set(["null", "True", "False", "key"]);

const arithmeticOperator = new Set(["+", "-", "*", "/", "%"]);

// Set of logical operators
const logicalOperators = new Set(["&", "|", "!", "is not", "and", "or"]);
// Set of relational operators
const relationalOperators = new Set(["<", ">", "==", "<=", ">=", "!="]);
// Set of assignment operators
const assignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%="]);
// Set of delimeters
const delimeters = new Set([",", ";"]);
// Set of brackets
const brackets = new Set(["{", "}", "[", "]", "(", ")"]);
// Set of ternary operators
const ternaryOperators = new Set(["?", "...", ":"]);
// Increment
const increment = new Set(["++"]);
// Decrement
const decrement = new Set(["--"]);
// Set of symbols
const symbols = new Set(["rawr"]);
// Set of special characters
const specialCharacters = new Set(["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", ",", ".", "<", ">", "?", "/", ":", ";", "'", "\"", "|", "\\", "[", "]", "{", "}", "`", "~"]);


// Check if a character is a letter
function isLetter(char) {
  const letters = /[a-zA-Z]/;
  return letters.test(char);
}

// Check if a character is a number
function isNumber(char) {
  const numbers = /[0-9]/;
  return numbers.test(char);
}

// Check if a token is a keyword
function isKeyword(token) {
  return keywords.has(token);
}

// Check if a token is a reserved word
function isReservedWord(token) {
  return reservedWords.has(token);
}

// Check if a token is a symbol
function isSymbol(token) {
  return symbols.has(token);
}

// Check if a token is a arithmetic operator
function isArithmeticOperator(token) {
  return arithmeticOperator.has(token);
}

// Check if a token is a logical operator
function isLogicalOperator(token) {
  return logicalOperators.has(token);
}

// Check if a token is a relational operator
function isRelationalOperator(token) {
  return relationalOperators.has(token);
}

// Check if a token is an assignment operator
function isAssignmentOperator(token) {
  return assignmentOperators.has(token);
}

// Check if a token is a delimeter
function isDelimeter(token) {
  return delimeters.has(token);
}

// Check if a token is a bracket
function isBracket(token) {
  return brackets.has(token);
}

// Check if a token is a ternary operator
function isTernaryOperator(token) {
  return ternaryOperators.has(token);
}

// Check if a token is a special character
function isSpecialCharacter(token) {
  return specialCharacters.has(token);
}

// Check if a token is an identifier
function isIdentifier(token) {
  // check if the first character is an alphabet or underscore
  if (!/^[a-zA-Z_]/.test(token)) {
    return false;
  }
  // check if the rest of the characters are alphabets, digits, or underscore
  // check if the token contains any numbers
  if (/[0-9]/.test(token)) {
    return false;
  }
  // check if the token is not a keyword or reserved word
  if (isKeyword(token) || isReservedWord(token)) {
    return false;
  }
  return true;
}

// Check if a token is a string
function isString(token) {
  if (token[0] === '"' && token[token.length - 1] === '"') {
    return true;
  }
  return false;
}

// Check if a token is an increment operator
function isIncrement(token) {
  return increment.has(token);
}

// Check if a token is an decrement operator
function isDecrement(token) {
  return decrement.has(token);
}

function isInvalidToken(token) {
  if (isKeyword(token) || isReservedWord(token) || isArithmeticOperator(token) || isLogicalOperator(token) || isRelationalOperator(token) || isAssignmentOperator(token) || isDelimeter(token) || isBracket(token) || isTernaryOperator(token) || isSymbol(token)) {
    return false;
  }
  return true;
}


// Lexical Analyzer
function lexer(sourceCode) {



  sourceCode = sourceCode;
  // create an array to store the tokens
  let tokens = [];

  // initialize the current index and current token
  let currentIndex = 0;
  let currentToken = "";

  // iterate through each character in the source code
  while (currentIndex < sourceCode.length) {
    let currentChar = sourceCode[currentIndex];

    // For identifier
    if (isLetter(currentChar) || currentChar === "_") {
      while (
        isLetter(currentChar) ||
        isNumber(currentChar) ||
        currentChar === "_"
      ) {
        currentToken += currentChar;
        currentIndex++;
        currentChar = sourceCode[currentIndex];
      }
      if (isKeyword(currentToken)) {
        tokens.push({
          token: currentToken,
          type: "keyword"
        }
        );
      } else if (isReservedWord(currentToken)) {
        tokens.push({
          token: currentToken,
          type: "reserved_word"
        }
        );
      } else if (isIdentifier(currentToken)) {
        tokens.push({
          token: currentToken,
          type: "identifier"
        }
        );
      }
      currentToken = "";

      // For number
    } else if (isNumber(currentChar)) {
      while (isNumber(currentChar)) {
        currentToken += currentChar;
        currentIndex++;
        currentChar = sourceCode[currentIndex];
      }
      tokens.push({
        token: currentToken,
        type: "number"
      }
      );
      currentToken = "";


      // For multi line comment
    } else if (currentChar === "/" && sourceCode[currentIndex + 1] === "*") {
      currentIndex += 2;
      currentChar = sourceCode[currentIndex];
      while (!(currentChar === "*" && sourceCode[currentIndex + 1] === "/")) {
        currentToken += currentChar;
        currentIndex++;
        currentChar = sourceCode[currentIndex];
      }
      currentIndex += 2;
      currentChar = sourceCode[currentIndex];
      tokens.push({
        token: currentToken,
        type: "multiline_comment"
      }
      );
      currentToken = "";

    } else if (currentChar === "/" && sourceCode[currentIndex + 1] === "/") {
      currentIndex += 2;
      currentChar = sourceCode[currentIndex];
      while (currentChar !== "\n" && currentChar !== "\r" && currentIndex < sourceCode.length) {
        currentToken += currentChar;
        currentIndex++;
        currentChar = sourceCode[currentIndex];
      }
      tokens.push({
        token: "\\\\" + currentToken,
        type: "singleline_comment"
      });
      currentToken = "";

      // For string
    } else if (currentChar === '"') {
      currentIndex++;
      currentChar = sourceCode[currentIndex];
      while (currentChar !== '"') {
        currentToken += currentChar;
        currentIndex++;
        currentChar = sourceCode[currentIndex];
      }
      tokens.push({
        token: '"',
        type: "open_quotation"
      });
      tokens.push({
        token: currentToken,
        type: "string_literal"
      });
      tokens.push({
        token: '"',
        type: "end_quotation"
      });
      currentIndex++;
      currentToken = "";

      // For increment
    } else if (isIncrement(currentChar + sourceCode[currentIndex + 1])) {
      currentToken += currentChar + sourceCode[currentIndex + 1];
      tokens.push({
        token: currentToken,
        type: "increment"
      }
      );
      currentIndex += 2;
      currentToken = "";

      // For decrement
    } else if (isDecrement(currentChar + sourceCode[currentIndex + 1])) {
      currentToken += currentChar + sourceCode[currentIndex + 1];
      tokens.push({
        token: currentToken,
        type: "decrement"
      }
      );
      currentIndex += 2;
      currentToken = "";

      // For relational operators
    } else if (
      isRelationalOperator(currentChar + sourceCode[currentIndex + 1]) ||
      isRelationalOperator(currentChar)
    ) {
      currentToken += currentChar;
      if (isRelationalOperator(currentToken + sourceCode[currentIndex + 1])) {
        currentToken += sourceCode[currentIndex + 1];
        currentIndex++;
      }
      tokens.push({
        token: currentToken,
        type: "relational_operator"
      }
      );
      currentIndex++;
      currentToken = "";

      // For assignment operators
    } else if (
      isAssignmentOperator(currentChar + sourceCode[currentIndex + 1]) ||
      isAssignmentOperator(currentChar)
    ) {
      currentToken += currentChar;
      if (isAssignmentOperator(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += sourceCode[currentIndex + 1];
        currentIndex++;
      }
      tokens.push({
        token: currentToken,
        type: "assignment_operator"
      }
      );


      currentIndex++;
      currentToken = "";

      // For arithmetic operators
    } else if (isArithmeticOperator(currentChar)) {

      if (isLetter(sourceCode[currentIndex - 1]) && isLetter(sourceCode[currentIndex + 1]) ||
        isNumber(sourceCode[currentIndex - 1]) && isNumber(sourceCode[currentIndex + 1]) ||
        sourceCode[currentIndex - 1] === " " && sourceCode[currentIndex + 1] === " " &&
        isLetter(sourceCode[currentIndex - 2]) && isLetter(sourceCode[currentIndex + 2]) ||
          sourceCode[currentIndex - 1] === " " && sourceCode[currentIndex + 1] === " " &&
        isNumber(sourceCode[currentIndex - 1]) && isNumber(sourceCode[currentIndex + 1])) {
        tokens.push({
          token: currentChar,
          type: "arithmetic_operator"
        });
        currentIndex++;
      } else {
        tokens.push({
          token: currentChar,
          type: "invalid"
        });
        currentIndex++;
      }

      if (isSpecialCharacter(sourceCode[currentIndex + 1])) {
        currentToken += currentChar;
        let nextChar = sourceCode[currentIndex + 1];
        while (isSpecialCharacter(nextChar)) {
          currentIndex++;
          currentToken += nextChar;
          nextChar = sourceCode[currentIndex + 1];
        }
        tokens.push({
          token: currentToken,
          type: "invalid"
        });
        currentIndex++;
        currentToken = "";
      }


      // For delimeters
    } else if (isDelimeter(currentChar)) {
      if (currentChar === ";")
        tokens.push({
          token: currentChar,
          type: "semicolon_delimeter"
        });
      if (currentChar === ",")
        tokens.push({
          token: currentChar,
          type: "comma_delimeter"
        });

        if (isSpecialCharacter(sourceCode[currentIndex + 1])) {
          currentToken += currentChar;
          let nextChar = sourceCode[currentIndex + 1];
          while (isSpecialCharacter(nextChar)) {
            currentIndex++;
            currentToken += nextChar;
            nextChar = sourceCode[currentIndex + 1];
          }
          tokens.push({
            token: currentToken,
            type: "invalid"
          });
          currentIndex++;
          currentToken = "";
        }
      currentIndex++;

      // For brackets
    } else if (isBracket(currentChar)) {
      if (currentChar === "(")
        tokens.push({
          token: currentChar,
          type: "open_parenthesis"
        });
      if (currentChar === ")")
        tokens.push({
          token: currentChar,
          type: "close_parenthesis"
        });
      if (currentChar === "{")
        tokens.push({
          token: currentChar,
          type: "open_curly_bracket"
        });
      if (currentChar === "}")
        tokens.push({
          token: currentChar,
          type: "close_curly_bracket"
        });
      if (currentChar === "[")
        tokens.push({
          token: currentChar,
          type: "open_square_bracket"
        });
      if (currentChar === "]")
        tokens.push({
          token: currentChar,
          type: "close_square_bracket"
        });
      currentIndex++;

      // For ternary operators
    } else if (
      isTernaryOperator(
        currentChar +
        sourceCode[currentIndex + 1] +
        sourceCode[currentIndex + 2]
      ) ||
      isTernaryOperator(currentChar + sourceCode[currentIndex + 1]) ||
      isTernaryOperator(currentChar)
    ) {
      currentToken += currentChar;
      if (isTernaryOperator(currentToken + sourceCode[currentIndex + 1])) {
        currentToken += sourceCode[currentIndex + 1];
        currentIndex++;
      } else if (
        isTernaryOperator(
          currentChar +
          sourceCode[currentIndex + 1] +
          sourceCode[currentIndex + 2]
        )
      ) {
        currentToken += sourceCode[currentIndex + 1];
        currentToken += sourceCode[currentIndex + 2];
        currentIndex++;
      }

      tokens.push({
        token: currentToken,
        type: "ternary_operator"
      }
      );
      currentIndex++;
      currentToken = "";

      // For symbols
    } else if (isSymbol(currentChar)) {
      tokens.push({
        token: currentToken,
        type: "symbol"
      }
      );

      currentIndex++;
    } else {

      if (!(isIdentifier))
        tokens.push({
          type: "error",
          value: tokens[i]
        });

      // Ignore whitespaces and other characters
      currentIndex++;
    }

  }
  // push the last token, if it exists, to the tokens array
  if (currentToken !== "") {
    tokens.push(currentToken);
  }



  // return the tokens array
  return tokens;
}

export default lexer;

//JOB FUNCTION DECLRATION
