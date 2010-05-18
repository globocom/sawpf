// http://www.zytrax.com/tech/web/browser_ids.htm
var BROWSERS = {
  'Internet Explorer 5.5': ['Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 6.0; Trident/4.0)'],
  'Internet Explorer 6': ['Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.0; Trident/4.0)'],
  'Internet Explorer 7': ['Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; Trident/4.0)'],
  'Internet Explorer 8': ['Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)'],
  'Firefox 2.0': ['Mozilla/5.0 (X11; U; Darwin Power Macintosh; en-US; rv:1.8.0.12) Gecko/20070803 Firefox/1.5.0.12 Fink Community Edition'],
  'Firefox 3.0': ['Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.5; en-US; rv:1.9.0.3) Gecko/2008092414 Firefox/3.0.3'],
  'Firefox 3.5': ['Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.1.8) Gecko/20100215 Solaris/10.1 (GNU) Superswan/3.5.8 (Byte/me)'],
  'Firefox 3.6': ['Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.2.3) Gecko/20100401 Firefox/3.6.3']
};

function using(browser, tests) {
  for(var useragent in BROWSERS[browser]) {
    navigator.__defineGetter__('userAgent', function() {
        return useragent;
    });
    tests();
  }
};
