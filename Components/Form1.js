import React, { useState } from "react";
import Lexer1 from "./Lexer1";
import Lexer from "./Lexer";
import styled from "styled-components";
import { saveAs } from 'file-saver';
import { brackets } from "./tokens";

const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: start;
  height: 100%;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: visible;
  &:first-child {
    margin-right: ${(props) => (props.buttonClicked ? "20px" : "0px")};
  }
`;

const Input = styled.textarea`
  border-radius: 15px;
  padding: 12px 20px;
  width: 60%;
  height: 60vh;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  resize: none;
  border: double 3px transparent;
  &:hover {
    border: double 3px transparent;
    border-radius: 15px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #fa00ff, #572a8b, #fa00ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }
  &:focus {
    border-radius: 15px;
    background-image: linear-gradient(white, white),
      linear-gradient(to right, #fa00ff, #572a8b, #fa00ff);
    background-origin: border-box;
    background-clip: padding-box, border-box;
    outline: none;
  }
`;

const InputFile = styled.input.attrs({
  type: "file",
  accept: ".lss"
})`
  margin-right: 10px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  &:focus {
    color: black;
  }
`;

const Rawr = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Rawrr = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
  width: 60%;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-image: linear-gradient(to right, #fa00ff, #572a8b);
  border-radius: 20px;
  border: none;
  width: 300px;
  height: 30px;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 700;
  margin-top: 20px;
  box-shadow: 0px 4px 6px #f9f9f971;
  &:hover {
    background-image: linear-gradient(to right, #572a8b, #fa00ff);
    cursor: pointer;
  }
`;

const Button1 = styled.button`
  background-image: linear-gradient(to right, #fa00ff, #572a8b);
  border-radius: 20px;
  border: none;
  padding: 6px;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-weight: 700;
  margin-top: 20px;
  box-shadow: 0px 4px 6px #f9f9f971;
  &:hover {
    background-image: linear-gradient(to right, #572a8b, #fa00ff);
    cursor: pointer;
  }
`;

const Form = () => {
  const [formData, setFormData] = useState({ sourceCode: "" });
  const [buttonClicked, setButtonClicked] = useState(false);
  const [click, setClicked] = useState(false);
  const [sourceCode, setSourceCode] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setSourceCode(e.target.result);
    };
    reader.readAsText(file);

    e.preventDefault();
  };

  const handleTextAreaChange = (e) => {
    setSourceCode(e.target.value);
  }

  const handleFileSubmit = (e) => {
    console.log(sourceCode)
    setClicked(!click);

    if (!sourceCode) {
      alert('Input .lss file!');
      return;
    }
    const tokenized = tokensToString(Lexer1(sourceCode));
    const file = new Blob([tokenized], { type: 'text/plain;charset=utf-8' });
    saveAs(file, 'tokenized.txt');

    e.preventDefault();

  };

  const Table = require('cli-table3');


  function tokensToString(tokens) {
    
let table = new Table({
    head: ['Token', 'Lexeme'],
    colWidths: [30, 30],
    truncate: 'true',
    style: { 'padding-left': 0, 'padding-right': 0,head: ['green'], border: [] },
    colAligns: ['center', 'center'],
    colLimit: [1,1]
});

  
  


    for (let i = 0; i < tokens.length; i++) {
      table.push([tokens[i].type, tokens[i].token]);
    }
    return table;
  }



  const handleSubmit = (e) => {
    setButtonClicked(!buttonClicked);
    setFormData({ sourceCode: e.target.sourceCode.value });
    e.preventDefault();
  };


  return (
    <MainDiv>
      <Rawr>
        <Rawrr click={click}>
          <form onSubmit={handleFileSubmit} autoComplete="off">
            <InputFile
              name="sourceCode"
              placeholder="Input Code"
              onChange={handleFileSelect}
            />
            <Button1 type="submit">
              Download .txt file
            </Button1>
          </form>
        </Rawrr>
        <br />
        <InnerDiv buttonClicked={buttonClicked}>
          <form onSubmit={handleSubmit} autoComplete="off">
            <Input
              name="sourceCode"
              placeholder='UPLOAD .LSS FILE'
              value={sourceCode}
              onChange={handleTextAreaChange}
              readOnly
            />
            <br />
            <Button type="submit">
              {buttonClicked ? "Input Another" : "GENERATE TOKEN"}
            </Button>
          </form>
        </InnerDiv>
      </Rawr>

      {buttonClicked && (
        <Rawr>
          <InnerDiv>
            <Lexer
              sourceCode={formData.sourceCode}
              buttonClicked={buttonClicked}
            />
          </InnerDiv>
        </Rawr>
      )}
    </MainDiv>
  );
};

export default Form;