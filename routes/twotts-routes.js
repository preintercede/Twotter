const express = require("express");
const HttpError = require("../models/http-error");

const router = express.Router();

const FAKE_TWOTTS = [
  {
    id: "user1",
    title: "What I did today",
    description: "code",
    creator: "u1",
  },
];

router.get("/:tid", (req, res, next) => {
  const twottId = req.params.tid;
  const twott = FAKE_TWOTTS.find((t) => {
    return t.id === twottId;
  });

  if (!twott) {
    throw new HttpError("Could not find a twott for the provided id", 404);
  }

  res.json({ twott });
});

router.get("/user/:uid", (req, res, next) => {
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
});

module.exports = router;
