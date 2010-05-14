(function(){
  if (!(jQuery.browser.mozilla && jQuery.browser.version.substr(2,1) < "9" || jQuery.browser.msie && jQuery.browser.version.substr(0,1) < "7")) return;

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
  html += '#sawpf a {background: #fff url(' + BASE_URL + '/sprite-bt.gif) no-repeat 0 0; display: block; height: 40px; outline: none; overflow: hidden; width: 150px;}\n';
  html += '#sawpf a:hover {background-position: 0 -40px;}\n';
  html += '#sawpf a.sawpf-close {background: url(' + BASE_URL + '/bt-close.gif) no-repeat 0 0; height: 15px; position: absolute; right: 5px; text-indent: -99999px; top: 5px; width: 15px;}\n';
  html += '#sawpf a.sawpf-close:hover {background-position: 0 -15px;}\n';
  html += '</style>';
  html += '<div id="sawpf"><div><p><strong>Seu ';
  html += jQuery.browser.msie ? "Internet Explorer" : "Firefox";
  html += ' está desatualizado.</strong><br/>Para uma melhor visualização do site atualize-o ou escolha outro navegador.</p>';
  html += '<ul>';
  if(jQuery.browser.msie) {
    html += '<li>' + IE_BUTTON + '</li>';
    html += '<li>' + FIREFOX_BUTTON + '</li>';
    html += '<li>' + CHROME_BUTTON + '</li>';
  } else {
    html += '<li>' + FIREFOX_BUTTON + '</li>';
    html += '<li>' + IE_BUTTON + '</li>';
    html += '<li>' + CHROME_BUTTON + '</li>';
  };
  html += '</ul>';
  html += '<a href="#" class="sawpf-close" title="Fechar">fechar</a>';
  html += '</div></div>';

  if(!!$('glb-barra-widget').size()) {
    $('glb-barra-widget').prepend(html);  
  } else {
    $('body').prepend(html);  
  };
  $('#sawpf a.sawpf-close').click(function(){$('#sawpf').slideUp('slow');});
  $('#sawpf').slideDown();
})();


