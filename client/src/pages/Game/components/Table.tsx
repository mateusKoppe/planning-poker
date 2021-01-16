import Card from "components/Card";
import PokerTable from "components/PokerTable";
import { Button } from "components/Ui";
import React, { FunctionComponent, HTMLAttributes } from "react";
import { Game } from "store/actions/game";
import styled from "styled-components/macro";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const Players = styled.div`
  padding: 4rem 1rem;
`;

const Player = styled.div`
  display: flex;
`;

interface TableProps extends HTMLAttributes<HTMLDivElement> {
  game: Game;
  onNewVoting?: Function;
  onRevealCards?: Function;
}

const Table: FunctionComponent<TableProps> = ({
  game,
  onNewVoting = () => {},
  onRevealCards = () => {},
  ...props
}) => (
  <Wrapper {...props}>
    <PokerTable>
      <Content>
        <Players style={{ flexGrow: 2 }}>
          {game?.users.map((user, index) => (
            <Player key={index} style={{ display: "inline-block" }}>
              <Card unknown={!game.revealed} value={user?.hand} readOnly />
              <br />
              {user.name}
            </Player>
          ))}
        </Players>
        <div>
          {game?.revealed ? (
            <Button onClick={() => onNewVoting()}> Reset vote</Button>
          ) : (
            <Button onClick={() => onRevealCards()}>Reveal</Button>
          )}
        </div>
      </Content>
    </PokerTable>
  </Wrapper>
);

export default Table;
