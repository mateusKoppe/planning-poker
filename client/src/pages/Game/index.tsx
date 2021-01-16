import React from "react";
import { useParams } from "react-router-dom";
import styled, { css } from "styled-components/macro";

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
`

const GamePage = () => {
  const { gameId }: { gameId: string } = useParams();
  const hand = [0, 1, 2, 3, 5, 8, 13, 18];
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

  if (isGameInvalid) return <div>Invalid game</div>;

  return (
    <Wrapper>
      <Header>
        <RoomName>
          {game?.name} - {profile?.name}
        </RoomName>
      </Header>
      {profile && game ? (
        <>
          <TableWrapper>
            <StyledTable
              game={game}
              onNewVoting={startNewVoting}
              onRevealCards={revealCards}
            />
          </TableWrapper>
          <Hand
            hand={hand}
            profile={profile}
            onSelectCard={selectCard}
            game={game}
          />
        </>
      ) : (
        <JoinForm onSubmit={joinGame} />
      )}
    </Wrapper>
  );
};

export default GamePage;
