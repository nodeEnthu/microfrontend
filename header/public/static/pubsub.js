function PubSub() {
  this.masterset = {};
}

PubSub.prototype.subscribe = function(context, eventName, callback) {
  if(!this.masterset[eventName]) {
    this.masterset[eventName] = [];
  }
  let boundedCallback = callback.bind(context);

  this.masterset[eventName].push({cb: boundedCallback, context: context});
}

PubSub.prototype.publish = function(eventName) {
  const listeners = this.masterset[eventName];
  if(listeners && Array.isArray(listeners)) {
    listeners.forEach((listener) => {
      listener.cb();
    })
  }
}

PubSub.prototype.unsubscribe = function(context, eventName) {
  const listeners = this.masterset[eventName];
  if(listeners && Array.isArray(listeners)) {
    listeners.forEach((listener, index) => {
      if(listener.context = context) {
        this.masterset.listeners.splice(index, 1);
      }
    })
  }
}

var PubSubHeader = new PubSub();