const express = require("express");
const app = express();

const PORT = 34243;

const server = app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`);
});
