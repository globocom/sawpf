(function(window, document, undefined){

  // emile.js (c) 2009 Thomas Fuchs
  // Licensed under the terms of the MIT license.
  (function(emile, container){
    var parseEl = document.createElement('div'),
        props = ['height']; // removidas as outras propriedades do script original

    function interpolate(source,target,pos){ return (source+(target-source)*pos).toFixed(3); }
    function s(str, p, c){ return str.substr(p,c||1); }
    function color(source,target,pos){
      var i = 2, j, c, tmp, v = [], r = [];
      while(j=3,c=arguments[i-1],i--)
        if(s(c,0)=='r') { c = c.match(/\d+/g); while(j--) v.push(~~c[j]); } else {
          if(c.length==4) c='#'+s(c,1)+s(c,1)+s(c,2)+s(c,2)+s(c,3)+s(c,3);
          while(j--) v.push(parseInt(s(c,1+j*2,2), 16)); }
      while(j--) { tmp = ~~(v[j+3]+(v[j]-v[j+3])*pos); r.push(tmp<0?0:tmp>255?255:tmp); }
      return 'rgb('+r.join(',')+')';
    };

    function parse(prop){
      var p = parseFloat(prop), q = prop.replace(/^[\-\d\.]+/,'');
      return isNaN(p) ? { v: q, f: color, u: ''} : { v: p, f: interpolate, u: q };
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

  var BrowserDetect = { // BrowserDetect adapted from http://www.quirksmode.org/js/detect.html
    /** @constructor */ init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || -1;
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    /** @constructor */ searchString: function (data) {
      for (var i=0; i<data.length; i++)  {
        var dataString = data[i].string;
        var dataProp = data[i].prop;
        this.versionSearchString = data[i].versionSearch || data[i].identity;
        if (dataString) {
          if (dataString.indexOf(data[i].subString) != -1) return data[i].identity;
        } else if (dataProp) return data[i].identity;
      }
      return false;
    },
    /** @constructor */ searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index == -1) return false;
      return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },
    dataBrowser: [
      {string: navigator.userAgent, subString: 'Chrome', identity: 'Chrome'},
      {string: navigator.userAgent, subString: 'OmniWeb', versionSearch: 'OmniWeb/', identity: 'OmniWeb'},
      {string: navigator.vendor, subString: 'Apple', identity: 'Safari', versionSearch: 'Version'},
      {prop: window.opera, identity: 'Opera'},
      {string: navigator.vendor, subString: 'iCab', identity: 'iCab'},
      {string: navigator.vendor, subString: "KDE", identity: "Konqueror"},
      {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
      {string: navigator.vendor, subString: "Camino", identity: "Camino"},
      {string: navigator.userAgent, subString: "Netscape", identity: "Netscape"}, // for newer Netscapes (6+)
      {string: navigator.userAgent, subString: "MSIE", identity: "Explorer", versionSearch: "MSIE"},
      {string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"},
      {string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"}// for older Netscapes (4-)
    ],
    dataOS : [
      {string: navigator.platform, subString: "Win", identity: "Windows"},
      {string: navigator.platform, subString: "Mac", identity: "Mac"},
      {string: navigator.userAgent, subString: "iPhone", identity: "iPhone/iPod"},
      {string: navigator.platform, subString: "Linux", identity: "Linux"}
    ]
  };
  BrowserDetect.init();

  // ---------------------------------------------------------------------------------------------------

  if (!(BrowserDetect.browser == 'Firefox' || BrowserDetect.browser == 'Explorer')) return;
  if (BrowserDetect.browser == 'Firefox' && BrowserDetect.version >= 3.5) return;
  if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version >= 7) return;

  var BASE_URL = window['base_url'] || 'http://sawpf.com';
  var IE_BUTTON = '<a href="http://www.baixatudo.com.br/internet-explorer-8?utm_source=sawpf&utm_medium=banner&utm_campaign=Explorer" class="sawpf-ie" title="Internet Explorer 8"><img src="' + BASE_URL + '/ie.gif" alt="Internet Explorer"/></a></li>';
  var FIREFOX_BUTTON = '<a href="http://www.baixatudo.com.br/mozilla-firefox-3-6?utm_source=sawpf&utm_medium=banner&utm_campaign=Firefox" class="sawpf-ff" title="Firefox 3.6"><img src="' + BASE_URL + '/ff.gif" alt="Firefox"/></a></li>';
  var CHROME_BUTTON = '<a href="http://www.baixatudo.com.br/google-chrome-4?utm_source=sawpf&utm_medium=banner&utm_campaign=Chrome" class="sawpf-gc" title="Google Chrome 4"><img src="' + BASE_URL + '/gc.gif" alt="Google Chrome"/></a></li>';

  var css = '#sawpf * {margin: 0; padding: 0; top: 0; line-height: 1em;}\n';
  css += '#sawpf {text-align: center; height: 0; overflow: hidden; background: #ffffd6; border-bottom: 1px solid #f0e4c3; border-top: 1px solid #f0e4c3; font-family: arial; margin: 0; position: relative; width: 100%;}\n';
  css += '#sawpf div {text-align: left; margin: 0 auto; width: 940px; padding: 9px 0;}\n';
  css += '#sawpf strong {color: #333; font-size: 14px;}\n';
  css += '#sawpf p {color: #666; float: left; font-size: 12px; line-height: 18px; margin: 2px 20px 0 0; text-align: left;}\n';
  css += '#sawpf ul {list-style: none}\n';
  css += '#sawpf li {display: block; float: left; list-style: none; margin: 0 5px 0 0;}\n';
  css += '#sawpf img {border: none;}\n';
  css += '#sawpf a {border: none; background: #fff url(' + BASE_URL + '/sprite-bt.gif) no-repeat 0 0; display: block; height: 40px; outline: none; overflow: hidden; width: 150px;}\n';
  css += '#sawpf a:hover {background-position: 0 -40px;}\n';
  css += '#sawpf a:active {background-position: 0 -80px;}\n';
  css += '#sawpf a:active img {margin-top: 1px;}\n';
  css += '#sawpf #sawpf-close {background: url(' + BASE_URL + '/bt-close.gif) no-repeat 0 0; height: 15px; position: absolute; right: 5px; text-indent: -99999px; top: 5px; width: 15px;}\n';
  css += '#sawpf #sawpf-close:hover {background-position: 0 -15px;}\n';
  css += '#sawpf #sawpf-close:active {background-position: 0 -30px;}\n';

  var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  if(!window['ActiveXObject']) {
    styleTag.innerHTML = css;
  } else {
    styleTag.styleSheet.cssText = css;
  };
  document.getElementsByTagName('head')[0].appendChild(styleTag);

  var html = '<div id="sawpf"><div><p><strong>Seu ';
  html += (BrowserDetect.browser == 'Explorer') ? "Internet Explorer" : "Firefox";
  html += ' está desatualizado.</strong><br/>Para uma melhor visualização do site atualize-o ou escolha outro navegador.</p>';
  html += '<ul>';
  if(BrowserDetect.browser == 'Explorer') {
    html += '<li>' + IE_BUTTON + '</li>';
    html += '<li>' + FIREFOX_BUTTON + '</li>';
    html += '<li>' + CHROME_BUTTON + '</li>';
  } else {
    html += '<li>' + FIREFOX_BUTTON + '</li>';
    html += '<li>' + IE_BUTTON + '</li>';
    html += '<li>' + CHROME_BUTTON + '</li>';
  };
  html += '</ul>';
  html += '<a href="#" id="sawpf-close" title="Fechar">fechar</a>';
  html += '</div></div>';

  var container = document.createElement('div');
  container.innerHTML = html;

  var barra_gcom = document.getElementById('glb-barra-widget');
  if(!!barra_gcom) {
    barra_gcom.parentNode.insertBefore(container, barra_gcom.nextSibling);
  } else {
    document.body.insertBefore(container, document.body['children'][0]);
  };

  document.getElementById('sawpf-close').onclick = function() {
    emile('sawpf', 'height: 0', {
      duration: 300,
      after: function(){document.getElementById('sawpf').style.display = "none";}
    });
    return false;
  };
  emile('sawpf', 'height: 58px', {duration: 500});
})(this, document);

