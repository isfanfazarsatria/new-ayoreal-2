//Require dotenv
require("dotenv").config();

const express = require("express");
// const exphbs = require("express-handlebars");
const path = require("path");
const fileUpload = require("express-fileupload");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

//Import Router
const mongoose = require("mongoose");
const authRoute = require("./src/routes/authRoute");
const categoryRoute = require("./src/routes/categoryRoute");
const productRoute = require("./src/routes/productRoute");
// const managementRoute = require("./src/routes/management");
// const subjectRoute = require("./src/routes/subjectRoute");
// const tutorRoute = require("./src/routes/tutorRoute");
// const studentRoute = require("./src/routes/studentRoute");
// const reviewRoute = require("./src/routes/reviewRoute");
// const skillRoute = require("./src/routes/skillRoute");
// const levelRoute = require("./src/routes/levelRoute");
// const homepageRoute = require("./src/routes/homepageRoute");
// const searchFilterRoute = require("./src/routes/searchFilterRoute");
// const isFavoriteRoute = require("./src/routes/isFavoriteRoute");
// const bookingRoute = require("./src/routes/bookingRoute");
// const paymentRoute = require("./src/routes/paymentRoute");
// const authRoute = require("./src/routes/authGoogle");
// const passport = require("passport");

const PORT = process.env.PORT;
const app = express();

//passport config
// require("./database/config/passport")(passport);

//To read req.body
app.use(express.json()); //Enable req.body JSON type
app.use(express.urlencoded({ extended: false })); //Support urlencode body
app.use(cors());

// Config Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_URL,
    }),
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

//Routing API
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
// app.use("/api/v1/management", managementRoute);
// app.use("/api/v1/subject", subjectRoute);
// app.use("/api/v1/student", studentRoute);
// app.use("/api/v1/tutor", tutorRoute);
// app.use("/api/v1", reviewRoute);
// app.use("/api/v1", skillRoute);
// app.use("/api/v1", levelRoute);
// app.use("/api/v1", homepageRoute);
// app.use("/api/v1", searchFilterRoute);
// app.use("/api/v1/favorite", isFavoriteRoute);
// app.use("/api/v1/booking", bookingRoute);
// app.use("/api/v1/payment", paymentRoute);

//Routing for Google auth
// app.use("/api/v1/auth", authRoute);

//set view
// app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
// app.set("view engine", ".hbs");

// for css
// app.use(express.static(path.join(__dirname, "public")));

//Routing Homepage
app.get("/", (req, res) => res.send("Welcome to Ayoreal API"));

//404 Not found
app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

//Require DB Connection
const dbConnection = require("./database/config/index")();

//Run Server
app.listen(PORT, () => {
  console.log(`Server Running, mode on port ${PORT}`);
});

module.exports = { app, dbConnection }; // for unit test
