const ws = require('ws');

module.exports = class wsServer {
    constructor(server) {

        // Start Websocket Server
        const wss = new ws.WebSocketServer({ server });
        // Create the websocket server, provide connection callback
        wss.on('connection', (ws) => {
            console.log("Accepted new connection!");

            // When we get data
            ws.on('message', (data) => {
                console.log("message", data);

                // // Extract the number of LEDs to animate
                // var numLEDs = data.readInt32BE(0);
                // // Slice off that number
                // var animation = data.slice(4);
                // // Start the animation
                // // neopixels.animate(numLEDs, animation);
            });

            ws.on("close", (code, reason) => {
                console.log("Connection closed")
            });

        })

    }
}