const express = require('express');
const app = express();
app.use(express.json());
let user = {};
app.get('/user', (req, res) => {
  res.send(user);
})

app.post('/user', (req, res) => {
  console.log(req.body);
  //then i can put this in db 
  user = req.body;
  res.json({
    message: "Data received successfully",
    user: req.body
  });
});

app.patch("/user", (req, res) => {
  let dataToBeStored = req.body;
  for (const key in dataToBeStored) {
    user[key] = dataToBeStored[key];
  }
  res.json({
    message: "Data updated"
  })
})

app.delete("/user", (req, res) => {
  users = {},
    res.json({
      message: "user deleted"
    });
})


app.listen(5000);