const express = require("express");
const app = express();

app.get("/fast", (req, res) => {
  res.send("Fast request completed");
});

app.get("/slow", (req, res) => {
  console.log("Slow request received but not completed");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});