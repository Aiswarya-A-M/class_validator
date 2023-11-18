const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { body, validationResult } = require("express-validator");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const registerSchema = [
  body("userName")
    .exists()
    .isLength({ min: 6 })
    .withMessage("must contain 6 character and not empty"),
  body("userEmail")
    .isEmail()
    .normalizeEmail()
    .withMessage("email should exist"),
  body("userPassword")
    .isLength({
      min: 6,
    })
    .withMessage("password should contain at least 6 characters"),
];

app.post("/", registerSchema, validationRequestSchema, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login successful",
  });
  console.log(req.body);
});

function validationRequestSchema(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
}

app.listen(5000,()=>{
  console.log("server is running")
});
