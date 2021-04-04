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

function _switchToLightMode() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  $html.classList.remove('dark');
  $html.classList.add('light');
  localStorage.setItem('COLOR_SCHEME', 'light');
  $btnToggleColorScheme.textContent = 'Dark';
}

function _switchToDarkMode() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  $html.classList.remove('light');
  $html.classList.add('dark');
  localStorage.setItem('COLOR_SCHEME', 'dark');
  $btnToggleColorScheme.textContent = 'Light';
}

function handleColorScheme() {
  var $html = document.getElementsByTagName('html')[0];
  var $btnToggleColorScheme = document.getElementById('btn_color_scheme');
  if (localStorage.getItem('COLOR_SCHEME') === null) {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      _switchToDarkMode();
    } else {
      _switchToLightMode();
    }
  } else if (localStorage.getItem('COLOR_SCHEME') === 'light') {
    _switchToLightMode();
  } else if (localStorage.getItem('COLOR_SCHEME') === 'dark') {
    _switchToDarkMode();
  }
  $btnToggleColorScheme.addEventListener('click', function () {
    if ($html.classList.contains('light')) {
      _switchToDarkMode();
    } else {
      _switchToLightMode();
    }
  });
  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      const newColorScheme = e.matches ? 'dark' : 'light';
      if (newColorScheme === 'dark') {
        _switchToDarkMode();
      } else {
        _switchToLightMode();
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
