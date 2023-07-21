const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes.js");
const mongoose = require("mongoose");

// settings
const app = express();
app.use(cors({
  origin: "http://127.0.0.1:5173",
  credentials: true
}

));
app.use(morgan('dev'));
app.use(cookieParser());

const port = process.env.PORT || 9000;

// middlewares
app.use(express.json());
app.use(authRoutes);

// routes
app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

// mongodb connection
mongoose
  .connect("mongodb+srv://JhaelDnk:hesoyam123@cluster0.jqdrnvh.mongodb.net/mydatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

// server listening
app.listen(port, () => console.log("Server listening on port", port));
