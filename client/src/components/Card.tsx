import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  value: Number | null;
}

interface WrapperProps extends HTMLAttributes<HTMLButtonElement> {
  readonly unknown: boolean;
}

const Wrapper = styled.button<WrapperProps>`
  border-radius: 1rem;
  color: black;
  cursor: pointer;
  font-family: inherit;
  font-size: 4.5rem;
  width: 2em;
  height: 2.5em;
  margin: 0.2em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  transition: 0.15s all ease;
  border: 0.2rem solid #333;
  background: white;

  &:hover {
    transform: scale(1.2);
  }

  ${(props) =>
    props.unknown &&
    `
        background: url(/assets/card-back.png);
        background-size: 100% 100%;
        border: none;
      `}
`;

const Card: React.FunctionComponent<CardProps> = ({ value, ...props }) => {
  return (
    <Wrapper {...props} unknown={value === null}>
      {value}
    </Wrapper>
  );
};

export default Card;
