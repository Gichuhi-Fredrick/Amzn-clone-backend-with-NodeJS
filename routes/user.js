const express = require("express");
const router = express.Router();

const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const { payment } = require("../controllers/payment");
const { orders } = require("../controllers/orders");
const { auth } = require("../controllers/auth");

// Post requests on corresponding methods
router.all(["payment", "orders"], auth);
router.post("/register", register);
router.post("/login", login);
router.post("/payment", payment);
router.post("/orders", orders);
module.exports = router;
