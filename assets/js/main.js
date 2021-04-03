var filterPosts = debounce(function () {
  var $postLinks = document.querySelectorAll('#posts_list a');
  var searchValue = document
    .getElementById('search')
    .value.trim()
    .toLowerCase();
  $postLinks.forEach(function ($link) {
    if (searchValue.trim() === '') {
      $link.parentNode.classList.remove('is-hidden');
    } else {
      var linkText = $link.textContent.trim().toLowerCase();
      if (linkText.indexOf(searchValue) !== -1) {
        $link.parentNode.classList.remove('is-hidden');
      } else {
        $link.parentNode.classList.add('is-hidden');
      }
    }
  });
}, 250);

function enablePostFiltering() {
  document.getElementById('search').addEventListener('input', filterPosts);
}

ready(function () {
  var $html = document.getElementsByTagName('html')[0];
  var $blogListPage = document.querySelector('.page-blog');
  var $colorSchemeToggle = document.getElementById('color_scheme');
  $colorSchemeToggle.addEventListener('change', function (e) {
    var $colorSchemeSun = document.querySelector('svg.sun');
    var $colorSchemeMoon = document.querySelector('svg.moon');
    if (e.currentTarget.checked) {
      $html.classList.remove('light');
      $html.classList.add('dark');
      $colorSchemeMoon.style.display = 'block';
      $colorSchemeSun.style.display = 'none';
    } else {
      $html.classList.remove('dark');
      $html.classList.add('light');
      $colorSchemeMoon.style.display = 'none';
      $colorSchemeSun.style.display = 'block';
    }
  });
  if ($blogListPage) {
    enablePostFiltering();
  }
});
