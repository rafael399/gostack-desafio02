const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repo);

  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  const repoIndex = repositories.findIndex(r => r.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository with the given ID does not exist' });
  }

  const repo = repositories[repoIndex];

  repo.title = title;
  repo.url = url;
  repo.techs = techs;

  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repoIndex = repositories.findIndex(r => r.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository with the given ID does not exist' });
  }

  repositories.splice(repoIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  // A rota deve aumentar o número de likes do repositório específico escolhido através do id presente nos parâmetros da rota, a cada chamada dessa rota, o número de likes deve ser aumentado em 1;
  const { id } = request.params;

  const repoIndex = repositories.findIndex(r => r.id === id);
  
  if (repoIndex < 0) {
    return response.status(400).json({ error: 'Repository with the given ID does not exist' });
  }

  const repo = repositories[repoIndex];

  repo.likes++;

  return response.json(repo);
});

module.exports = app;
