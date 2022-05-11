const pool = require("../configs/database");

exports.orders = async (req, res) => {
  const client = await pool.connect();
  const { user } = req.body;

  try {
    // select user
    const customer = await client.query(
      `SELECT * FROM customers WHERE email= $1`,
      [user.email]
    );

    if (user.email === customer.rows[0].email) {
      const orders = await client.query(
        `SELECT payment_id, items_purchased, created, amount FROM customer_order where purchaser=$1 order by id Desc`,
        [user.email]
      );
      // console.log(orders.rosw[0]);
      res.send(orders.rows[0]);
    } else {
      console.log("no match");

      res.status(500).json({
        error: "Database error occurred while veryfying user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "No data available in database!",
    });
  }
};
