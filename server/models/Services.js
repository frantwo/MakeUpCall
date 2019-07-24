const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicesSchema = new Schema({
  name: String
});

const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
