var ports = [];

this.addEventListener('message', function(e) {
  var message = e.data;

  if (message.port) {
    ports.push(message.port);
  } else if (message.text) {
    ports.forEach(function(port) {
      port.postMessage(message.text);
    });
  }
}.bind(this));
