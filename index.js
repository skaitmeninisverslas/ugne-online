const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const connectFlash = require("connect-flash");
require("dotenv").config();

const app = new express();
const uri = process.env.LOCALHOST;
const demo = process.env.DEMO;
const demo_external = process.env.DEMO_EXTERNAL;

mongoose
  .connect(demo_external, { useNewUrlParser: true })
  .then(() => console.log("You are now connected to Mongo"))
  .catch((err) => console.error("Something went wrong", err));

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(connectFlash());
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
