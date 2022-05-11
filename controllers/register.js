const bcrypt = require("bcrypt");
const pool = require("../configs/database");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const client = await pool.connect();

  const { email, password } = req.body;
  if (email === "" || password === "") {
    return;
  }

  try {
    // Check if user exists
    const data = await client.query(
      `SELECT * FROM customers WHERE email = $1;`,
      [email]
    );
    const arr = data.rows;
    if (arr.length !== 0) {
      res.status(400).json({
        error: "Email already there, No need to register again.",
      });
      return;
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          email,
          password: hash,
        };

        //Inserting data into the database
        const InsertQuery = `INSERT INTO customers (email, password) VALUES ($1,$2) RETURNING id, email`;

        client.query(
          InsertQuery,
          [user.email, user.password],
          (err, results) => {
            if (err) {
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              const token = jwt.sign({ username: password }, "secret");
              res.status(201).send({ data: results.rows[0], token: token });
            }
          }
        );
      });
    }
  } catch (error) {
    res.status(500).json({
      //Database connection error
      error: "Database error while registring user!",
    });
  }
};
