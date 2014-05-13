var list = document.getElementById('list');
var input = document.getElementById('strawberry__input');

function log(text, special) {
  var el = document.createElement('div');
  el.className = 'list-item';
  if (special) el.style.fontWeight = 'bold';
  el.innerText = text;
  list.appendChild(el);
}

var messageChannel = new MessageChannel();

messageChannel.port1.onmessage = function(e) {
  log(e.data);
};

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./worker.js')
    .then(function(serviceWorker) {
      log("# ServiceWorker connected.", true);
      serviceWorker.postMessage({
        port: messageChannel.port2,
      }, [messageChannel.port2]);
      document.addEventListener('submit', function(e) {
        e.preventDefault();
        serviceWorker.postMessage({
          text: input.value
        });
        input.value = '';
      });
    });
} else {
  log("# Your browser does not support ServiceWorker - are you using Canary?", true);
  log("# Have you switched it on at `chrome://flags/#enable-service-worker`", true);
}
