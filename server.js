const express = require("express");
const bodyParser = require('body-parser')
const port = 5000;

const app = express();

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.json({ message: "Welcome to the RandomIdeas API" });
});

const ideasRouter = require('./routes/ideas')
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
