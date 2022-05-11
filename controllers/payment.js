const pool = require("../configs/database");
const stripe = require("stripe")(
  "sk_test_51Kln9LLGsLdoY76qBDvB0xQMGowua7W7jf4FwcXY6LFvLSEqLai0v2WH0mbYfLfFTDVBIdVCqYcyT5gOa3Upe0q700Jec5fNky"
);

exports.payment = async (req, res) => {
  const total = req.query.total;
  const client = await pool.connect();
  const { user, basket } = req.body;

  const jsonBasket = JSON.stringify(basket);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    payment_method_types: ["card"],
  });

  const customer = await client.query(
    `SELECT * FROM customers WHERE email= $1`,
    [user.email]
  );
  const queryText =
    "INSERT INTO customer_order(payment_id, purchaser, items_purchased, amount, created) VALUES($1, $2, $3, $4, $5) RETURNING payment_id";
  const orderValues = [
    paymentIntent.id,
    customer.rows[0].email,
    jsonBasket,
    paymentIntent.amount,
    paymentIntent.created,
  ];

  await client.query(queryText, orderValues);

  res.send({ client_secret: paymentIntent.client_secret });
};
