/*
  <=====  Initialisation for the node project ===========>
*/
const express = require('express');
const app = express();
const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`http server port: ${port}`);
});
/*
  <======  End initialisation ==========>
*/
const base = `${__dirname}/public`;
app.use('/public', express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(`${base}/test.html`);
});
