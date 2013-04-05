// Microsoft IE 8.0 plus 6.x. Suspicion that it is some failed XP to Vista upgrade.
// Um caso confirmado por um usuário do G1 que contactou o suporte do mesmo.
// http://blog.orite.com.au/web_development/2009-06-30/jquery-ie-detection-issue-workaround/
Cookie.unset('__sawpf_');
fakeUserAgent('Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; GTB6.5; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; InfoPath.1; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)');
require('/src/1.0.js');

describe('Internet Explorer 8.0 com user-agent duplo com o IE6', function() {
  it('should show sawpf bar', function() {
    expect(document.getElementById('sawpf')).toExist();
  });
});
