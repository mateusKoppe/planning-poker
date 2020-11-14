import React from "react";
import styled from "styled-components";

import HomeTableImg from "../../assets/images/home-table.png";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.main};
  color: white;
  display: flex;
  padding: 2rem;
  display: flex;
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
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur odio tellus, a venenatis orci ultricies ut. Vivamus pellentesque lectus libero, non porttitor nulla vestibulum ac.</p>
          <button>Create Room</button>
        </div>
        <div>
          <Image src={HomeTableImg} />
        </div>
      </Content>
    </Wrapper>
  );
};

export default Home;
