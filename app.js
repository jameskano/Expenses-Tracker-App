// jshint esversion:9

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dayjs = require("dayjs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
dayjs().format();


// mongoose.connect('mongodb://localhost:27017/Expenses-Tracker-DB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connect('mongodb+srv://admin-jaime:pass-jaime@cluster0.uxyzu.mongodb.net/Expenses-Tracker-DB?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set('useCreateIndex', true);

const transactionSchema = new mongoose.Schema({
  concept: String,
  money: Number,
  date: String
});

const Transactions = mongoose.model("Transactions", transactionSchema);



let filter = "";

app.get("/", function(req, res) {
  Transactions.find({}, function(err, results) {
    res.render("index",
    {
      savedTrans: results
    });
  }).sort({_id: -1});
});

app.get("/history", function(req, res) {
  Transactions.find({date: filter}, function(err, results) {
    res.render("months-history",
    {
      monthTrans: results
    });
  }).sort({_id: -1});
});

app.post("/", function(req, res) {
  const newTransaction = new Transactions({
      concept: req.body.concept,
      money: req.body.amount,
      date: `${dayjs().format("MMMM/YYYY")}`
  });

  newTransaction.save(function() {
    res.redirect("/");
  });
});

app.post("/history", function(req, res) {
  filter = req.body.datepicker;
  res.redirect("/history");
});

app.post("/delete1", function(req, res) {
  let deleteEl = req.body.delete1;

  Transactions.findByIdAndRemove(deleteEl, function(err) {
    if(!err) {
      res.redirect("/");
    } else {
      console.log(err);
    }
  });
});

app.post("/delete2", function(req, res) {
  let deleteE2 = req.body.delete2;

  Transactions.findByIdAndRemove(deleteE2, function(err) {
    if(!err) {
      res.redirect("/history");
    } else {
      console.log(err);
    }
  });
});



app.listen(3000, function(req, res) {
  console.log("Server is running on port 3000");
});
