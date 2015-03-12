(function() {
  var numberOfCatPics = 2,
    mainNode = document.getElementById('cat-container'),
    newCatNode,
    headingNode,
    heroNode;

  for (var i = 0; i < numberOfCatPics; i += 1) {
    // Container
    newCatNode = document.createElement('div');
    newCatNode.className = 'box-element';
    // Header
    headingNode = document.createElement('div');
    headingNode.className = 'heading';
    headingNode.innerHTML = '<h1>' + 'Cat' + i + '</h1>' +
    '<h2>Number of Clicks: <span id="count-elem' +
      i + '">0</span></h2>';

    heroNode = document.createElement('section');
    heroNode.className = 'hero';
    heroNode.innerHTML = '<img id="cat-elem' + i + '" src="catPics/cat' + i +
      '.jpg" alt="A picture of a cat."/>';

    // Add children
    newCatNode.appendChild(headingNode);
    newCatNode.appendChild(heroNode);
    mainNode.appendChild(newCatNode);
  }

  document.addEventListener('click', function(e) {
    var idNumber,
      countNode,
      regexp;
    if (regexp = e.target.id.match(/cat-elem(\d)/)) {
      idNumber = regexp[1];
      countNode = document.getElementById('count-elem' + idNumber);
      countNode.innerHTML = "" + (parseInt(countNode.innerHTML, 10) + 1)
    }
  });
}());
