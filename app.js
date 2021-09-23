const express = require("express");
const Joi = require("joi");

const genres = require("./genres");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g._id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre with the given ID was not found");
    return;
  }
  res.send(genre);
});

app.post("/api/genres", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  const newGenre = {
    _id: genres.length + 1,
    name: req.body.name,
  };
  genres.push(newGenre);
  res.send(newGenre);
});

app.put("/api/genres/:id", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    res.status(400).send(validation.error.details[0].message);
    return;
  }

  let genre = genres.find((g) => g._id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre with the given ID was not found");
    return;
  }

  genre.name = req.body.name;
  res.send(genre);
});

app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g._id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre with the given ID was not found");
    return;
  }
  const index = genres.indexOf(genre);
  const deletedGenre = genres.splice(index, 1);
  res.send(deletedGenre);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
