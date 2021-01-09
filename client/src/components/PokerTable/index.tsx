import React, { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  border: .8em solid ${({ theme }) => theme.colors.pokerBorderDark};
  border-radius: 3.75rem;
`

const Content = styled.div`
  border-radius: 3rem;
  padding: 2em;
  background-color: ${({ theme }) => theme.colors.pokerGreen};
  border: .7em solid ${({ theme }) => theme.colors.pokerBorderLight};
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
