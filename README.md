# Planning Poker
> Estimate your tasks easily

![demo](./docs/demo.gif)

This app provides a simple, real-time and easy-to-use interface to help your team estimate the tasks in your sprints.

### Built with
- [React](https://reactjs.org/)
- [NodeJs](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)
- [Socket.io](https://socket.io)

## Getting Started

### Server
Access the `server` folder and install the dependencies with your package manager:
```bash
cd server
yarn
```

Compile the TypeScript files and run the server:
```bash
yarn build
yarn start
```

It will spin-up a server on the port `8080`, you can change this with the `PORT` environment variable.

### Client
Access the `client` folder and install the dependencies with your package manager:
```bash
cd client
yarn
```

If you are going to use the server in a different address than `localhost:8080` you need to configure that in the `client/src/config.ts` file.

Start the client server
```bash
yarn start
```

## Development
If you want to make changes in the project first install the dependencies following the `Getting Started` section.

The client does not need any additional configuration for development.

### Server:
To make changes in the server you will probably want hot-reload, for that just run:
```bash
cd server
yarn dev
```

### Building
To deploy the application you can follow the `Getting Started` section with the only extra-step of building the frontend, for that just run:

```bash
cd client
yarn build
```

## License

Distributed under the MIT License. See `LICENSE` for more information.