const uuid = require("uuid");
const { validationResult } = require("express-validator");
const HttpError = require("../models/http-error");

const FAKE_USERS = [
  {
    id: "u1",
    name: "John Doe",
    email: "test@test.com",
    password: "testing",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: FAKE_USERS });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid input passed", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = FAKE_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email already exists", 422);
  }

  const createdUser = {
    id: uuid.v4(),
    name,
    email,
    password,
  };

  FAKE_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = FAKE_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Invalid credentials", 401);
  }
  res.json({ message: "Logged In" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
