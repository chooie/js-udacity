(function() {
  'use strict';

  var cats = [
    { name: 'Tabby', imgURL: 'catPics/cat0.jpg', clicks: 0 },
    { name: 'Siamese', imgURL: 'catPics/cat1.jpg', clicks: 0 },
    { name: 'Red', imgURL: 'catPics/cat2.jpg', clicks: 0 },
    { name: 'Fox', imgURL: 'catPics/cat3.jpg', clicks: 0 },
    { name: 'SomeCat', imgURL: 'catPics/cat4.jpg', clicks: 0 }
  ];

  var catModel = {
    getAllCats: function() {
      return cats;
    },

    getCatByName: function(catName) {
      return this.getAllCats().filter(function(element) {
        return element.name === catName;
      })[0]; // return just one cat
    }
  };

  var controller = {
    init: function() {
      adminView.init();
      this.setActiveCat(catModel.getAllCats()[0].name);
      listView.init();
      catMainView.init();
    },

    getAllCats: function() {
      return catModel.getAllCats();
    },

    getActiveCat: function() {
      return this.activeCat;
    },

    setActiveCat: function(catName) {
      this.activeCat = catModel.getCatByName(catName);
      catMainView.refresh();
      adminView.updateAdminFields();
    },

    updateActiveCat: function(options) {
      var cat = this.getActiveCat();
      for (var key in options) {
        if (cat.hasOwnProperty(key)) {
          cat[key] = options[key];
        }
      }
      this.refreshCatMainView();
      listView.init();
    },

    refreshCatMainView: function() {
      catMainView.refresh();
    },

    updateClickCount: function() {
      this.activeCat.clicks += 1;
    }
  };

  var listView = {
    init: function() {
      var cats = controller.getAllCats(),
        catNav = document.getElementById('cat-nav'),
        catList = document.createElement('ul'),
        catListNode;

      catNav.innerHTML = '';
      
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
      this.deactivate();
      this.activate(node);
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

  var catMainView = {
    init: function() {
      this.refresh();
    },

    refresh: (function() {
      var catNameNode = document.getElementById('cat-name'),
        countNode = document.getElementById('count-elem'),
        catImg = document.getElementById('cat-pic');

      return function() {
        var cat = controller.getActiveCat();

        catNameNode.innerHTML = cat.name;
        countNode.innerHTML = '' + cat.clicks;
        catImg.src = cat.imgURL;
      };
    }()),

    updateClickCount: function() {
      controller.updateClickCount();
      this.refreshCounter();
    },

    refreshCounter: (function() {
      var countNode = document.getElementById('count-elem');

      return function() {
        countNode.innerHTML = '' +  controller.getActiveCat().clicks;
      };
    }())
  };

  var adminView = {
    init: function() {
      this.adminPanel = document.getElementById('admin-panel');
      this.nameField = document.getElementById('name-field');
      this.urlField = document.getElementById('image-url-field');
      this.countField = document.getElementById('count-field');
    },

    toggleDisplay: function() {
      this.adminPanel.classList.toggle('hidden');
    },

    updateAdminFields: function() {
      var cat = controller.getActiveCat();
      this.nameField.value = cat.name;
      this.urlField.value = cat.imgURL;
      this.countField.value = cat.clicks;
    },

    updateActiveCat: function() {
      var options = {
        name: this.nameField.value,
        imgURL: this.urlField.value,
        clicks: parseInt(this.countField.value, 10)
      };
      controller.updateActiveCat(options);
    }
  };

  controller.init();


  document.addEventListener('click', function(e) {
    var target = e.target;
    // The cat image was clicked
    if (target.id === 'cat-pic') {
      catMainView.updateClickCount();
    }

    // A link was clicked on the cat-nav bar
    if (target.nodeName === 'LI' && target.classList.contains('cat-li')) {
      // Set active cat to cat that corresponds to the name in li node
      controller.setActiveCat(target.innerHTML);
      // Update active list
      listView.refreshList(target);
    }

    // Admin button was clicked
    if (target.id === 'admin-btn' || target.id === 'admin-btn-cancel') {
      adminView.toggleDisplay();
    }

    if (target.id === 'admin-btn-save') {
      adminView.updateActiveCat();
    }
  });
}());
