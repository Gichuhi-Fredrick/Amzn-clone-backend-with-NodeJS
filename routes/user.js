const express = require("express");
const router = express.Router();

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const { payment } = require("../controllers/payment");
const { orders } = require("../controllers/orders");
const { auth } = require("../controllers/auth");
const { home } = require("../controllers/home");

// Post requests on corresponding methods
app.all(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
router.all(["payment", "orders"], auth);
router.get("/", home);
router.post("/register", register);
router.post("/login", login);
router.post("/payment", payment);
router.post("/orders", orders);
module.exports = router;
