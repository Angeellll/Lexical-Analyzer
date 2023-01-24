import { constants, reservedWords, keywords, operators, delimeters, brackets, specialCharacters } from "./tokens";


// Set of symbols
const symbols = new Set(["rawr"]);

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
  return symbols.has(token);
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




// Lexical Analyzer
function Lexer (sourceCode) {

    console.log("rawr")

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
          type: Keyword(currentToken)
        }
        );
      } else if (isConstant(currentToken)) {
        tokens.push({
          token: currentToken,
          type: Constants(currentToken)
        }
        );
      } else if (isReservedWord(currentToken)) {
        tokens.push({
          token: currentToken,
          type: ReservedWord(currentToken)
        }
        );
      } else if (isInvalidIdentifier(currentToken)) {
        tokens.push({
          token: currentToken,
          type: "invalid_identifier"
        }
        );
      } else if (isIdentifier(currentToken)) {
        tokens.push({
          token: currentToken,
          type: "IDENTIFIER"
        }
        );
      }
      currentToken = "";

      // For number
    } else if (currentChar === "-") {
      let number = "-";
      currentChar = sourceCode[++currentIndex];
      if (isNumber(currentChar)) {
        while (isNumber(currentChar) || currentChar === '.') {
          number += currentChar;
          currentChar = sourceCode[++currentIndex];
        }
        let match;
        if ((match = number.match(/^-\d+(\.\d+)?$/)) !== null) {
          if (match[1] === undefined) {
            tokens.push({
              type: "NEGATIVE_INTEGER_NUMBER",
              token: number
            });
          } else {
            tokens.push({
              type: "NEGATIVE_DECIMAL_NUMBER",
              token: number
            });
          }
        }
      } else {
        tokens.push({
          type: "SUBTRACTION_OPERATOR",
          token: number
        });
      }
    } else if (isNumber(currentChar)) {
      let number = "";
      while (isNumber(currentChar) || currentChar === '.') {
        number += currentChar;
        currentChar = sourceCode[++currentIndex];
      }
      let match;
      if ((match = number.match(/^\d+(\.\d+)?$/)) !== null) {

        if (match[1] === undefined) {
          tokens.push({
            type: "INTEGER_NUMBER",
            token: number
          });
        } else {
          tokens.push({
            type: "DECIMAL_NUMBER",
            token: number
          });
        }
      }
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
        type: "MULTILINE_COMMENT"
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
        type: "SINGLELINE_COMMENT"
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
        type: "OPEN_QUOTATION"
      });
      tokens.push({
        token: currentToken,
        type: "STRING_LITERAL"
      });
      tokens.push({
        token: '"',
        type: "CLOSE_QUOTATION"
      });
      currentIndex++;
      currentToken = "";

      // For increment
    } else if (isIncrement(currentChar + sourceCode[currentIndex + 1])) {
      currentToken += currentChar + sourceCode[currentIndex + 1];
      tokens.push({
        token: currentToken,
        type: Operator(currentToken)
      }
      );
      currentIndex += 2;
      currentToken = "";

      // For decrement
    } else if (isDecrement(currentChar + sourceCode[currentIndex + 1])) {
      currentToken += currentChar + sourceCode[currentIndex + 1];
      tokens.push({
        token: currentToken,
        type: Operator(currentToken)
      }
      );
      currentIndex += 2;
      currentToken = "";

      // For logical operators
    } else if (isLogicalOperator(currentChar + sourceCode[currentIndex + 1])) {
      currentToken += currentChar + sourceCode[currentIndex + 1];
      tokens.push({
        token: currentToken,
        type: Operator(currentToken)
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
        type: Operator(currentToken)
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
        type: Operator(currentToken)
      }
      );
      currentIndex++;
      currentToken = "";

      // For arithmetic operators
    } else if (isArithmeticOperator(currentChar)) {
      tokens.push({
        token: currentChar,
        type: Operator(currentToken)
      });
      currentIndex++;

      // For delimeters
    } else if (isDelimeter(currentChar)) {
      tokens.push({
        token: currentChar,
        type: Delimeter(currentChar)
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
          type: "INVALID"
        });
        currentIndex++;
        currentToken = "";
      }

      currentIndex++;

      // For brackets
    } else if (isBracket(currentChar)) {
      tokens.push({
        token: currentChar,
        type: Bracket(currentChar)
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
        type: Operator(currentToken)
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

      // Ignore whitespaces and other characters
      currentIndex++;
    }

  }
  // push the last token, if it exists, to the tokens array
  if (currentToken !== "") {
    tokens.push(currentToken);
  }


  

  // return the tokens array
  return checkConsecutive(tokens);

}


export default Lexer;