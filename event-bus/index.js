const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  await axios.post("http://localhost:4000/events", event); // Posts to posts service DUPLICATE
  await axios.post("http://localhost:4001/events", event); // Posts to comments service DUPLICATE
  await axios.post("http://localhost:4002/events", event); // Posts to query service DUPLICATE
  await axios.post("http://localhost:4003/events", event); // Posts to moderation service DUPLICATE
  return res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  return res.send(events);
});

app.listen(4005, () => {
  console.log("Event Bus listening on port 4005");
});
