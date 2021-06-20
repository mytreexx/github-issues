const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const axios = require('axios');
const path = require('path');
require('dotenv').config();


app.use(cors());

app.get('/repos/:userName/:repoName/labels', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}/labels`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});


app.get('/repos/:userName/:repoName/milestones', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}/milestones`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});

app.get('/repos/:userName/:repoName/:issueNumber/comments', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}/issues/${req.params.issueNumber}/comments`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});

app.get('/repos/:userName/:repoName/:issueNumber', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}/issues/${req.params.issueNumber}`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});

app.get('/repos/:userName/:repoName', async function (req, res) {
  try {
    const isQuery = req.query.is === 'closed' ? 'is:closed' : req.query.is === 'all' ? '' : 'is:open';
    const page = Number(req.query.page) || 1;
    console.log(req.query);
    const response = await axios.get(`https://api.github.com/search/issues?q=repo:${req.params.userName}/${req.params.repoName}/ is:issue ${isQuery} &per_page=25 &page=${page} `, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});

app.get('/:userName/:repoName/', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json({ error: true });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,"client", "build", "index.html"));
});

console.log(__dirname)


app.listen(port, () => console.log("Running!"));
