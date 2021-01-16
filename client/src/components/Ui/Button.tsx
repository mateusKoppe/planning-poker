import { HTMLAttributes } from "react";
import styled from "styled-components";
import BaseInput, { BaseInputInterface } from "utils/styles/utils/BaseInput";


interface ButtonProps extends HTMLAttributes<HTMLButtonElement>, BaseInputInterface{}

const Button = styled.button<ButtonProps>`
  ${BaseInput}

  cursor: pointer;
`;


export default Button;
