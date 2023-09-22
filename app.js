const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');

const port = 3000;

const app = express();
app.use('/', express.static(__dirname));
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(bodyParser.json()); // to parse application/json bodies

// send data via command line
// curl -X POST -H "Content-Type: application/json" -d '{"message":"genai is fun!"}' http://localhost:3000/receive-data

app.post('/receive-data', (req, res) => {
    const data = JSON.stringify(req.body); // Convert object to string if it's an object
    io.emit('data', data);
    res.sendStatus(200);
  });

server.listen(port, () => console.log(`Server started on port localhost:${port}`));
