import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FormControl,
  Form,
} from "react-bootstrap";

const CARDS_VALUE = [1, 2, 3, 5, 8, 13, 21];

const STEP = {
  REGISTER: 1,
  SELECTING: 2,
};

function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [username, setUsername] = useState('');
  const [step, setStep] = useState(STEP.REGISTER);
  const [ws, setWs] = useState(null)

  const handleReceiveMessage = (action) => {
    const {payload, type} = action
    switch (type) {
      case "USER_REGISTERED":
        setStep(STEP.SELECTING);
        break;
    }
  }

  useEffect(() => {
    const wsConnection = new WebSocket("ws://localhost:8765")

    wsConnection.onopen = () => {
      console.log("websocket connected");
    };

    wsConnection.onmessage = (message) => {
      const action = JSON.parse(message.data)
      handleReceiveMessage(action)
    };

    setWs(wsConnection)
  }, []);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    ws.send(
      JSON.stringify({
        type: "REGISTER_USER",
        payload: { username },
      })
    );
  };

  const selectCard = (card) => {
    setSelectedCard(card);
    ws.send(
      JSON.stringify({
        type: "SELECT_CARD",
        payload: {
          card,
          username,
        },
      })
    );
  };

  return (
    <div className="App pt-5">
      {step === STEP.REGISTER && (
        <Container>
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Col sm="9">
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  size="lg"
                />
              </Col>
              <Col sm="3">
                <Button type="submit" size="lg">Entrar</Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      )}
      {step === STEP.SELECTING && (
        <Container className="mt-5">
          <p>Selecionando como: {username}</p>
          <Row>
            {CARDS_VALUE.map((card) => (
              <Col key={card}>
                <Card>
                  <h2 className="text-center">{card}</h2>
                  <Button onClick={() => selectCard(card)}>Select</Button>
                </Card>
              </Col>
            ))}
          </Row>
          {selectedCard && (
            <h1 className="text-center mt-5">Você selecionou {selectedCard}</h1>
          )}
        </Container>
      )}
    </div>
  );
}

export default App;
