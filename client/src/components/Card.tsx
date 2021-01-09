import React from "react";
import styled from "styled-components";

interface CardProps {
  value: Number;
}

const Wrapper = styled.button`
  background-color: white;
  border: 0.2rem solid #333;
  border-radius: 1rem;
  color: black;
  cursor: pointer;
  font-family: inherit;
  font-size: 4.5rem;
  width: 2em;
  height: 2.5em;
  margin: .2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: .15s all ease;

  &:hover {
    transform: scale(1.2)
  }
`;

const Card = ({ value }: CardProps) => {
  return <Wrapper>{value}</Wrapper>;
};

export default Card;
