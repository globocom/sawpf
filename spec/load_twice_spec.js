fakeUserAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 6.0; Trident/4.0)'); // IE6

require('/src/1.0.js');
require('/src/1.0.js');

describe('Loading the script twice', function() {
  it('Should have one, and only one, node with id "sawpf"', function(){
    var elements = document.getElementsByTagName('*');
    var sawpfCounter = 0;
    for (var i = elements.length; i--;){
        if (elements[i].id === 'sawpf') sawpfCounter++;
    }
    expect(sawpfCounter).toEqual(1);
  });
});

