import { nanoid } from "nanoid";
import Url from "../models/url.model.js";

export const createShortUrl = async (req, res) => {
  try {
    const longUrl = req.body.originalUrl;
    console.log(longUrl);
    const shortId = nanoid(5);
    const newUrl = new Url({
      longUrl: longUrl,
      shortUrl: shortId,
    });

    // Save the newUrl to the database
    await newUrl.save();

    console.log(newUrl);
    res.json({ longUrl, shortUrl: newUrl.shortUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const redirectOriginalUrl = async (req, res) => {
  try {
    const shortId = req.params.shortId;

    const urlDocument = await Url.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: Date.now() } }
    );

    if (urlDocument) {
      const originalUrl = urlDocument.longUrl;

      const hasProtocol =
        originalUrl.startsWith("http://") || originalUrl.startsWith("https://");
      const fullUrl = hasProtocol ? originalUrl : `https://${originalUrl}`;

      res.redirect(fullUrl);
    } else {
      res.status(404).json({ error: "URL not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
