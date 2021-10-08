const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constants = require("../constants");

const TokenSchema = new Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "teams",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: constants.EXP_TIME_TOKEN,
  },
});

module.exports =
  mongoose.models.tokens || mongoose.model("tokens", TokenSchema);
