const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    heading: {
      type: String
    },
    body: {
      type: String
    },
    createdby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Note", noteSchema);
