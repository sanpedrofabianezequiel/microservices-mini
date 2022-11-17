const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/*const posts = {
  randomId: {
    id: "randomId",
    title: "My first post",
    comments: [{ id: "randomId", text: "Hello World" }],
  },
};*/ // MOCK
const posts = {};
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", async (req, res) => {
  return res.send(posts);
});

app.post("/events", async (req, res) => {
  //SAVE DATA
  const { type, data } = req.body;
  handleEvent(type, data);
  console.log(posts);
  return res.send({});
});

app.listen(4002, async () => {
  console.log("Listening on port 4002");
  const result = await axios.get("http://localhost:4005/events"); // Get all events from event bus
  for (let event of result.data) {
    console.log("Processing event", event.type);
    handleEvent(event.type, event.data);
  }
});
