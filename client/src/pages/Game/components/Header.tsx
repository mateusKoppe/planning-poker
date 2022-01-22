import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { Game } from "types/Game";
import { Profile } from "types/Profile";

const HeaderStyle = styled.header({
  flexBasis: 100
});

const RoomName = styled.h2({
  fontSize: "3.5rem",
  margin: "0.1em 0"
});

interface PokerTableProps {
  game: Game,
  profile: Profile
}

const Header: FunctionComponent<PokerTableProps> = ({ game, profile }) => (
  <HeaderStyle>
    <RoomName>
      {game.name} - {profile.name}
    </RoomName>
  </HeaderStyle>
)

export default Header
