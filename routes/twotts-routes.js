const express = require("express");
const twottsControllers = require("../controllers/twotts-controllers");

const router = express.Router();

router.get("/:tid", twottsControllers.getTwottById);

router.get("/user/:uid", twottsControllers.getTwottByUserId);

router.post("/", twottsControllers.createTwott);

router.put("/:tid", twottsControllers.updateTwott);

router.delete("/:tid", twottsControllers.deleteTwott);

module.exports = router;
