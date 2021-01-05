import { css } from "styled-components";

export interface BaseInputInterface {
  block?: boolean
}

const BaseInputButton = css<BaseInputInterface>`
  background-color: white;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.6rem;
  box-shadow: 0 .3em .3em rgba(0,0,0,.3);
  border: none;
  border-radius: 1em;
  font-weight: bold;
  padding: .6em 1.5em;
  line-height: 1;
  margin: .6em 0;

  ${props => props.block && css`
    display: block;
    width: 100%;
  `}
`;

export default BaseInputButton
