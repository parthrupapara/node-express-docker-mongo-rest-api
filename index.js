const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    password: String,
  })
);

app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(409).send('Username is already taken');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  res.send('User created successfully');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).send('Invalid username or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.send({ token });
});

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Authorization header is missing');
  }

  const token = authHeader;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send('Invalid token');
    }

    req.userId = decoded.id;
    next();
  });
}

app.get('/protected', authenticate, (req, res) => {
  res.send(`Protected data for user ${req.userId}`);
});


// Create connection to MongoDB async function
async function connectToMongo() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB', error);
    }
}

connectToMongo();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
