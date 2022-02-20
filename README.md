# tessel-neopixel
 Drive a Neopixel Strip with a Tessel 2 Microcontroller

## Description
Based on https://tessel.hackster.io/johnnyman727/websocket-neopixels-8508d0 and https://tessel.github.io/t2-start/webserver.html

## Getting Started
### Neopixels
Prepare your neopixels: https://learn.adafruit.com/assets/30892

### Tessel
Follow the directions below or reference this [Sparkfun tutorial](https://learn.sparkfun.com/tutorials/getting-started-with-the-tessel-2/all).
```bash
npm install johnny-five tessel-io;
npm install t2-cli -g
```

#### Connect to WiFi
```bash
t2 wifi -n [SSID] -p [password]
```

#### Provision your Tessel
```bash
t2 provision
```

#### Run Code
```bash 
t2 run server.js
```

```bash 
node client.js
```