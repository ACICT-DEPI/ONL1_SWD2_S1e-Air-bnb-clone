const express = require("express");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const Place = require("./models/Place");
const Booking = require("./models/Booking");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("connected to db");
});

app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user) {
      const passOk = bcrypt.compareSync(password, user.password);
      if (passOk) {
        jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(user);
          }
        );
      } else {
        res.status(422).json("Wrong Password");
      }
    } else {
      res.status(404).json("user not found");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

app.post("/logout", (_, res) => {
  try {
    res.clearCookie("token").json("logged out successfully");
  } catch (err) {
    res.status(422).json(err);
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, userData) => {
      if (err) throw err;
      User.findById(userData.id)
        .then((user) => {
          const { name, email, id } = user;
          res.json({ name, email, id });
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    });
  } else {
    res.status(401).json("not authorized");
  }
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photoMiddleware = multer({ dest: "uploads" });
app.post("/upload", photoMiddleware.array("photo", 100), (req, res) => {
  const UploadPhotos = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const newPath = path + "." + originalname.split(".").at(-1);
    fs.renameSync(path, newPath);
    UploadPhotos.push(newPath.replace("uploads\\", ""));
  }
  res.json(UploadPhotos);
});

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      ...req.body,
    });
    res.json(placeDoc);
  });
});

app.get("/user-places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });
});

app.get("/places/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put("/places", async (req, res) => {
  const { token } = req.cookies;
  const { id } = req.body;
  delete req.body.id;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (placeDoc.owner.toString() != userData.id) {
      res.status(401).json("not authorized");
      return;
    }
    placeDoc.set(req.body);
    await placeDoc.save();
    res.json(placeDoc);
  });
});

app.get("/places", async (req, res) => {
  res.json(await Place.find());
});

app.post("/booking", async (req, res) => {
  const { token } = req.cookies;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    try {
      // if (err) res.status(442).json("not authorized");
      if (err) throw err;
      const { id } = userData;
      console.log(req.body);

      const bookingDoc = await Booking.create({
        ...req.body,
        user: id,
      });
      res.json(bookingDoc);
    } catch (err) {
      // throw err;
      res.status(442).json("not authorized");
    }
  });
});

app.get("/bookings", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    res.json(await Booking.find({ user: id }).populate("place"));
  });
});

app.listen(3000, () => {
  console.log("server started");
});
