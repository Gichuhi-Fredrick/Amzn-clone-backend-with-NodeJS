const bcrypt = require("bcrypt");
const pool = require("../configs/database");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const client = await pool.connect();
  const { email, password } = req.body;

  if (email === "" || password === "") {
    return;
  }
  try {
    //Verifying if the user exists in the database
    const data = await client.query(
      `SELECT * FROM customers WHERE email= $1;`,
      [email]
    );
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User is not registered, Sign Up first",
      });
    } else {
      bcrypt.compare(password, user[0].password, async (err, result) => {
        if (err) {
          res.status(500).json({ error: "server error" });
        } else if (result === true) {
          const token = jwt.sign({ username: password }, "secret");

          const user = await client.query(
            `SELECT email FROM customers WHERE email= $1;`,
            [email]
          );

          res.status(201).send({ data: user.rows[0], token: token });
        } else {
          if (result !== true)
            res.status(500).json({
              error: "Enter correct password!",
            });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database error occurred while signing in!",
    });
  }
};
