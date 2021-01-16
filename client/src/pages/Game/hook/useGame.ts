import { useEffect, useState } from "react";

import { Game } from "types/Game";
import { Profile } from "types/Profile";

import { findgame } from "actions/game";
import socket from "utils/websocket";

const useGame = (gameId: string) => {
  const [game, setGame] = useState<Game>();
  const [isGameInvalid, setIsGameInvalid] = useState<boolean>(false);
  const [isGameLoading, setIsGameLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setIsGameLoading(true);
      const foundGame = await findgame(gameId);
      setIsGameLoading(false);

      if (!foundGame) {
        setIsGameInvalid(true);
      }

      setGame(foundGame);
    };
    fetch();
  }, [gameId]);

  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    socket.on(
      "joined game",
      ({ game, profile: createdProfile }: { game: Game; profile: Profile }) => {
        setProfile(createdProfile);
        setGame(game);
      }
    );

    socket.on("user left", ({ game }: { game: Game }) => {
      setGame(game);
    });

    socket.on(
      "new user",
      ({
        newUser,
        game,
      }: {
        newUser: { name: string; id: string };
        game: Game;
      }) => {
        setGame(game);
      }
    );

    socket.on(
      "user played",
      ({ user, game }: { user: { id: string }; game: Game }) => {
        setGame(game);
      }
    );

    socket.on("game revealed", ({ game }: { game: Game }) => {
      setGame(game);
      setProfile({ ...profile, hand: undefined } as Profile);
    });
  }, []);

  const selectCard = (card: number) => {
    setProfile({ ...profile, hand: card } as Profile);
    socket.emit("select card", { card });
  };

  const joinGame = (value: { name: string }) => {
    socket.emit("join game", { game, profile: value });
  };

  const revealCards = () => {
    socket.emit("reveal cards");
  };

  const startNewVoting = () => {
    socket.emit("reset voting");
  };

  return {
    game,
    joinGame,
    profile,
    isGameLoading,
    isGameInvalid,
    selectCard,
    revealCards,
    startNewVoting,
  };
};

export default useGame;
