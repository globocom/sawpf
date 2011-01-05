require('/spec/support/jasmine-dom-matchers.js');

function fakeUserAgent(value) {
  navigator.__defineGetter__('userAgent', function() {
    return value;
  });
}
