const express = require("express");
const { check } = require("express-validator");
const twottsControllers = require("../controllers/twotts-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.get("/:tid", twottsControllers.getTwottById);

router.get("/user/:uid", twottsControllers.getTwottsByUserId);

router.use(checkAuth);

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 1 })],
  twottsControllers.createTwott
);

router.put(
  "/:tid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 1 })],
  twottsControllers.updateTwott
);

router.delete("/:tid", twottsControllers.deleteTwott);

module.exports = router;
