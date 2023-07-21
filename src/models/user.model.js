const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    nombre:{
      type: String,
      required: true,
    },
    apellido:{
      type: String,
      required: true,
    },
    dni:{
      type: String,
      required: true,
    },
    telf:{
      type: String,
      required: true,
    },
    estado:{
      type: String,
      enum: ["active", "inactive"],
      required: true,
      default: "active",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
