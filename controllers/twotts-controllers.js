const HttpError = require("../models/http-error");
var uuid = require("uuid");
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

const getTwottByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const twott = FAKE_TWOTTS.find((t) => {
    return t.creator === userId;
  });

  if (!twott) {
    return next(
      new HttpError("Could not find a twott for the provided user id", 404)
    );
  }

  res.json({ twott });
};

const createTwott = (req, res, next) => {
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
  FAKE_TWOTTS = FAKE_TWOTTS.filter((t) => t.id !== twottId);
  res.status(200).json({ message: "Deleted place" });
};

exports.getTwottById = getTwottById;
exports.getTwottByUserId = getTwottByUserId;
exports.createTwott = createTwott;
exports.updateTwott = updateTwott;
exports.deleteTwott = deleteTwott;
