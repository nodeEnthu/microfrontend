function PubSub() {
  this.masterset = {};
}

PubSub.prototype.subscribe = function(context, eventName, callback) {
  if(!this.masterset[eventName]) {
    this.masterset[eventName] = [];
  }
  const args = Array.prototype.slice(0).call(callback.arguments);
  let boundedCallback = callback.bind(context, args);

  this.masterset[eventName].push(boundedCallback);
}

PubSub.prototype.publish = function(eventName) {
  const listeners = this.masterset[eventName];
  if(listeners && Array.isArray(listeners)) {
    listeners.forEach((listener) => {
      listener();
    })
  }
}

const PubSubHeader = new PubSub();