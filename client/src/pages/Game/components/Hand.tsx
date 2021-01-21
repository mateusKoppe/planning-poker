import React, { FunctionComponent } from "react";

import { Game } from "types/Game";
import { Profile } from "types/Profile";

import styled from "styled-components";
import Card from "components/Card";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

interface HandProps {
  game: Game;
  onSelectCard: Function;
  profile: Profile;
}

const Hand: FunctionComponent<HandProps> = ({
  game,
  onSelectCard,
  profile,
}) => (
  <Wrapper>
    <div>
      {game.cards.map((value) => (
        <Card
          onClick={() => !game.revealed && onSelectCard(value)}
          selected={profile.hand === value}
          readOnly={game.revealed || profile.hand === value}
          value={value}
          key={value}
        />
      ))}
    </div>
  </Wrapper>
);

export default Hand;
