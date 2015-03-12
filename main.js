(function() {
  var catPicture = document.getElementById('cat-elem'),
    countElem = document.getElementById('count-elem'),
    count = 0;
  catPicture.addEventListener('click', function() {
    count += 1;
    countElem.innerHTML= '' + count;
  });
}());
