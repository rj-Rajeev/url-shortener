import express from "express";
import { Router } from "./src/routes/url.router.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

const app = express();

const uri =
  "mongodb+srv://rajeevbhardwaj:Rajeev1234@cluster1.fmutptt.mongodb.net/";

// Connect to MongoDB

mongoose
  .connect(uri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());

app.use("/", Router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
