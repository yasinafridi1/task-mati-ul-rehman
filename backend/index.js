const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db/connect");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = express.Router();

// Enable CORS for only localhost:3000
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

const user = require("./controller/userRoute");

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/user", user);

db;
app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
