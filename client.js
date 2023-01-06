const { WebSocket } = require(  'ws');

const ws = new WebSocket('ws://localhost:8080/');

ws.on('open', function open() {
  console.log('connected');
  ws.send("Client connected");
});

ws.on('close', function close() {
  console.log('disconnected');
});

ws.on('message', function message(data) {
  run_command_terminal(data.toString())

});

function run_command_terminal(command) {
  const { exec } = require("child_process");

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    return;
  });

}