import styled from "styled-components";
import BaseInput, { BaseInputInterface } from "utils/styles/utils/BaseInput";


interface InputProps extends BaseInputInterface {}

const Input = styled.input<InputProps>`
  ${BaseInput}
`;

export default Input;
