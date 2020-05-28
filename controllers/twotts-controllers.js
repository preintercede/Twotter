const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const Twott = require("../models/twott");
const User = require("../models/user");
const mongoose = require("mongoose");

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

  let userWithTwotts;

  try {
    userWithTwotts = await User.findById(userId).populate("twotts");
  } catch (err) {
    const error = new HttpError(
      "Fetching twotts failed, please try again",
      500
    );
    return next(error);
  }

  if (!userWithTwotts || userWithTwotts.twotts.length === 0) {
    return next(
      new HttpError("Could not find twotts for the provided user id", 404)
    );
  }

  res.json({
    twotts: userWithTwotts.twotts.map((twott) =>
      twott.toObject({ getters: true })
    ),
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

  let user;

  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating twott failed, try again later", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTwott.save({ session: sess });
    user.twotts.push(createdTwott);
    await user.save({ session: sess });
    await sess.commitTransaction();
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
    twott = await Twott.findById(twottId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete twott",
      500
    );
    return next(error);
  }

  if (!twott) {
    const error = new HttpError("Could not find twott for this id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await twott.remove({ session: sess });
    twott.creator.twotts.pull(twott);
    await twott.creator.save({ session: sess });
    await sess.commitTransaction();
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
