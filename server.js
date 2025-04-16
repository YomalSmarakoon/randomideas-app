const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 5000;

connectDB();
const app = express();

// Static Folder
app.use(express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.json({ message: "Welcome to the RandomIdeas API" });
});

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
