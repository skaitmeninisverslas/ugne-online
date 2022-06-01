const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const flash = require("express-flash");
const passport = require("./passport/setup");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const app = new express();
const demo_external = process.env.DEMO_EXTERNAL;

mongoose
  .connect(demo_external, { useNewUrlParser: true })
  .then(() => console.log("You are now connected to Mongo"))
  .catch((err) => console.error("Something went wrong", err));

const mongoStore = connectMongo(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      // Session expires after 1 hour of inactivity.
      expires: 60 * 1000 * 36,
    },
  })
);

app.use(flash());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "*",
  })
);

require("./routes/routes")(app);

process.env.NODE_ENV = "production";

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get(["/", "/*"], (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 4000, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
