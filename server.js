const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname) });
});

app.get("/api/news", async (req, res) => {
  const query = req.query.q || "all";
  const pageNo = req.query.page || 1;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=60e6616f7e4640cebde3fa430b22462a&pageSize=10&page=${pageNo}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
