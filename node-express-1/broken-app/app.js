/* const express = require('express');
let axios = require('axios');
var app = express();

app.post('/', function(req, res, next) {
  try {
    let results = req.body.developers.map(async d => {
      return await axios.get(`https://api.github.com/users/${d}`);
    });
    let out = results.map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.send(JSON.stringify(out));
  } catch {
    next(err);
  }
});

app.listen(3000);
*/

const express = require('express');
const app = express();
const axios = require('axios');

app.post('/', async (req, res) => {
  const devs = req.body.developers;

  try {
    const html = [];
    for (const dev of devs) {
      const url = `https://github.com/` + dev + '/';
      const bio = await axios.get(url, {
        params: {
          name: dev
        }
      }).then((res) => res.data.bio).catch((err) => {
        console.error(err);
      });
      const name = await axios.get(url, {
        params: {
          name: dev
        }
      }).then((res) => res.data.name).catch((err) => {
        console.error(err);
      });
      html.push({ name, bio });
    }
    res.json(html);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

app.listen(3000, () => console.log('App started on port 3000!'))

/* trying to use another try catch block to get this to work, node is still being buggy :( */