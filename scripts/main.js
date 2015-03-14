(function() {
  'use strict';

  var cats = [
    { name: 'Tabby', imageRef: 'catPics/cat0.jpg', clicks: 0 },
    { name: 'Siamese', imageRef: 'catPics/cat1.jpg', clicks: 0 },
    { name: 'Red', imageRef: 'catPics/cat2.jpg', clicks: 0 },
    { name: 'Fox', imageRef: 'catPics/cat3.jpg', clicks: 0 },
    { name: 'SomeCat', imageRef: 'catPics/cat4.jpg', clicks: 0 }
  ];

  var catModel = {
    getAllCats: function() {
      return cats;
    },

    getCatByName: function(catName) {
      return catModel.getAllCats().filter(function(element) {
        return element.name === catName;
      })[0]; // return just one cat
    }
  };

  var controller = {
    init: function() {
      controller.setActiveCat('Tabby');
      listView.init();
      catsView.init();
    },

    getActiveCat: function() {
      return controller.activeCat;
    },

    setActiveCat: function(catName) {
      controller.activeCat = catModel.getCatByName(catName);
      catsView.displayCat();
    },

    updateClickCount: function() {
      controller.activeCat.clicks += 1;
    }
  };

  var listView = {
    init: function() {
      var cats = catModel.getAllCats(),
        catNav = document.getElementById('cat-nav'),
        catList = document.createElement('ul'),
        catListNode;

      cats.forEach(function(cat, i) {
        catListNode = document.createElement('li');
        if (i === 0) {
          catListNode.classList.add('active');
        }
        catListNode.classList.add('cat-li');
        catListNode.innerHTML = cat.name;
        catList.appendChild(catListNode);
      });
      catNav.appendChild(catList);
    },

    refreshList: function (node) {
      listView.deactivate();
      listView.activate(node);
    },

    deactivate: function() {
      var activeNode = document.querySelector('.active');
      activeNode.classList.remove('active');
    },

    /**
     * Adds the 'active' class to a give node.
     * @param {Node} node
     */
    activate: function(node) {
      node.classList.add('active');
    }
  };

  var catsView = {
    init: function() {
      catsView.displayCat();
    },

    displayCat: function() {
      var cat = controller.getActiveCat(),
        catNameNode = document.getElementById('cat-name'),
        countNode = document.getElementById('count-elem'),
        catImg = document.getElementById('cat-pic');

      catNameNode.innerHTML = cat.name;
      countNode.innerHTML = '' + cat.clicks;
      catImg.src = cat.imageRef;
    },

    updateClickCount: function() {
      controller.updateClickCount();
      catsView.refreshCounter();
    },

    refreshCounter: function() {
      var countNode = document.getElementById('count-elem');
      countNode.innerHTML = '' +  controller.getActiveCat().clicks;
    }
  };

  controller.init();


  document.addEventListener('click', function(e) {
    var target = e.target;
    // The cat image was clicked
    if (target.id === 'cat-pic') {
      catsView.updateClickCount();
    }

    // A link was clicked on the cat-nav bar
    if (target.nodeName === 'LI' && target.classList.contains('cat-li')) {
      // Set active cat to cat that corresponds to the name in li node
      controller.setActiveCat(target.innerHTML);
      // Update active list
      listView.refreshList(target);
    }
  });
}());
