const ws = new WebSocket("ws://localhost:3000/");

ws.onmessage = (e) => {
  console.log(e.data)
};
setInterval(() => {
  ws.send("ping ");
}, 800);