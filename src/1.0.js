(function(window, document, navigator){

  if (document.getElementById('sawpf')) return;

  // ---------------------------------------------------------------------------------------------------

  // based on jquery's browser detection
  var userAgent = navigator.userAgent.toLowerCase();
  var BrowserDetect = {
    version: parseFloat((userAgent.match(/.+(?:firefox|ie)[\/: ]([\d.]+)/) || [0, '0'])[1]),
    msie: (/msie/).test(userAgent) && !(/opera/).test(userAgent),
    firefox: (/mozilla/).test(userAgent) && !(/(compatible|webkit)/).test(userAgent)
  };
  var isFirefox = (BrowserDetect.firefox);
  var isIE = (BrowserDetect.msie);

  // http://blog.orite.com.au/web_development/2009-06-30/jquery-ie-detection-issue-workaround/
  if (isIE && BrowserDetect.version == 6 && (/msie 8/.test(userAgent))) BrowserDetect.version = 8;

  // http://stackoverflow.com/questions/1328963/detect-ie8-compatibility-mode
  if (isIE && BrowserDetect.version < 8 && document.documentMode) BrowserDetect.version = 8;

  // ---------------------------------------------------------------------------------------------------

  if (!(isFirefox || isIE)) return;
  if (isFirefox && BrowserDetect.version >= 3.6) return;
  if (isIE && BrowserDetect.version >= 8) return;

  // ---------------------------------------------------------------------------------------------------

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
  
  // ---------------------------------------------------------------------------------------------------
  
  // verifica se o usuário fechou a barrinha, dando-lhe 7 dias de folga da barrinha no site em que fechou
  if (Cookie.get('__sawpf_') == '1') return;

  // ---------------------------------------------------------------------------------------------------

  // emile.js (c) 2009 Thomas Fuchs
  // Licensed under the terms of the MIT license.
  (function(emile, container){
    var parseEl = document.createElement('div'),
        props = ['height']; // removidas as outras propriedades do script original

    function interpolate(source,target,pos){
      return (source+(target-source)*pos).toFixed(3);
    };

    function parse(prop){
      return { v: parseFloat(prop), f: interpolate, u: prop.replace(/^[\-\d\.]+/,'') };
    };

    function normalize(style){
      var css, rules = {}, i = props.length, v;
      parseEl.innerHTML = '<div style="'+style+'"></div>';
      css = parseEl.childNodes[0].style;
      while(i--) {
        v = css[props[i]];
        if(v) rules[props[i]] = parse(v);
      };
      return rules;
    };

    container[emile] = function(el, style, opts, after){
      el = typeof el == 'string' ? document.getElementById(el) : el;
      opts = opts || {};
      var target = normalize(style), comp = el.currentStyle ? el.currentStyle : getComputedStyle(el, null),
        prop, current = {}, start = +new Date, dur = opts.duration||200, finish = start+dur, interval,
        easing = opts.easing || function(pos){ return (-Math.cos(pos*Math.PI)/2) + 0.5; };
      for(prop in target) current[prop] = parse(comp[prop]);
      interval = setInterval(function(){
        var time = +new Date, pos = time>finish ? 1 : (time-start)/dur;
        for(prop in target)
          el.style[prop] = target[prop].f(current[prop].v,target[prop].v,easing(pos)) + target[prop].u;
        if(time>finish) { clearInterval(interval); opts.after && opts.after(); after && setTimeout(after,1); }
      },10);
    };
  })('emile', this);

  // ---------------------------------------------------------------------------------------------------

  var SPRITE_URL = (window['base_url'] || 'http://sawpf.com') + '/imgs/1.0.gif';

  var css = '#sawpf * {margin: 0; padding: 0}' +
    '#sawpf {text-align: center; height: 0; overflow: hidden; background: #ffffd6; border-width: 1px 0; border-color: #f0e4c3; border-style: solid; font-family: arial; position: relative; width: 100%}' +
    '#sawpf div {margin: 0 auto; width: 940px; padding: 9px 0}' +
    '#sawpf strong {color: #333; font-size: 14px}' +
    '#sawpf p {color: #666; float: left; font-size: 12px; line-height: 18px; margin: 2px 20px 0 0; text-align: left}' +
    '#sawpf ul {list-style: none}' +
    '#sawpf li {display: block; float: left; margin-right: 5px}' +
    '#sawpf a, #sawpf a span {background-image: url(' + SPRITE_URL + '); text-indent: -99em; display: block; cursor: pointer}' +
    '#sawpf a {outline: none; overflow: hidden}' +
    '#sawpf ul a, #sawpf ul a span {height: 40px; width: 150px}' +
    '#sawpf ul a:hover {background-position: 0 -40px}' +
    '#sawpf ul a:active {background-position:0 -80px}' +
    '#sawpf ul a:active span {margin-top: 1px}' +
    '#sawpf .sawpf-ie span {background-position: 0 -198px}' +
    '#sawpf .sawpf-ff span {background-position: 0 -120px}' +
    '#sawpf .sawpf-gc span {background-position: 0 -158px}' +
    '#sawpf #sawpf-close {background-position: 0 -240px; width: 15px; height: 15px; position: absolute; right:5px; top: 5px}' +
    '#sawpf #sawpf-close:hover {background-position: 0 -255px}' +
    '#sawpf #sawpf-close:active {background-position: 0 -270px}';

  var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  if(!window['ActiveXObject']) {
    styleTag.innerHTML = css;
  } else {
    styleTag.styleSheet.cssText = css;
  }
  document.getElementsByTagName('head')[0].appendChild(styleTag);

  var IE_BUTTON = '<a href="http://www.baixatudo.com.br/internet-explorer?utm_source=sawpf&utm_medium=banner&utm_campaign=Explorer" class="sawpf-ie" title="Internet Explorer"><span>Internet Explorer</span></a>';
  var FIREFOX_BUTTON = '<a href="http://www.baixatudo.com.br/mozilla-firefox?utm_source=sawpf&utm_medium=banner&utm_campaign=Firefox" class="sawpf-ff" title="Firefox"><span>Firefox</span></a>';
  var CHROME_BUTTON = '<a href="http://www.baixatudo.com.br/google-chrome?utm_source=sawpf&utm_medium=banner&utm_campaign=Chrome" class="sawpf-gc" title="Google Chrome"><span>Google Chrome</span></a>';

  var html = '<div><p><strong>Seu ' +
    ((isIE) ? "Internet Explorer" : "Firefox") +
    ' está desatualizado.</strong><br/>Para uma melhor visualização do site atualize-o ou escolha outro navegador.</p>' +
    '<ul><li>' +
    CHROME_BUTTON + '</li><li>' + FIREFOX_BUTTON + '</li><li>' + IE_BUTTON +
    '</li></ul>' +
    '<a href="#" id="sawpf-close" title="Fechar">fechar</a>' +
    '</div>';

  var container = document.createElement('div');
  container.id = 'sawpf';
  container.innerHTML = html;

  document.body.insertBefore(container, document.body.firstChild);

  document.getElementById('sawpf-close').onclick = function() {
    Cookie.set('__sawpf_', '1', 7 * 24 * 60 * 60 * 1000); // 7 dias em msecs
    emile(container, 'height: 0', {
      duration: 300,
      after: function(){container.style.display = 'none';}
    });
    return false;
  };
  emile(container, 'height: 58px', {duration: 500});
})(this, document, navigator);

