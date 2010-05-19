(function(){
  var BrowserDetect = { // BrowserDetect adapted from http://www.quirksmode.org/js/detect.html
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || -1;
      this.OS = this.searchString(this.dataOS) || "an unknown OS";
    },
    searchString: function (data) {
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
    searchVersion: function (dataString) {
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

  if (!(BrowserDetect.browser == 'Firefox' || BrowserDetect.browser == 'Explorer')) return;
  if (BrowserDetect.browser == 'Firefox' && BrowserDetect.version >= 3.5) return;
  if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version >= 8) return;

  var BASE_URL = base_url || 'http://sawpf.baixatudo.com.br';
  var IE_BUTTON = '<a href="http://www.baixatudo.com.br/internet-explorer-8?utm_source=sawpf" class="sawpf-ie" title="Internet Explorer 8"><img src="' + BASE_URL + '/ie.gif" alt="Internet Explorer"/></a></li>';
  var FIREFOX_BUTTON = '<a href="http://www.baixatudo.com.br/mozilla-firefox-3-6?utm_source=sawpf" class="sawpf-ff" title="Firefox 3.6"><img src="' + BASE_URL + '/ff.gif" alt="Firefox"/></a></li>';
  var CHROME_BUTTON = '<a href="http://www.baixatudo.com.br/google-chrome-4?utm_source=sawpf" class="sawpf-gc" title="Google Chrome 4"><img src="' + BASE_URL + '/gc.gif" alt="Google Chrome"/></a></li>';

  var html = '<style type="text/css">';
  html += '#sawpf * {margin: 0; padding: 0; top: 0; line-height: 1em;}\n';
  html += '#sawpf {display: none; background: #ffffd6; border-bottom: 1px solid #f0e4c3; border-top: 1px solid #f0e4c3; font-family: arial; margin: 0; padding: 9px 0; position: relative; width: 100%;}\n';
  html += '#sawpf div {height: 40px; margin: 0 auto; width: 940px; padding: 0;}\n';
  html += '#sawpf strong {color: #333; font-size: 14px;}\n';
  html += '#sawpf p {color: #666; float: left; font-size: 12px; line-height: 18px; margin: 2px 20px 0 0; text-align: left;}\n';
  html += '#sawpf ul {list-style: none}\n';
  html += '#sawpf li {display: block; float: left; list-style: none; margin: 0 5px 0 0;}\n';
  html += '#sawpf img {border: none;}\n';
  html += '#sawpf a {border: none; background: #fff url(' + BASE_URL + '/sprite-bt.gif) no-repeat 0 0; display: block; height: 40px; outline: none; overflow: hidden; width: 150px;}\n';
  html += '#sawpf a:hover {background-position: 0 -40px;}\n';
  html += '#sawpf #sawpf-close {background: url(' + BASE_URL + '/bt-close.gif) no-repeat 0 0; height: 15px; position: absolute; right: 5px; text-indent: -99999px; top: 5px; width: 15px;}\n';
  html += '#sawpf #sawpf-close:hover {background-position: 0 -15px;}\n';
  html += '</style>';
  html += '<div id="sawpf"><div><p><strong>Seu ';
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

  if (typeof(jQuery) == 'undefined') {
    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.insertBefore(container, document.body.children[0]);
    document.getElementById('sawpf-close').onclick = function(){ document.getElementById('sawpf').style.display = "none"; return false;};
    document.getElementById('sawpf').style.display = 'block';
  } else {
    if(!!jQuery('#glb-barra-widget').size()) {
      jQuery('#glb-barra-widget').after(html);  
    } else {
      jQuery('body').prepend(html);  
    };
    jQuery('#sawpf-close').click(function(){$('#sawpf').slideUp('slow');});
    jQuery('#sawpf').slideDown();
  };
})();


