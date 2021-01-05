import styled from "styled-components";
import BaseInput, { BaseInputInterface } from "utils/styles/utils/BaseInput";


interface SelectProps extends BaseInputInterface {}

const Select = styled.select<SelectProps>`
  ${BaseInput}

  cursor: pointer;
  user-select: none;
`;


export default Select;
