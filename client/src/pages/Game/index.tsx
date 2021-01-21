import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import JoinForm from "./components/JoinForm";
import useGame from "./hook/useGame";
import Hand from "./components/Hand";
import Table from "./components/Table";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: 10rem auto auto;
  grid-template-columns: 100%;
  padding: 2rem;
  min-height: 100vh;
  justify-content: center;
`;

const Header = styled.header`
  flex-basis: 100;
`;

const RoomName = styled.h2`
  font-size: 3.5rem;
  margin: 0.1em 0;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledTable = styled(Table)`
  max-width: 150rem;
  width: 100%;
`;

const GamePage = () => {
  const { gameId }: { gameId: string } = useParams();

  const {
    game,
    profile,
    isGameLoading,
    isGameInvalid,
    joinGame,
    selectCard,
    startNewVoting,
    revealCards,
  } = useGame(gameId);

  if (isGameLoading) return <div>Loading!!!</div>;

  if (!game || isGameInvalid) return <div>Invalid game</div>;

  if (!profile) {
    return <JoinForm game={game} onSubmit={joinGame} />;
  }

  return (
    <Wrapper>
      <Header>
        <RoomName>
          {game?.name} - {profile?.name}
        </RoomName>
      </Header>
      <TableWrapper>
        <StyledTable
          game={game}
          onNewVoting={startNewVoting}
          onRevealCards={revealCards}
        />
      </TableWrapper>
      <Hand
        profile={profile}
        onSelectCard={selectCard}
        game={game}
      />
    </Wrapper>
  );
};

export default GamePage;
