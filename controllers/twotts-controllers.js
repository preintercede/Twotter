const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Twott = require("../models/twott");
let FAKE_TWOTTS = [
  {
    id: "user1",
    title: "What I did today",
    description: "code",
    creator: "u1",
  },
];

const getTwottById = async (req, res, next) => {
  const twottId = req.params.tid;
  let twott;

  try {
    twott = await Twott.findById(twottId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not find twott",
      500
    );
    return next(error);
  }

  if (!twott) {
    const error = new HttpError(
      "Could not find a twott for the provided id",
      404
    );
    return next(error);
  }

  res.json({ twott: twott.toObject({ getters: true }) });
};

const getTwottsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let twotts;

  try {
    twotts = await Twott.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching twotts failed, please try again",
      500
    );
    return next(error);
  }

  if (!twotts || twotts.length === 0) {
    return next(
      new HttpError("Could not find twotts for the provided user id", 404)
    );
  }

  res.json({
    twotts: twotts.map((twott) => twott.toObject({ getters: true })),
  });
};

const createTwott = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid input passed", 422);
  }
  const { title, description, creator } = req.body;
  const createdTwott = new Twott({
    title,
    description,
    creator,
  });
  try {
    await createdTwott.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create twott failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ twott: createdTwott });
};

const updateTwott = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input passed", 422));
  }

  const { title, description } = req.body;
  const twottId = req.params.tid;

  let twott;
  try {
    twott = await Twott.findById(twottId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update twott",
      500
    );
    return next(error);
  }

  twott.title = title;
  twott.description = description;

  try {
    await twott.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update twott",
      500
    );
    return next(error);
  }

  res.status(200).json({ twott: twott.toObject({ getters: true }) });
};

const deleteTwott = async (req, res, next) => {
  const twottId = req.params.tid;
  let twott;
  try {
    twott = await Twott.findById(twottId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete twott",
      500
    );
    return next(error);
  }

  try {
    await twott.remove();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete twott",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Deleted place" });
};

exports.getTwottById = getTwottById;
exports.getTwottsByUserId = getTwottsByUserId;
exports.createTwott = createTwott;
exports.updateTwott = updateTwott;
exports.deleteTwott = deleteTwott;
