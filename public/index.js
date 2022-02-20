
    const ws = new Websocket('ws://albert.local')
    

    ws.onconnect = () => {
      console.log('Connected!')
      ws.send('SEND')
    }
 
     // Get a NodeList of elements with the class 'led-button'
     var buttons = document.querySelectorAll('.led-button');
 
     // Iterate through that Nodelist and add a 'click' EventListener
     Array.prototype.forEach.call(buttons, function (button) {
       button.addEventListener('click', toggleLed);
     });
 
     // Our event handler function for 'click' event on the LED buttons
     function toggleLed (event) {
       var button = event.target;
       var ledIndex = button.getAttribute('data-led'); // The index of the led in the Tessel.led array
       var statusNode = button.parentNode.querySelector('.led-status'); // The sibling status <span> to update
       
       fetch('/leds/' + ledIndex).then(res => res.json()).then(res => {
         console.log(res)
        statusNode.textContent = res.on ? 'ON' : 'OFF'; 
       })

     }