import styled from "styled-components";
import BaseInput, { BaseInputInterface } from "utils/styles/utils/BaseInput";


interface ButtonProps extends BaseInputInterface {}

const Button = styled.button<ButtonProps>`
  ${BaseInput}

  cursor: pointer;
`;


export default Button;
