const express = require('express');
require('custom-env').env('staging');
const app = express();
const cors = require('cors');
const port = 8000;
const axios = require('axios');


app.use(cors());

app.get('/repos/bluzi/name-db/:issueNumber/comments', async function (req, res) { 
  const response = await axios.get(`https://api.github.com/repos/bluzi/name-db/issues/${req.param('issueNumber')}/comments`, {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.get('/repos/bluzi/name-db/:issueNumber', async function (req, res) { 
  const response = await axios.get(`https://api.github.com/repos/bluzi/name-db/issues/${req.param('issueNumber')}`, {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.get('/repos/bluzi/name-db/', async function (req, res) { 
  const response = await axios.get('https://api.github.com/search/issues?q=repo:bluzi/name-db/ is:issue is:open', {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});

app.listen(port, () => console.log("Running!"));
