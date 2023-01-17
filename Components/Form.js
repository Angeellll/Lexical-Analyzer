import React, { useState } from "react";
import Lexer from "./Lexer";
import styled from "styled-components";

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

const Form = () => {
  const [formData, setFormData] = useState({ sourceCode: "" });
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(!buttonClicked);
    setFormData({ sourceCode: e.target.sourceCode.value });
  };

  return (
    <MainDiv>
      <InnerDiv buttonClicked={buttonClicked}>
        <form onSubmit={handleSubmit} autoComplete="off">
        <Input name="sourceCode" placeholder="Input Code" />
          <br />
          <Button type="submit">
            {buttonClicked ? "Input Another" : "GENERATE TOKEN"}
          </Button>
        </form>
      </InnerDiv>
      {buttonClicked && (
        <InnerDiv>
          <Lexer
            sourceCode={formData.sourceCode}
            buttonClicked={buttonClicked}
          />
        </InnerDiv>
      )}
    </MainDiv>
  );
};

export default Form;


