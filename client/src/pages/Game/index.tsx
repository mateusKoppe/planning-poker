import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PokerTable from "components/PokerTable";
import Card from "components/Card";
import { game, findgame } from "store/actions/game";

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
  margin: 0.1em 0;
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
  const { gameId }: { gameId: string } = useParams();
  const hand = [0, 1, 2, 3, 5, 8, 13, 18, 21];

  const [game, setGame] = useState<game | null>(null);
  const [isGameInvalid, setIsGameInvalid] = useState(false)
  const [isGameLoading, setIsGameLoading] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      setIsGameLoading(true);
      const foundGame = await findgame(gameId);
      setIsGameLoading(false);

      if (!foundGame) {
        setIsGameInvalid(true)
      }

      setGame(foundGame)
    };
    fetch();
  }, [gameId]);

  if (isGameLoading)
    return (
      <div>Loading!!!</div>
    )

  if (isGameInvalid)
    return (
      <div>Invalid game</div>
    )

  return (
    <Wrapper>
      <Header>
        <RoomName>{game?.name}</RoomName>
      </Header>
      <Table>
        <PokerTable>
          <Card value={2} />
          <Card value={2} />
          <Card value={3} />
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
