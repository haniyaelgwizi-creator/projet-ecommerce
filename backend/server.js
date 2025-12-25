const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.join(__dirname, 'db.json');

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

// ================= USERS =================

// LOGIN
app.get('/users', (req, res) => {
  const { email, password } = req.query;
  const db = readDB();

  const users = db.users.filter(
    u => u.email === email && u.password === password
  );

  res.json(users);
});

// REGISTER
app.post('/users', (req, res) => {
  const db = readDB();
  const { email, name, password } = req.body;

  const exists = db.users.some(u => u.email === email);
  if (exists) {
    return res.json({ success: false, message: 'EMAIL_EXISTS' });
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password
  };

  db.users.push(newUser);
  writeDB(db);

  res.json({ success: true, user: newUser });
});

// ================= PRODUCTS =================
app.get('/products', (req, res) => {
  const db = readDB();
  res.json(db.products);
});

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
