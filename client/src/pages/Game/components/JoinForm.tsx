import { Input, Button } from "components/Ui";
import React, { FormEvent, useState } from "react";
import styled from "styled-components/macro";
import { Game } from "types/Game";

const Wrapper = styled.div`
  display: flex;
  padding: 2rem;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 50rem;
  text-align: center;
`;

const Form = styled.form`
  display: grid;
  justify-content: center;
  grid-template-columns: auto 8rem;
  gap: 15px;
`;

interface JoinFormProps {
  onSubmit: Function;
  game: Game;
}

const JoinForm = ({ onSubmit, game }: JoinFormProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit({ name });
  };

  return (
    <Wrapper>
      <Content>
        <h1 style={{ marginTop: 0 }}>Planning Poker - {game.name}</h1>
        <p>Enter your name to enter the game</p>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button>Join</Button>
        </Form>
      </Content>
    </Wrapper>
  );
};

export default JoinForm;
