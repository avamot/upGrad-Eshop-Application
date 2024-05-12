const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const port = 5002; // You can choose any port

app.get('http://localhost:3005/signup', (req, res) => {
  res.send('Hello from the Node.js backend!');
});
app.post('http://localhost:8081/api/auth/signup', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});