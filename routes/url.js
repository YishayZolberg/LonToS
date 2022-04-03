const express = require("express");
const router = express.Router();

const validUrl = require("valid-url");
const { nanoid } = require("nanoid");
//import URLSchema
const URLSchema = require("../models/Url");

const baseUrl = "http:localhost:5000"; //TODO Replace the baseUrl with actually url
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  const urlCodeShortId = nanoid();
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCodeShortId;
        url = new URLSchema({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });
        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(401).json("Invalid longUrl");
  }
});

module.exports = router;
