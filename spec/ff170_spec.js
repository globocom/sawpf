Cookie.unset('__sawpf_');

describe('Firefox 17.0 should show with user agent', function() {
    
  var userAgents = [
    'Mozilla/5.0 (Mac OS X 10.7 Lion; rv:17.0) Gecko/20100101 Firefox/17.0',
    'Mozilla/5.0 (X11; DragonFly BSD 3.0.3; Unix x8664; rv:12.0) Gecko/20121123 Firefox/17.0',
    'Mozilla/5.0 (X11; DragonFly x8664; rv:17.0) Gecko/20121214 Firefox/17.0',
    'Mozilla/5.0 (X11; DragonFly BSD 3.0.3; Unix x8664; rv:12.0) Gecko/17 Firefox/17.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8.2; rv:17.0) Gecko/20100101 Firefox/17.0',
    'Mozilla/5.0 (X11; Slackware; Linux i686; rv:17.0) Gecko/20100101 Firefox/17.0',  
    'Mozilla/5.0 (Windows NT 6.2; rv:17.0) Gecko/17.0 Firefox/17.0 AlexaToolbar/alxf-2.17',
    'Mozilla/5.0 (Windows NT 6.2; rv:17.0) Gecko/17.0 Firefox/17.0 AppEngine-Google; (+http://code.google.com/appengine; appid: sharry96887)',
    'Mozilla/5.0 (Windows NT 6.2; rv:17.0) Gecko/17.0 Firefox/17.0',
    'Mozilla/5.0 (Windows NT 6.2; rv:17.0) Gecko/20100101 Firefox/17.0'
  ];
  
  for(var i=0; i<userAgents.length; i++) {
      var u = userAgents[i];
      it(u, function() {
          fakeUserAgent(u);
          afterSawpfLoaded(function(){
            expect(document.getElementById('sawpf')).not.toExist();
          })
      });
  };

});