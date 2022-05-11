const express = require("express");
const cors = require("cors");
require("./configs/dotenv");
const client = require("./configs/database");
const user = require("./routes/user");

const port = process.env.PORT || 5000;

//Connect to db
client.connect((err) => {
  if (err) console.log(err);
});

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for /user endpoint of API
app.use("/", user);

app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
