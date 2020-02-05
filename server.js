const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

//it's native module
const path = require("path");

//compression library for gzipping
const compression = require("compression");

//if development or testing, we additionally load "dotenv" library, which allows us to access ".env"
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//instatciate new express application- it helps us easily start server
const app = express();
const port = process.env.PORT || 5000; // 5000 is a fallback port

app.use(compression);
//any requests will be processed via this middleware 'bodyParser' and converted to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//use CORS(Cross Origin Request): we are able to properly make requests  to our backend server
app.use(cors());

//PRODUCTION specific configuration
if (process.env.NODE_ENV === "production") {
  // it doesn't require us to use https in development
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  //we serve all our static files by pointing  to 'build' directory
  app.use(express.static(path.join(__dirname, "client/build")));

  //any GET request which is not handled later , redirect to "index.html"
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

//after running the server we start listening
app.listen(port, error => {
  if (error) {
    //if any error happens
    throw error;
  }
  //if nothing is wrong
  console.log("Server running on port " + port);
});

app.post("/payment", (req, res) => {
  //extract necessary data from request
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: "usd"
  };
  //use stripe API by passing prepared body
  stripe.charges.create(body, (stripeErr, stripeRes) => {
    if (stripeErr) {
      //status: server error
      res.status(500).send({ error: stripeErr });
    } else {
      //status: OK
      res.status(200).send({ success: stripeRes });
    }
  });
});
