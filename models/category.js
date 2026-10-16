// fixCategory.js
require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("./models/listing");

mongoose.connect(process.env.ATLASDB_URL).then(async () => {
  const r = await Listing.updateMany(
    { category: { $exists: false } },
    { $set: { category: "home" } },
  );
  console.log("Updated:", r.modifiedCount);
  process.exit();
});
