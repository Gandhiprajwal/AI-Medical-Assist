// Mongoose Connection
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/medical-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process with failure
  });

module.exports = mongoose;
