import React from "react";
import styled from "styled-components";
import {
  constants,
  reservedWords,
  keywords,
  operators,
  delimeters,
  brackets,
  specialCharacters,
} from "./tokens";

const MainDiv2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  background-color: #dfdfdf82;
  border-radius: 25px;
  height: 70vh;
`;

const StyledDiv = styled.div`
  background-color: #dc52bf;
  border-radius: 5px;
  width: 60%;
  height: 90px auto;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  padding-bottom: 10px;
`;

const Rawr2 = styled.div`
  width: 100%;
`;

const Rawr2r = styled.div`
  height: 90%;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const MainTitle = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 600;
  font-size: 22px;
  line-height: 48px;
  color: white;
  text-align: left;
  padding-left: 5vw;
  padding-top: 5px;
`;

const Line = styled.hr`
  margin-top: -3px;
  margin-bottom: 10px;
  width: 80%;
  border: solid 2px white;
  text-align: center;
`;

const InnerStyledDiv = styled.div`
  background: white;
  border-radius: 5px;
  color: black;
  padding: 5px;
`;

const TokenTitle = styled.h5`
  font-family: "Poppins", sans-serif;
  color: white;
  margin-bottom: 0;
  margin-top: 9px;
  text-align: left;
`;

const Title = styled.h5`
  font-family: "Poppins", sans-serif;
  color: #000000;
  margin-bottom: 0;
`;

let tokens = [];
let currentIndex = 0;
let currentToken = "";

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
  return (
    negativeInteger.test(char) ||
    negativeDecimal.test(char) ||
    integer.test(char) ||
    decimal.test(char)
  );
}

// Check if a token is a keyword
function isKeyword(token) {
  return keywords.has(token);
}

function isConstant(token) {
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
  if (isKeyword(token) || isReservedWord(token)) {
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
  return delimeters.get(token);
}

function Bracket(token) {
  return brackets.get(token);
}

function Constants(token) {
  return constants.get(token);
}

const Lexer = ({ sourceCode, buttonClicked }) => {
  if (!buttonClicked) {
    return null;
  } else {

    while (currentIndex < sourceCode.length) {
      let currentChar = sourceCode[currentIndex];

      console.log("Hello from Lexer")
      console.log(sourceCode)

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
          tokens.push(
            <StyledDiv>
              <TokenTitle>{Keyword(currentToken)}</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isConstant(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>{Constants(currentToken)}</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isReservedWord(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>{ReservedWord(currentToken)}</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isInvalidIdentifier(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>invalid_identifier</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isIdentifier(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>IDENTIFIER</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentToken = "";

        // For number
      } else if (currentChar === "-") {
        let number = "-";
        currentChar = sourceCode[++currentIndex];

        if (isNumber(currentChar)) {
          while (isNumber(currentChar) || currentChar === ".") {
            number += currentChar;
            currentChar = sourceCode[++currentIndex];
          }
          let match;
          if ((match = number.match(/^-\d+(\.\d+)?$/)) !== null) {
            if (match[1] === undefined) {
              tokens.push(
                <StyledDiv>
                  <TokenTitle>NEGATIVE_INTEGER_NUMBER</TokenTitle>
                  <InnerStyledDiv>
                    <Title>{number}</Title>
                  </InnerStyledDiv>
                </StyledDiv>
              );
            } else {
              tokens.push(
                <StyledDiv>
                  <TokenTitle>NEGATIVE_DECIMAL_NUMBER</TokenTitle>
                  <InnerStyledDiv>
                    <Title>{number}</Title>
                  </InnerStyledDiv>
                </StyledDiv>
              );
            }
          }
        } else {
          tokens.push(
            <StyledDiv>
              <TokenTitle>SUBSTRACTION_OPERATOR</TokenTitle>
              <InnerStyledDiv>
                <Title>{number}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
      } else if (isNumber(currentChar)) {
        let number = "";
        while (isNumber(currentChar) || currentChar === ".") {
          number += currentChar;
          currentChar = sourceCode[++currentIndex];
        }
        let match;
        if ((match = number.match(/^\d+(\.\d+)?$/)) !== null) {
          if (match[1] === undefined) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>INTEGER_NUMBER</TokenTitle>
                <InnerStyledDiv>
                  <Title>{number}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else {
            tokens.push(
              <StyledDiv>
                <TokenTitle>DECIMAL_NUMBER</TokenTitle>
                <InnerStyledDiv>
                  <Title>{number}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
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
        tokens.push(
          <StyledDiv>
            <TokenTitle>MULTILINE_COMMENT</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentToken = "";
      } else if (currentChar === "/" && sourceCode[currentIndex + 1] === "/") {
        currentIndex += 2;
        currentChar = sourceCode[currentIndex];
        while (
          currentChar !== "\n" &&
          currentChar !== "\r" &&
          currentIndex < sourceCode.length
        ) {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        tokens.push(
          <StyledDiv>
            <TokenTitle>SINGLELINE_COMMENT</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
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
        tokens.push(
          <StyledDiv>
            <TokenTitle>OPEN_QUOTATION</TokenTitle>
            <InnerStyledDiv>
              <Title>"</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        tokens.push(
          <StyledDiv>
            <TokenTitle>STRING_LITERAL</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        tokens.push(
          <StyledDiv>
            <TokenTitle>CLOSE_QUOTATION</TokenTitle>
            <InnerStyledDiv>
              <Title>"</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;
        currentToken = "";

        // For increment
      } else if (isIncrement(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex += 2;
        currentToken = "";

        // For decrement
      } else if (isDecrement(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex += 2;
        currentToken = "";

        // For logical operators
      } else if (
        isLogicalOperator(currentChar + sourceCode[currentIndex + 1])
      ) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
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
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
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
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;
        currentToken = "";

        // For arithmetic operators
      } else if (isArithmeticOperator(currentChar)) {
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;

        // For delimeters
      } else if (isDelimeter(currentChar)) {
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Delimeter(currentChar)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentChar}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );

        if (isSpecialCharacter(sourceCode[currentIndex + 1])) {
          currentToken += currentChar;
          let nextChar = sourceCode[currentIndex + 1];
          while (isSpecialCharacter(nextChar)) {
            currentIndex++;
            currentToken += nextChar;
            nextChar = sourceCode[currentIndex + 1];
          }
          tokens.push(
            <StyledDiv>
              <TokenTitle>INVALID</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
          currentIndex++;
          currentToken = "";
        }

        currentIndex++;

        // For brackets
      } else if (isBracket(currentChar)) {
        tokens.push(
          <StyledDiv>
            <TokenTitle>{Bracket(currentChar)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentChar}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
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

        tokens.push(
          <StyledDiv>
            <TokenTitle>{Operator(currentToken)}</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;
        currentToken = "";

        // For symbols
      } else if (isSymbol(currentChar)) {
        tokens.push(
          <StyledDiv>
            <TokenTitle>Symbol</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
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
    
    return (
      <MainDiv2>
        <Rawr2>
          <MainTitle>{"</>"} TOKENS </MainTitle>
          <Line />
        </Rawr2>
        <Rawr2r>{tokens}</Rawr2r>
      </MainDiv2>
    );
  }
};

export default Lexer;
