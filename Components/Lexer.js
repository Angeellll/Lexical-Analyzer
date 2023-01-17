import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
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

const Rawr = styled.div`
  width: 100%;
`;

const Rawrr = styled.div`
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

const Lexer = ({ sourceCode, buttonClicked }) => {
  if (!buttonClicked) {
    return null;
  } else {
    let tokens = [];
    let currentIndex = 0;
    let currentToken = "";
    let previousChar = "";

    // Variables
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
      "while",
    ]);
    const reservedWords = new Set(["null", "True", "False", "key"]);
    const arithmeticOperators = new Set(["+", "-", "*", "/", "%", "^"]);
    const logicalOperators = new Set(["&", "|", "!", "is not", "and", "or"]);
    const relationalOperators = new Set([
      "<",
      ">",
      "==",
      "<=",
      ">=",
      "!=",
      "less than",
      "greater than",
      "less than or equal",
      "greater than or equal",
      "equal",
      "not equal",
    ]);
    const assignmentOperators = new Set(["=", "+=", "-=", "*=", "/=", "%="]);
    const delimeters = new Set([",", ";"]);
    const brackets = new Set(["{", "}", "[", "]", "(", ")", "<", ">"]);
    const ternaryOperators = new Set(["?", "...", ":"]);
    const symbols = new Set(["rawr"]);

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
      return arithmeticOperators.has(token);
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

    // Check if a token is an identifier
    function isIdentifier(token) {
      if (isKeyword(token)) {
        return false;
      }
      const identifierRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
      return identifierRegex.test(token);
    }

    // Check if a token is a string
    function isString(token) {
      if (token[0] === '"' && token[token.length - 1] === '"') {
        return true;
      }
      return false;
    }

    // Check if a token is a comment
    function isComment(token) {
      if (token[0] === "/" && token[1] === "/") {
        return true;
      }
      return false;
    }

    while (currentIndex < sourceCode.length) {
      let currentChar = sourceCode[currentIndex];
      if (currentChar === " " || currentChar === "\n" || currentChar === "\t") {
        if (currentToken !== "") {
          if (isKeyword(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Keyword</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isReservedWord(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Reserved Word</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isIdentifier(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Identifier</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isString(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>String</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isComment(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Comment</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isNumber(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Number</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isArithmeticOperator(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Arithmetic Operator</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isLogicalOperator(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Logical Operator</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isRelationalOperator(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Relational Operator</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isAssignmentOperator(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Assignment Operator</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isDelimeter(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Delimeters</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isBracket(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Brackets</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          } else if (isTernaryOperator(currentToken)) {
            tokens.push(
              <StyledDiv>
                <TokenTitle>Ternary Operator</TokenTitle>
                <InnerStyledDiv>
                  <Title>{currentToken}</Title>
                </InnerStyledDiv>
              </StyledDiv>
            );
          }
          currentToken = "";
        }
        previousChar = "";
        currentIndex++;
        continue;
      }

      //FOR STRING
      if (currentChar === '"') {
        currentIndex++;
        currentChar = sourceCode[currentIndex];
        while (currentChar !== '"') {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        currentToken = '"' + currentToken + '"';
        currentIndex++;
        if (isString(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>String</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentToken = "";
        continue;
      }

      //FOR SINGLE LINE COMMENT
      if (currentChar === "/" && sourceCode[currentIndex + 1] === "/") {
        while (currentChar !== "\n") {
          currentToken += currentChar;
          currentIndex++;
          currentChar = sourceCode[currentIndex];
        }
        tokens.push(
          <StyledDiv>
            <TokenTitle>Single Line Comment</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentToken = "";
        continue;
      }

      //FOR MULTI LINE COMMENT
      if (currentChar === "/" && sourceCode[currentIndex + 1] === "*") {
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
            <TokenTitle>Multiline Comment</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentToken = "";
        continue;
      }

      // FOR NUMBER
      if (isNumber(currentChar)) {
        while (isNumber(sourceCode[currentIndex])) {
          currentToken += sourceCode[currentIndex];
          currentIndex++;
        }
        tokens.push(
          <StyledDiv>
            <TokenTitle>Number</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentToken = "";
        continue;
      }

      // FOR ASSIGNMENT
      if (assignmentOperators.has(currentChar + sourceCode[currentIndex + 1])) {
        currentToken += currentChar + sourceCode[currentIndex + 1];
        tokens.push(
          <StyledDiv>
            <TokenTitle>Assignment Operator</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex += 2;
        currentToken = "";
        continue;

        // FOR ARITHMETIC
      } else if (arithmeticOperators.has(currentChar)) {
        tokens.push(currentChar);
        tokens.push(
          <StyledDiv>
            <TokenTitle>Arithmetic Operator</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;
        continue;

        // FOR RELATIONAL
      } else if (
        relationalOperators.has(currentChar + sourceCode[currentIndex + 1]) ||
        relationalOperators.has(currentChar)
      ) {
        currentToken += currentChar;
        if (
          relationalOperators.has(currentToken + sourceCode[currentIndex + 1])
        ) {
          currentToken += sourceCode[currentIndex + 1];
          currentIndex++;
        }
        tokens.push(
          <StyledDiv>
            <TokenTitle>Relational Operator</TokenTitle>
            <InnerStyledDiv>
              <Title>{currentToken}</Title>
            </InnerStyledDiv>
          </StyledDiv>
        );
        currentIndex++;
        currentToken = "";
        continue;
      }

      // FOR LOGICAL
      if (isLogicalOperator(currentChar)) {
        currentToken += currentChar;
        tokens.push(currentToken);
        if (isLogicalOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Logical Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentIndex++;
        currentToken = "";
        continue;
      }

      //FOR DELIMETER
      if (isDelimeter(currentChar)) {
        currentToken += currentChar;
        if (isDelimeter(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Delimeter</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentIndex++;
        currentToken = "";
        continue;
      }

      // FOR BRACKET
      if (isBracket(currentChar)) {
        currentToken += currentChar;
        if (isBracket(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Bracket</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentIndex++;
        currentToken = "";
        continue;
      }

      // FOR TERNARY
      if (isTernaryOperator(currentChar)) {
        currentToken += currentChar;
        if (isTernaryOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Ternary Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
        currentIndex++;
        currentToken = "";
        continue;
      }
      currentToken += currentChar;
      currentIndex++;

      if (currentIndex === sourceCode.length) {
        if (isKeyword(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Keyword</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isReservedWord(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Reserved Word</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isIdentifier(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Identifier</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isString(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>String</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isComment(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Comment</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isNumber(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Number</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isArithmeticOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Arithmetic Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isLogicalOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Logical Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isRelationalOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Relational Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isAssignmentOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Assignment Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isDelimeter(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Delimeters</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isBracket(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Brackets</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        } else if (isTernaryOperator(currentToken)) {
          tokens.push(
            <StyledDiv>
              <TokenTitle>Ternary Operator</TokenTitle>
              <InnerStyledDiv>
                <Title>{currentToken}</Title>
              </InnerStyledDiv>
            </StyledDiv>
          );
        }
      }
    }
    return (
      <MainDiv>
        <Rawr>
            <MainTitle>{"</>"} TOKENS </MainTitle>
            <Line />
          
        </Rawr>
        <Rawrr>
        {tokens}
        </Rawrr>
      </MainDiv>
    );
  }
};

export default Lexer;
