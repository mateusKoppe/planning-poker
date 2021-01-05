import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button } from "components/Ui";

import HomeTableImg from "assets/images/home-table.png";

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(2, calc(50% - (3rem / 2)));
  align-items: center;
  column-gap: 3rem;
  width: 100%;
  max-width: 110rem;
`;

const Image = styled.img`
  max-width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <Content>
        <div>
          <h1 style={{ marginTop: 0 }}>Planning Poker</h1>
          <p>
            Estimate your tasks using poker <br />
            without influencing others.
          </p>
          <Link to="/create-game">
            <Button>Create Room</Button>
          </Link>
        </div>
        <div>
          <Image src={HomeTableImg} />
        </div>
      </Content>
    </Wrapper>
  );
};

export default Home;
