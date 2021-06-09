const PORT = process.env.REACT_APP_API_PORT ?? 8080;
const DOMAIN = process.env.REACT_APP_API_DOMAIN ?? "localhost";
const API_ADDRESS = `${DOMAIN}:${PORT}`;

const config = {
  API_URL: `http://${API_ADDRESS}/api`,
  WS_URL: `ws://${API_ADDRESS}`,
};

export default config;
