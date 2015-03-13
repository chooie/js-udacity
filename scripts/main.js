(function() {
  'use strict';

  var cats = [
    { name: 'Tabby', imageRef: 'catPics/cat0.jpg' },
    { name: 'Siamese', imageRef: 'catPics/cat1.jpg' },
    { name: 'Red', imageRef: 'catPics/cat2.jpg' },
    { name: 'Fox', imageRef: 'catPics/cat3.jpg' },
    { name: 'SomeCat', imageRef: 'catPics/cat4.jpg' }
  ];

  var makeCats = function(cats) {
    var mainNode = document.getElementById('cat-container'),
      catNav = document.getElementById('cat-nav'),
      newCatNode,
      headingNode,
      heroNode,
      liNode;

    for (var i = 0; i < cats.length; i += 1) {
      // Container
      newCatNode = document.createElement('div');
      newCatNode.className = 'box-element ' + (i === 0 ? 'active': 'hidden');
      newCatNode.id = 'cat-' + i;

      // Header
      headingNode = document.createElement('div');
      headingNode.className = 'heading';
      headingNode.innerHTML = '<h1>' + cats[i].name + '</h1>' +
      '<h2>Number of Clicks: <span id="count-elem' +
      i + '">0</span></h2>';

      // Hero
      heroNode = document.createElement('section');
      heroNode.className = 'hero';
      heroNode.innerHTML = '<img id="cat-elem' + i + '" src="' +
      cats[i].imageRef + '" alt="A picture of a cat."/>';

      // Add children to main
      newCatNode.appendChild(headingNode);
      newCatNode.appendChild(heroNode);
      mainNode.appendChild(newCatNode);

      liNode = document.createElement('li');
      liNode.id = 'cat-nav' + i;
      liNode.className = i === 0 ? 'active' : '';
      liNode.innerHTML = cats[i].name;
      catNav.appendChild(liNode);
    }

    document.addEventListener('click', function(e) {
      var idNumber,
        countNode,
        regexp = e.target.id.match(/cat-elem(\d)/),
        catNodeToShow,
        listNode;

      // A cat image was clicked
      if (regexp && regexp.length > 0) {
        idNumber = regexp[1];
        countNode = document.getElementById('count-elem' + idNumber);
        countNode.innerHTML = "" + (parseInt(countNode.innerHTML, 10) + 1);
      }

      regexp = e.target.id.match(/cat-nav(\d)/);

      // A link was clicked on the cat-nav bar
      if (regexp && regexp.length > 0) {
        // Toggle all active elements off
        Array.prototype.forEach.call(document.querySelectorAll('li.active'),
        function(element) {
          element.classList.toggle('active');
        });

        // Toggle all cat elements that are active
        Array.prototype.forEach.call(
          document.querySelectorAll('#cat-container .active'),
        function(element) {
          element.classList.toggle('active');
          element.classList.toggle('hidden');
        });

        // Make clicked link active
        listNode = document.getElementById('cat-nav' + regexp[1]);
        listNode.classList.toggle('active');

        // Toggle associated cat-box
        catNodeToShow = document.getElementById('cat-' + regexp[1]);
        catNodeToShow.classList.toggle('active');
        catNodeToShow.classList.toggle('hidden');
      }
    });
  };
  makeCats(cats);
}());
