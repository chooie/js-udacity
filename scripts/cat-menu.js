(function() {
  'use strict';
  var menu = document.querySelector('#cat-menu'),
    main = document.querySelector('main'),
    drawer = document.querySelector('#cat-nav');

  menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
  });
  main.addEventListener('click', function() {
    drawer.classList.remove('open');
  });
}());
