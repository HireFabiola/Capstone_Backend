require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cors());


app.get("/", (req, res) => {
  res.send("R4B Studio CRM API is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});