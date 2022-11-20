const express = require('express');
const app = express();
app.use(express.json());

let user = [
  {
    id: 1,
    name: 'abhishek',
    age: 40
  },
  {
    id: 2,
    name: 'shyam',
    age: 30
  },
  {
    id: 3,
    name: 'nikhil',
    age: 20
  }
];


//query
app.get("/user", (req, res) => {
  console.log(req.query);
  let { name, age } = req.query;
  let isDataSend = false;
  let filteredUsers = [];
  if (typeof name == 'string' && name.length > 0) {
    filteredUsers = user.filter((user) => user.name.toLocaleLowerCase() == name.toLocaleLowerCase());
    isDataSend = true;
  }
  if (!!age && !isNaN(age) && Number(age) >= 0) {
    filteredUsers = filteredUsers.filter((user) => user.age >= age); // use single & operater 
    isDataSend = true;
  }
  res.send(isDataSend ? filteredUsers : user);
})

// app.get('/user', (req, res) => {
//   res.send(user);
// })

app.post('/user', (req, res) => {
  console.log(req.body);
  //then i can put this in db 
  let userObj = req.body;
  user = [userObj];
  res.json({
    message: "Data received successfully",
    user: req.body
  });
});

app.patch("/user", (req, res) => {
  let dataToBeStored = req.body;
  const userObj = {};
  for (const key in dataToBeStored) {
    userObj[key] = dataToBeStored[key];
  }
  user.push(userObj);
  res.json({
    message: "Data updated"
  })
})

app.delete("/user", (req, res) => {
  user = {},
    res.json({
      message: "user deleted"
    });
})

//params
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  let userData = user.find((data) => data.id == req.params.id);
  res.json({ message: "user id called", id: req.params, userData });
  // res.send("Id user called");
})

app.listen(5000);