const express = require("express");
const axios = require("axios");
const cors = require("cors");

async function start() {
  const app = express();

  const {
    data: { results: users },
  } = await axios("https://randomuser.me/api/?results=1000");

  const router = express.Router();

  router.get("/search", (req, res, next) => {
    const { q } = req.query;
    if (!q) return next(new Error("No query found"));

    const searched = users.filter((u) => {
      const name = `${u.name.first} ${u.name.last}`.toLowerCase();
      return name.includes(q.toLowerCase());
    });

    res.json(searched);
  });

  app.use(cors());
  app.use(router);

  app.listen(9999);
  console.log("API is listening on http://localhost:9999");
}

start();
