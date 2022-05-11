const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const port = process.env.PORT || 5000;

const app = express();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/login"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for /user endpoint of API
app.use("/", user);

app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
