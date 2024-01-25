const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/wedbook")
  .then(async () => {
    console.log("Connected to database.");
  })
  .catch((error) => {
    console.log(error);
  });
module.exports = mongoose.connect;
