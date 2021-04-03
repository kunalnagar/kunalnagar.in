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

function handleColorScheme() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  if (localStorage.getItem('COLOR_SCHEME') === null) {
    $html.classList.add('light');
    localStorage.setItem('COLOR_SCHEME', 'light');
    $btnToggleColorScheme.textContent = 'Switch to Dark Mode';
  } else if (localStorage.getItem('COLOR_SCHEME') === 'light') {
    $html.classList.add('light');
    $btnToggleColorScheme.textContent = 'Switch to Dark Mode';
  } else {
    $html.classList.add('dark');
    $btnToggleColorScheme.textContent = 'Switch to Light Mode';
  }
  $btnToggleColorScheme.addEventListener('click', function () {
    if ($html.classList.contains('light')) {
      $html.classList.replace('light', 'dark');
      $btnToggleColorScheme.textContent = 'Switch to Light Mode';
      localStorage.setItem('COLOR_SCHEME', 'dark');
    } else {
      $html.classList.replace('dark', 'light');
      $btnToggleColorScheme.textContent = 'Switch to Dark Mode';
      localStorage.setItem('COLOR_SCHEME', 'light');
    }
  });
}

ready(function () {
  var $blogListPage = document.querySelector('.page-blog');
  if ($blogListPage) {
    enablePostFiltering();
  }
  handleColorScheme();
});
