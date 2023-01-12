let ws_ = null;
import { file } from "bun";
Bun.serve({
  websocket: {
    open(ws) {
      console.log("Client Connected")
      ws.subscribe("the testing");
      if (!ws_) {
        ws_ = ws
      }
    },
    message(ws, msg) {
      console.log("message: %s", msg);
      const result = JSON.parse(msg)
      console.log(JSON.parse(msg).message)
      if (result.type == "command") {
        if (ws_ != null) ws_.publish("the testing", String(result.message));
      }
    }, close(ws) {
      console.log("Client has disconnected");
    }, 
  }, fetch(req, server) {
    if (!server.upgrade(req)) {
      console.log(req)
      const url_div = req.url.split('/');

      if (url_div[req.url.split('/').length - 1] == "html") {
        return new Response(file("./public/index.html"));
      }
      return new Response(null, { status: 404 });
    }
  },
  port: 8080,
});