const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const server = http.createServer((req, res) => {
  console.log("Server called");
  res.setHeader('Content-Type', 'text/html');
  console.log(req.url);
  const greet = _.once(() => {
    console.log("checking lodash once method");
  });
  greet();
  greet();
  let path = "./views";
  switch (req.url) {
    case '/':
      path += '/index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += '/about.html';
      res.statusCode = 200;
      break;
    case '/aboutus':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '/404.html';
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, file) => {
    if (err) {
      console.log(err);
    } else {
      res.write(file);
      res.end("Finished!!");
    }
  })
})
server.listen(3000, 'localhost', () => {
  console.log("Server listen start");
})