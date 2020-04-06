const express = require('express');
require('custom-env').env('staging');
const app = express();
const cors = require('cors');
const port = 8000;
const axios = require('axios');


app.use(cors());

app.get('/repos/:userName/:repoName/:issueNumber/comments', async function (req, res) { 
  const response = await axios.get(`https://api.github.com/repos/${req.param('userName')}/${req.param('repoName')}/issues/${req.param('issueNumber')}/comments`, {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.get('/repos/:userName/:repoName/:issueNumber', async function (req, res) { 
  const response = await axios.get(`https://api.github.com/repos/${req.param('userName')}/${req.param('repoName')}/issues/${req.param('issueNumber')}`, {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.get('/repos/:userName/:repoName/', async function (req, res) { 
  const response = await axios.get(`https://api.github.com/search/issues?q=repo:${req.param('userName')}/${req.param('repoName')}/ is:issue is:open`, {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.listen(port, () => console.log("Running!"));
