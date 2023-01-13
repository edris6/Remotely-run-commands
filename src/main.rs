use tungstenite::{connect};
use url::Url;
use std::process::Command;

fn main() {
    env_logger::init();

    let (mut socket, response) =
        connect(Url::parse("ws://localhost:8080/").unwrap()).expect("Can't connect");

    println!("Connected to the server");
    println!("Response HTTP code: {}", response.status());
    println!("Response contains the following headers:");
    for (ref header, _value) in response.headers() {
        println!("* {}", header);
    }

    //socket.write_message(Message::Text("Hello WebSocket".into())).unwrap();
    loop {
        let msg = socket.read_message().expect("Error reading message");
        println!("Received: {}", msg.to_string());
        let msg_stringed = msg.to_string();
        let msg_split = msg_stringed.split(' ').collect::<Vec<_>>();
        let mut list_dir = Command::new(format!("{}", msg_split[0]));
        if msg_split.len() - 1 != 0{
            let mut i = 0;
            while i < msg_split.len() - 1{
                list_dir.arg(msg_split[i + 1]);
                println!("{}", msg_split[i + 1]);
                i = i + 1;
            }
            
        } 
        list_dir.status().expect("process failed to execute");
        
    }
    // socket.close(None);
}


//my first actual rust program LOL