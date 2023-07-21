const mongoose = require("mongoose");

const pantallaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    url: {
        type: String,
        required: true,
 /*        unique: true, */
    },
    detalle: {
        type: String,
        required: true,
        /* unique: true, */
    },
    state: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Pantalla", pantallaSchema);
