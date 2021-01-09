import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { Button, Input, Select } from "components/Ui";
import { createGame } from "store/reducers/game";
import { useHistory } from "react-router-dom";

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

const CreateGame = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [game, setGame] = useState({
    name: '',
    style: 1
  })

  const handleInputChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    setGame({
      ...game,
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(createGame(game))
    history.push("/game/123")
  }

  return (
    <Wrapper>
      <Content>
        <form onSubmit={handleSubmit}>
          <h1 style={{ marginTop: 0 }}>Planning Poker</h1>
          <p>Create and configure your room</p>
          <Input
            value={game.name}
            onChange={handleInputChange}
            name="name"
            placeholder="Game Name"
            block
            required
          />
          <Select
            value={game.style}
            onChange={handleInputChange}
            name="style"
            block
            required
          >
            <option value={1}>Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)</option>
            <option value={2}>Power of 2 (0, 1, 2, 4, 8, 16, 32, 64, ?)</option>
          </Select>
          <Button block>Create Room</Button>
        </form>
        <div>
        </div>
      </Content>
    </Wrapper>
  );
};

export default CreateGame;
