const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

require("./db/configDB");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const User = require("./db/userSchema");

app.post("/register", async (req, res) => {
  console.log(req.body);
  const newUser = new User(req.body);
  let result = await newUser.save();
  result = result.toObject();
  delete result.password;

  if (result) {
    console.log("succesfully registered");
    res.send(result);
  } else {
    res.send("failed to register");
  }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user found" });
    }
  } else if (
    req.body.password === "admin123" &&
    req.body.email === "admin123@admin.com"
  ) {
    let user = await User.findOne(req.body).select("-password");
    res.send(user);
  } else {
    res.send({ result: "no user found" });
  }
});

app.get("/editProfile/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user) {
    res.send(user);
  }
});

app.get("/adminProfile", async (req, res) => {
  let user = await User.find();
  if (user) {
    res.send(user);
  }
});

app.delete("/deleteProfile/:id", async (req, res) => {
  let user = await User.deleteOne({ _id: req.params.id });
  if (user) {
    res.send("user succesfully deleted.");
  }
});

app.get("/editAdminProfile/:id", async (req, res) => {
  let user = await User.findOne({ _id: req.params.id });
  if (user) {
    res.send(user);
  }
});

app.put("/editProfile/:id", async (req, res) => {
  let user = await User.replaceOne(
    { _id: req.params.id },
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { overwrite: true }
  );
  if (user) {
    res.send(user);
    console.log("updated succesfully");
  }
});

app.put("/editAdminProfile/:id", async (req, res) => {
  let user = await User.replaceOne(
    { _id: req.params.id },
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { overwrite: true }
  );
  if (user) {
    res.send(user);
    console.log("updated succesfully");
  }
});

app.listen(PORT, () => {
  console.log(`server running succesfully on port ${PORT}`);
});
