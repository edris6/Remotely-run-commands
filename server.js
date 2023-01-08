const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();
const wss = new WebSocketServer({ port: 8080 });
let prev_command = null
let command = null
let again = false;


const interval = setInterval(function() {
  console.log(command)
  console.log(prev_command)
  if (command == null )return;
    
  if( command != prev_command || again == true) {
    console.log("ran")
    again = false
    prev_command = command
    wss.clients.forEach(function (client) {
      client.send(command.toString());
    });

  }
}, 500);

wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
  
});

app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
})
app.post('/upload', function (req, res) {
    console.log("sucess")
    console.log(req.body.message)
    command = req.body.message
    again = true
});

app.listen(3000)