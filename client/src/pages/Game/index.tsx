import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "store/reducers";
import PokerTable from "components/PokerTable";
import Card from "components/Card";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10rem auto auto;
  padding: 2rem;
  min-height: 100vh;
`;

const Header = styled.header``;

const RoomName = styled.h2`
  font-size: 3.5rem;
  margin: .1em 0;
`;

const Table = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Hand = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Game = () => {
  const hand = [0, 1, 2, 3, 5, 8, 13, 18, 21];

  const game = useSelector((state: RootState) => state.game);

  return (
    <Wrapper>
      <Header>
        <RoomName>{game.name}</RoomName>
      </Header>
      <Table>
        <PokerTable>
          <Card value={2}/>
          <Card value={2}/>
          <Card value={3}/>
        </PokerTable>
      </Table>
      <Hand>
        <div>
          {hand.map((value) => (
            <Card value={value} key={value} />
          ))}
        </div>
      </Hand>
    </Wrapper>
  );
};

export default Game;
