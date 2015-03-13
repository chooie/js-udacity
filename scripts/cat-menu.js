(function() {
  'use strict';
  var menu = document.querySelector('#menu'),
    main = document.querySelector('main'),
    drawer = document.querySelector('main aside');

  menu.addEventListener('click', function(e) {
    drawer.classList.toggle('open');
    e.stopPropagation();
  });
  main.addEventListener('click', function() {
    drawer.classList.remove('open');
  });
}());
