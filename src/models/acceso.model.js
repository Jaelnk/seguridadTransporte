const mongoose = require('mongoose');

const accesoSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    pantalla: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pantalla',
      required: true,
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

module.exports = mongoose.model('Acceso', accesoSchema);
