const express = require('express');
require('custom-env').env('staging');
const app = express();
const port = 3000;
const axios = require('axios');


app.get('/repos/bluzi/name-db/issues', async function (req, res) { 
  const response = await axios.get('https://api.github.com/search/issues?q=repo:bluzi/name-db is:issue', {
    headers: {
      'Authorization': `token ${process.env.ACCESS_TOKEN}`
    }
  });
  res.json(response.data);
});


app.listen(port, () => console.log("Running!"));
