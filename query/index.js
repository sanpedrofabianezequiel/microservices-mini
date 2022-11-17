const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.get("/posts", async (req, res) => {
  return res.send(posts);
});

app.post("/events", async (req, res) => {
  //SAVE DATA
  const { type, data } = req.body;
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  console.log(posts);
  return res.send({});
});

app.listen(4002, () => {
  console.log("Listening on port 4002");
});
