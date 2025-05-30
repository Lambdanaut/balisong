if ("WebSocket" in window)
{
    console.log("WebSocket is supported by your Browser!");
    // Let us open a web socket
    var ws = new WebSocket("ws://localhost:8080");
    ws.onopen = function()
    {
        // Web Socket is connected, send data using send()
        ws.send("SEND THIS MESSAGE BACK PLEASE :)");
        console.log("Message is sent...");
    };
    ws.onmessage = function (evt) 
    { 
        var received_msg = evt.data;
        console.log("Message is received...");
        console.log(received_msg);
    };
    ws.onclose = function()
    { 
        // websocket is closed.
        console.log("Connection is closed..."); 
    };
}
else
{
    // The browser doesn't support WebSocket
    console.log("WebSocket NOT supported by your Browser!");
}
