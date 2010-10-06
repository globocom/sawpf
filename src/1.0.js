(function(window, document, navigator){

  // emile.js (c) 2009 Thomas Fuchs
  // Licensed under the terms of the MIT license.
  (function(emile, container){
    var parseEl = document.createElement('div'),
        props = ['marginTop']; // removidas as outras propriedades do script original

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
  

  var userAgent = navigator.userAgent;
  var vendor = navigator.vendor;
  var platform = navigator.platform;
  
  var BrowserDetect = { // BrowserDetect adapted from http://www.quirksmode.org/js/detect.html
    /** @constructor */ init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(userAgent) || this.searchVersion(navigator.appVersion) || -1;
    },
    /** @constructor */ searchString: function (data) {
      for (var i=0; i<data.length; i++)  {
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (userAgent.indexOf(data[i].subString) != -1) return data[i].identity;
      }
      return false;
    },
    /** @constructor */ searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return false;
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
      {subString: "Firefox", identity: "Firefox"},
      {subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"}
    ]
  };
  BrowserDetect.init();
  
  // ---------------------------------------------------------------------------------------------------
  
  var isFirefox = (BrowserDetect.browser == 'Firefox');
  var isIE = (BrowserDetect.browser == 'Explorer');
  
  if (!(isFirefox || isIE)) return;
  if (isFirefox && BrowserDetect.version >= 3.5) return;
  if (isIE && BrowserDetect.version >= 7) return;

  var SPRITE_URL = (window['base_url'] || 'http://sawpf.com') + '/sprite.gif';

  var css = '#sawpf * {margin: 0; padding: 0}' +
    '#sawpf {text-align: center; margin-top: -60px; height: 58px; overflow: hidden; background: #ffffd6; border-width: 1px 0; border-color: #f0e4c3; border-style: solid; font-family: arial; position: relative; width: 100%}' +
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

  var html = '<div id="sawpf"><div><p><strong>Seu ' +
    ((isIE) ? "Internet Explorer" : BrowserDetect.browser) +
    ' está desatualizado.</strong><br/>Para uma melhor visualização do site atualize-o ou escolha outro navegador.</p>' +
    '<ul><li>' +
    FIREFOX_BUTTON + '</li><li>' + IE_BUTTON + '</li><li>' + CHROME_BUTTON +
    '</li></ul>' +
    '<a href="#" id="sawpf-close" title="Fechar">fechar</a>' +
    '</div></div>';

  var container = document.createElement('div');
  container.innerHTML = html;

  var barra_gcom = document.getElementById('glb-barra-widget');
  if(barra_gcom) {
    barra_gcom.parentNode.insertBefore(container, barra_gcom.nextSibling);
  } else {
    document.body.insertBefore(container, document.body['children'][0]);
  }

  document.getElementById('sawpf-close').onclick = function() {
    emile('sawpf', 'margin-top: -60px', {
      duration: 300,
      after: function(){document.getElementById('sawpf').style.display = "none";}
    });
    return false;
  };
  emile('sawpf', 'margin-top: 0', {duration: 500});
})(this, document, navigator);

