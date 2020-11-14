import styled from "styled-components";

const Wrapper = styled.div`
  border: .8em solid ${props => props.theme.colors.pokerBorderDark};
  border-radius: 3.75rem;
`

const Content = styled.div`
  border-radius: 3rem;
  padding: 2em;
  background-color: ${props => props.theme.colors.pokerGreen};
  border: .7em solid ${props => props.theme.colors.pokerBorderLight};
`

const PokerTable = ({ children }) => {
  return (
    <Wrapper>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default PokerTable;