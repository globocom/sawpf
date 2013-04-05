require('/spec/support/jasmine-dom-matchers.js');

function fakeUserAgent(value) {
  navigator.__defineGetter__('userAgent', function() {
    return value;
  });
}

window.sawpfLoaded = false

function loadSawpf() {
  window.sawpfLoaded = false
  var el = document.getElementById('sawpf');
  if (el) {
      el.parentNode.removeChild(el);
  }
  var g=document.createElement('script');
  var s=document.getElementsByTagName('script')[0];
  g.onload = function(){
      window.sawpfLoaded = true;
  };
  g.src='/src/1.0.js';
  s.parentNode.insertBefore(g,s);
}

function afterSawpfLoaded(callback) {
  loadSawpf();
  waitsFor(function(){ return window.sawpfLoaded });
  runs(function() {
    callback()
  });
}

// Cookie control
var Cookie = {
  set: function(name, value, msecs){
    var cookie = [];
    cookie.push(name + "=" + value);
    cookie.push('path=/');
    // TODO: cookie.push('domain=.' + this._getDomain());
    if (msecs) cookie.push('expires=' + this._getExpire(msecs));
    document.cookie = cookie.join("; ");
  },

  // TODO: refactore to not loop through values
  get: function(name){
    var kvPairs = document.cookie.split(';');
    var nameEQ  = name + "=";

    for(var i = 0; i < kvPairs.length; i++) {
      var kvPair = kvPairs[i]; // key=value pair        
      while (kvPair.charAt(0) == ' ') kvPair = kvPair.substring(1, kvPair.length);
      if (kvPair.indexOf(nameEQ) == 0) return kvPair.substring(nameEQ.length, kvPair.length);
    }
    return null;
  },

  unset: function(name) {
    Cookie.set(name, '', -1000);
  },

  _getExpire: function(msecs){
    var d = new Date();
    d.setTime(d.getTime() + msecs);
    return d.toGMTString();
  }
};
