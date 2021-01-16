import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import PokerTable from "components/PokerTable";
import Card from "components/Card";
import JoinForm from "./components/JoinForm";
import useGame from "./hook/useGame";
import socket from "utils/websocket";

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

const GamePage = () => {
  const { gameId }: { gameId: string } = useParams();
  const hand = [0, 1, 2, 3, 5, 8, 13, 18, 21];
  const { game, profile, joinGame, isGameLoading, isGameInvalid } = useGame(
    gameId
  );

  const handleSelectCard = (card: number) => {
    socket.emit("select card", { card });
  };

  if (isGameLoading) return <div>Loading!!!</div>;

  if (isGameInvalid) return <div>Invalid game</div>;

  return (
    <Wrapper>
      <Header>
        <RoomName>
          {game?.name} - {profile?.name}
        </RoomName>
      </Header>
      {profile ? (
        <>
          <Table>
            <PokerTable>
              {game?.users?.map((user, index) => (
                <div key={index} style={{ display: "inline-block" }}>
                  <Card value={user?.hand} />
                  {user.name}
                </div>
              ))}
            </PokerTable>
          </Table>
          <Hand>
            <div>
              {hand.map((value) => (
                <Card
                  onClick={() => handleSelectCard(value)}
                  value={value}
                  key={value}
                />
              ))}
            </div>
          </Hand>
        </>
      ) : (
        <JoinForm onSubmit={joinGame} />
      )}
    </Wrapper>
  );
};

export default GamePage;
