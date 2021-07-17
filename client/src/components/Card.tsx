import React, { HTMLAttributes } from "react";
import styled from "styled-components";

interface CardProps extends HTMLAttributes<HTMLButtonElement> {
  value: Number | null;
  unknown?: boolean;
  readOnly?: boolean;
  selected?: boolean;
}

interface WrapperProps extends HTMLAttributes<HTMLButtonElement> {
  unknown: boolean;
  picked: boolean;
  readOnly: boolean;
  selected: boolean;
}

const Wrapper = styled.button<WrapperProps>`
  border-radius: 1rem;
  color: black;
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
  outline: none;

  ${({ selected }) => selected && `
    transform: translateY(-4rem);
  `}

  ${({ readOnly }) =>
    !readOnly &&
    `
    cursor: pointer;

    &:hover, &:focus {
      scale: 1.2;
    }
  `}

  ${({ unknown, picked }) => {
    if (unknown && picked)
      return `
        background: url(/assets/card-back.png);
        background-size: 100% 100%;
        border: none;
      `;
    if (unknown)
      return `
        background-color: transparent;
        border-style: dashed;
      `;
  }}
`;

const Card: React.FunctionComponent<CardProps> = ({
  value,
  unknown = false,
  readOnly = false,
  selected = false,
  ...props
}) => {
  return (
    <Wrapper
      {...props}
      unknown={unknown}
      picked={value !== undefined}
      readOnly={readOnly}
      selected={selected}
    >
      {!unknown && value}
    </Wrapper>
  );
};

export default Card;
