const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => console.log(`MongoDB connected successfully to ${data.connection.host}`))
  .catch((error) => console.error('MongoDB connection error:', error));

module.exports = mongoose.connection;
