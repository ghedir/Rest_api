const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config({ path: "./config.env" });

// connect database
const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("Database is connected"))
  .catch((err) => console.log(err));

//import our model
const User = require("./models/User");
//i will put the routers here
const router = express.Router();

//@get : RETURN ALL USERS
app.use(
  "/user",
  router.get("/all", (req, res) => {
    User.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json(err.message));
  })
);
//@POST :  ADD A NEW USER TO THE DATABASE
app.use(
  "/user",
  router.post("/adduser", (req, res) => {
    const newUser = req.body;
    const newPerson = new User(newUser);
    newPerson
      .save()
      .then(() => res.send("user is registred"))
      .catch((err) => res.status(400).json(err.message));
  })
);
//@PUT : EDIT A USER BY ID
app.use(
  "/user",
  router.put("/update/:id", (req, res) => {
    const updateData = req.body;
    User.findByIdAndUpdate(req.params.id, updateData)
      .then((data) => res.json("user is updated"))
      .catch((err) => res.status(400).json(err.message));
  })
);
//@delete : DELETE : REMOVE A USER BY ID
app.use(
  "/user",
  router.delete("/delete/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then((data) => res.json("user is deleted"))
      .catch((err) => res.status(400).json(err.message));
  })
);

//create server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("server is running on port ", PORT)
);
