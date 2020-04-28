const express = require('express');
require('custom-env').env('staging');
const app = express();
const cors = require('cors');
const port = 8000;
const axios = require('axios');


app.use(cors());

app.get('/repos/:userName/:repoName/:issueNumber/comments', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/repos/${req.params.userName}/${req.params.repoName}/issues/${req.params.issueNumber}/comments`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json(error);
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
    res.json(error);
  }
});

app.get('/repos/:userName/:repoName/', async function (req, res) {
  try {
    const response = await axios.get(`https://api.github.com/search/issues?q=repo:${req.params.userName}/${req.params.repoName}/ is:issue is:open`, {
      headers: {
        'Authorization': `token ${process.env.ACCESS_TOKEN}`
      }
    });
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

app.listen(port, () => console.log("Running!"));
