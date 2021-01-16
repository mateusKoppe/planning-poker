import { useEffect, useState } from "react";
import { findgame, Game } from "store/actions/game";
import socket from "utils/websocket";

const useGame = (gameId: string) => {
  const [game, setGame] = useState<Game | null>(null);
  const [isGameInvalid, setIsGameInvalid] = useState<boolean>(false);
  const [isGameLoading, setIsGameLoading] = useState<boolean>(false);

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

  const [profile, setProfile] = useState<{ name: string }>();
  useEffect(() => {
    socket.on(
      "joined game",
      ({
        game,
        profile: createdProfile,
      }: {
        game: Game;
        profile: { name: string };
      }) => {
        console.log(game, createdProfile);
        setProfile(createdProfile);
        setGame(game);
      }
    );

    socket.on("user left", ({ game }: { game: Game }) => {
      setGame(game);
    });

    socket.on(
      "new user",
      ({ newUser, game }: { newUser: { name: string }; game: Game }) => {
        alert(`cola ai ${newUser.name}`);
        setGame(game);
      }
    );

    socket.on(
      "user played",
      ({ user, game }: { user: { id: string }; game: Game }) => {
        console.log(game)
        setGame(game);
      }
    );
  }, []);

  const joinGame = (value: { name: string }) => {
    socket.emit("join game", { game, profile: value });
  };

  return { game, joinGame, profile, isGameLoading, isGameInvalid };
};

export default useGame;
