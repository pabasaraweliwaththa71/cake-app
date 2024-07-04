const mongoose = require("mongoose");

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  link: { type: String, required: true },
  price: { type: Number, required: true },
  instructor: { type: String, required: true },
  image: { type: String },
});
