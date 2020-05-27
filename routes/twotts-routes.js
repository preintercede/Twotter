const express = require("express");

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
  res.json({ twott });
});

module.exports = router;
