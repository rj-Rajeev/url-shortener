import express from "express";
import {
  createShortUrl,
  redirectOriginalUrl,
} from "../controllers/url.controller.js";

export const Router = express.Router();

Router.post("/", createShortUrl);

Router.get("/:shortid", redirectOriginalUrl);
