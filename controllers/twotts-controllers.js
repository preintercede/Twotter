const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const uuid = require("uuid");
let FAKE_TWOTTS = [
  {
    id: "user1",
    title: "What I did today",
    description: "code",
    creator: "u1",
  },
];

const getTwottById = (req, res, next) => {
  const twottId = req.params.tid;
  const twott = FAKE_TWOTTS.find((t) => {
    return t.id === twottId;
  });

  if (!twott) {
    throw new HttpError("Could not find a twott for the provided id", 404);
  }

  res.json({ twott });
};

const getTwottsByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const twotts = FAKE_TWOTTS.filter((t) => {
    return t.creator === userId;
  });

  if (!twotts || twotts.length === 0) {
    return next(
      new HttpError("Could not find twotts for the provided user id", 404)
    );
  }

  res.json({ twotts });
};

const createTwott = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed", 422);
  }
  const { title, description, creator } = req.body;
  const createdTwott = {
    id: uuid.v4(),
    title,
    description,
    creator,
  };

  FAKE_TWOTTS.push(createdTwott);
  res.status(201).json({ twott: createdTwott });
};

const updateTwott = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed", 422);
  }
  const { title, description } = req.body;
  const twottId = req.params.tid;
  const updatedTwott = { ...FAKE_TWOTTS.find((t) => t.id === twottId) };
  const twottIndex = FAKE_TWOTTS.findIndex((t) => t.id === twottId);
  updatedTwott.title = title;
  updatedTwott.description = description;

  FAKE_TWOTTS[twottIndex] = updatedTwott;

  res.status(200).json({ twott: updatedTwott });
};

const deleteTwott = (req, res, next) => {
  const twottId = req.params.tid;
  if (!FAKE_TWOTTS.find((t) => t.id === twottId)) {
    throw new HttpError("Could not find place for that id", 404);
  }
  FAKE_TWOTTS = FAKE_TWOTTS.filter((t) => t.id !== twottId);
  res.status(200).json({ message: "Deleted place" });
};

exports.getTwottById = getTwottById;
exports.getTwottsByUserId = getTwottsByUserId;
exports.createTwott = createTwott;
exports.updateTwott = updateTwott;
exports.deleteTwott = deleteTwott;
