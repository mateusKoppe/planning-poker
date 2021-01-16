import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1em solid ${({ theme }) => theme.colors.pokerBorderDark};
  border-radius: calc(10% + 100rem);
  width: 100%;
`

const Content = styled.div`
  border-radius: calc(10% + 100rem);
  padding: 3em;
  background-color: ${({ theme }) => theme.colors.pokerGreen};
  border: .75em solid ${({ theme }) => theme.colors.pokerBorderLight};
  text-align: center;
`

type PokerTableProps = {
  children: ReactNode
}

const PokerTable = ({ children }: PokerTableProps) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default PokerTable;
