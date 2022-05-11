const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const port = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for /user endpoint of API
app.use("/", user);

app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
