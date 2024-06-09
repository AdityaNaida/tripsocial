const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

let posts = [
  {
    id: uuidv4(),
    username: "Aditya",
    caption:
      "Feeling energized, inspired, and maybe a little bit in love with those giant slices of pizza. ",
    img: "https://images.pexels.com/photos/472037/pexels-photo-472037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: uuidv4(),
    username: "Mahi",
    caption:
      "Where history whispers on the wind.   Exploring ancient castles, strolling through charming gardens. ",
    img: "https://images.pexels.com/photos/2682676/pexels-photo-2682676.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: uuidv4(),
    username: "Karan",
    caption:
      "Soaked up the sunshine, swam in crystal-clear coves, and sailed under the Sydney Harbour Bridge.",
    img: "https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

app.get("/posts", (req, res) => {
  res.render("index", { posts });
});

app.post("/posts", (req, res) => {
  const { username, caption, img } = req.body;
  const id = uuidv4();
  posts.push({ id, username, caption, img });
  res.redirect("/posts");
});

app.get("/posts/create", (req, res) => {
  res.render("create");
});

app.get("/posts/:id", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("show", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  const { id } = req.params;
  const post = posts.find((p) => p.id === id);
  res.render("edit", { post });
});

app.patch("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { img, caption } = req.body;
  const post = posts.find((p) => p.id === id);
  post.img = img;
  post.caption = caption;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  posts = posts.filter((p) => p.id !== id);
  res.redirect("/posts");
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening at port: ${port}`);
});
