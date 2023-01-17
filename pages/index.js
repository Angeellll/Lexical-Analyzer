import React, { useState, useEffect } from "react";
import Form from "../Components/Form";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 100%;
  text-align: center;
  position: absolute;
  top: 5%;
`;

const Rawr = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Title = styled.h1`
  color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 1.5em;
  text-shadow: 10px 10px 7px rgba(0, 0, 0, 0.5);
  font-weight: 800;
`;

const Logo = styled.img`
  height: 60px;
  padding-left: 50px;
`;

function Page() {

    return (
        <MainDiv>
            <Rawr>
                <div><Logo src='/Logo.png' alt="" /></div>
                <Title>LESS PROGRAMMING LANGUAGE</Title>
            </Rawr>
            <Form />
        </MainDiv>
    )
}


export default Page;
