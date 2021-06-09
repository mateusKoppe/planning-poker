const express = require("express");
const path = require("path");
const app = require("./server/index");

const PORT = Number(process.env.REACT_APP_API_PORT ?? 8080);

app(PORT, (config) => {
  config.use(express.static("client/build"));
  config.get("*", (req, res) =>
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
  );
});
