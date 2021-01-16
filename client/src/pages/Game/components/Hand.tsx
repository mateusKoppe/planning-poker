import React, { FunctionComponent } from "react";

import { Profile } from "../hook/useGame";

import { Game } from "store/actions/game";
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
  hand: number[];
  game: Game;
  onSelectCard: Function;
  profile: Profile;
}

const Hand: FunctionComponent<HandProps> = ({
  hand,
  game,
  onSelectCard,
  profile,
}) => (
  <Wrapper>
    <div>
      {hand.map((value) => (
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
