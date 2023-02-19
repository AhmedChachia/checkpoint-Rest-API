require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const port = process.env.PORT || 5000; 


mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Database connection error', err));




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.get('/users', (req, res) => {

    User.find({}, (err, users) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(users);
    });
  });


  app.post('/users', (req, res) => {
    
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(user);
    });
  });


  app.post('/users', (req, res) => {
    
    const newUser = new User(req.body);
    newUser.save((err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(user);
    });
  });


  app.delete('/users/:id', (req, res) => {
    
    User.findByIdAndRemove(req.params.id, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.send(`User ${user.name} has been removed`);
    });
  });
  


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
