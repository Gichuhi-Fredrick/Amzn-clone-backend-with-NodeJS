const express = require("express");
const cors = require("cors");
const user = require("./routes/user");

const port = process.env.PORT || 5000;

const app = express();
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, POST",
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route for /user endpoint of API
app.use("/", user);

app.listen(port, () => {
  console.log(`Port running on ${port}`);
});
