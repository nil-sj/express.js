const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Use body-parser for POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serves static files from /public
app.use(express.static('public')); 

// Set EJS as the view engine
app.set("view engine", "ejs");

// Sample data
const items = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// Root route handler
app.get("/", (req, res) => {
  const today = new Date();
  const optionsToday = { weekday: "long", day: "numeric", month: "long" };
  const dayToday = today.toLocaleDateString("en-US", optionsToday);
  const optionsKindOfDay = { weekday: "long" };
  const kindOfDay = today.toLocaleDateString("en-US", optionsKindOfDay);
  const optionsYear = { year: "numeric" };
  const year = today.toLocaleDateString("en-US", optionsYear);
  const typeOfList = "Home List";
  res.render("list", { typeOfList: typeOfList, kindOfDay: kindOfDay, dayToday: dayToday, myItems: items, year: year });
});

// Handle form submission
app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    if (req.body.list === "Work List") {
      workItems.push(newItem);
      res.redirect("/work");
    } else {
      items.push(newItem);
      res.redirect("/");
    }
});
  
app.get("/work", (req, res) => {
  const today = new Date();
  const optionsToday = { weekday: "long", day: "numeric", month: "long" };
  const dayToday = today.toLocaleDateString("en-US", optionsToday);
  const optionsKindOfDay = { weekday: "long" };
  const kindOfDay = today.toLocaleDateString("en-US", optionsKindOfDay);
  const optionsYear = { year: "numeric" };
  const year = today.toLocaleDateString("en-US", optionsYear);  
  const typeOfList = "Work List";
  res.render("list", { typeOfList: typeOfList, kindOfDay: kindOfDay, dayToday: dayToday, myItems: workItems, year: year });
});

// app.post("/work", (req, res) => {
//   const newItem = req.body.newItem;
//   workItems.push(newItem);
//   res.redirect("/work");
// });

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
