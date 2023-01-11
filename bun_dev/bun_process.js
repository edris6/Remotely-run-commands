import { spawnSync } from "bun";

function run_command_terminal(string){
    const myArray = string.split(" ");

    const { stdout } = spawnSync([myArray[0] , myArray[1]]);
    
    // When using spawnSync, stdout is a Buffer
    // this lets you read from it synchronously
    const text = stdout.toString();
    
    console.log(text); // "hi\n"
}
run_command_terminal("firefox https://www.youtube.com/")