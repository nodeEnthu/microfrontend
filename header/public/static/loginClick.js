document.querySelector('a').addEventListener('click', function() {
  PubSubHeader.publish("header-login-click");
});