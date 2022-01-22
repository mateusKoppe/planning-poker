import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

import JoinForm from "./components/JoinForm";
import useGame from "./hook/useGame";
import Hand from "./components/Hand";
import Table from "./components/Table";
import Header from "./components/Header";

const Wrapper = styled.div({
  display: "grid",
  gridTemplateRows: "10rem auto auto",
  gridTemplateColumns: "100%",
  padding: "2rem",
  minHeight: "100vh",
  justifyContent: "center"
});

const TableWrapper = styled.div({
  display: "flex",
  justifyContent: "center"
});

const StyledTable = styled(Table)({
  maxWidth: "150rem",
  width: "100%"
});

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
      <Header game={game} profile={profile}/>
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
