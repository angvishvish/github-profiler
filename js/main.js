window.onload = function() {
  var inp = document.querySelector('#username'),
      frm = document.querySelector('#create-card'),
      output = document.querySelector('#cards');
      github = '';
      userimage = document.querySelector('.git-user-image img');

  frm.addEventListener('submit', function(eve) {
    user = inp.value;
    eve.preventDefault();
    if (user === '') { return false; }
    $('.git-user-image').show();
    userimage.setAttribute('src', 'img/loading.gif');
    var url = 'https://api.github.com/users/' + user;

    $.ajax({
      type: 'GET',
      url: url
      }).success(function(value) {
        userimage.setAttribute('src', value.avatar_url);
        $('.display-user').show();
    });
  }, true);
};
