const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hello World 123')
})

app.get('/about', function (req, res) {
  res.sendFile('./views/about.html', { root: __dirname });
  console.log(__dirname);
})

//redirect
app.get('/aboutus', (req, res) => {
  res.redirect('/about');
})

//middleware
app.use((req, res) => {
  // let ans = res.status(404); as res ,status return res only so we can chanin ahead
  res.status(404).sendFile("./views/404.html", { root: __dirname }) //middleware
})

app.listen(3000, () => {
  console.log("server started");
})